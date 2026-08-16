import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateWaterQuality, WaterQualityInputSchema } from '@/lib/water-quality';
import { db } from '@/lib/db';

const UploadRowSchema = z.object({
  area: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  date: z.string(),
  ph: z.number().optional(),
  hardness: z.number().optional(),
  tds: z.number().optional(),
  turbidity: z.number().optional(),
  alkalinity: z.number().optional(),
  nitrate: z.number().optional(),
  fluoride: z.number().optional(),
  chloride: z.number().optional(),
  conductivity: z.number().optional(),
  temperature: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided'
      }, { status: 400 });
    }

    // Debug logging to help diagnose upload issues
    try {
      console.log('Upload POST received file:', (file as any).name, 'type:', (file as any).type);
    } catch (e) {
      console.log('Upload POST received file (no metadata)');
    }

    // Read file content (support CSV and Excel files)
    let text = '';
    const filename = (file as any).name || '';
    if (filename.toLowerCase().endsWith('.xls') || filename.toLowerCase().endsWith('.xlsx')) {
      const arrayBuffer = await file.arrayBuffer();
      const XLSX = await import('xlsx');
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      text = XLSX.utils.sheet_to_csv(sheet);
    } else {
      text = await file.text();
    }

  const lines = text.split('\n').filter(line => line.trim());
  console.log(`Parsed ${lines.length - 1} data rows from uploaded file`);
    
    if (lines.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'File must contain at least a header row and one data row'
      }, { status: 400 });
    }

    // Parse CSV
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const requiredColumns = [
      'area', 'latitude', 'longitude', 'date', 'ph', 'hardness', 'tds', 
      'turbidity', 'alkalinity', 'nitrate', 'fluoride', 'chloride', 'conductivity', 'temperature'
    ];
    
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    if (missingColumns.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required columns: ${missingColumns.join(', ')}`
      }, { status: 400 });
    }

  // Process data rows
  const results: any[] = [];
  let rowsOk = 0;
  let rowsFailed = 0;
  let areasAdded = 0;
  const wqiScores: number[] = [];

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map(v => v.trim());
        const rowData: any = {};
        
        headers.forEach((header, index) => {
          const value = values[index];
          if (header === 'area' || header === 'date') {
            rowData[header] = value;
          } else {
            const numValue = parseFloat(value);
            rowData[header] = isNaN(numValue) ? undefined : numValue;
          }
        });

        // Validate row
        const validatedRow = UploadRowSchema.parse(rowData);
        
        // Calculate water quality
        const waterQualityData = {
          ph: validatedRow.ph,
          hardness: validatedRow.hardness,
          tds: validatedRow.tds,
          turbidity: validatedRow.turbidity,
          alkalinity: validatedRow.alkalinity,
          nitrate: validatedRow.nitrate,
          fluoride: validatedRow.fluoride,
          chloride: validatedRow.chloride,
          conductivity: validatedRow.conductivity,
          temperature: validatedRow.temperature,
        };

        const wqiResult = calculateWaterQuality(waterQualityData);
        
        // Create or get area
        let area = await db.area.findFirst({
          where: {
            OR: [
              { name: validatedRow.area },
              { 
                latitude: validatedRow.latitude,
                longitude: validatedRow.longitude
              }
            ]
          }
        });

        if (!area) {
          area = await db.area.create({
            data: {
              name: validatedRow.area,
              latitude: validatedRow.latitude,
              longitude: validatedRow.longitude,
            }
          });
          areasAdded++;
        }

        // Create record
        const record = await db.record.create({
          data: {
            areaId: area.id,
            date: new Date(validatedRow.date),
            ph: validatedRow.ph,
            hardness: validatedRow.hardness,
            tds: validatedRow.tds,
            turbidity: validatedRow.turbidity,
            alkalinity: validatedRow.alkalinity,
            nitrate: validatedRow.nitrate,
            fluoride: validatedRow.fluoride,
            chloride: validatedRow.chloride,
            conductivity: validatedRow.conductivity,
            temperature: validatedRow.temperature,
            wqi: wqiResult.wqi,
            label: wqiResult.label,
            confidence: wqiResult.confidence,
            source: 'upload',
          }
        });

        results.push({
          row: i + 1,
          input: validatedRow,
          result: wqiResult,
          recordId: record.id,
          areaId: area.id,
        });

        rowsOk++;
        wqiScores.push(wqiResult.wqi);
        
      } catch (error) {
        console.error(`Row ${i + 1} error:`, error);
        results.push({
          row: i + 1,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        rowsFailed++;
      }
    }

    // Create upload record
    const upload = await db.upload.create({
      data: {
        filename: file.name,
        status: 'done',
        rowsTotal: lines.length - 1,
        rowsOk,
        rowsFailed,
      }
    });

    // Calculate statistics
    const avgWQI = wqiScores.length > 0 
      ? wqiScores.reduce((a, b) => a + b, 0) / wqiScores.length 
      : 0;

    // Generate annotated CSV
    const annotatedLines = [lines[0] + ',wqi,label,confidence,warnings'];
    results.forEach(result => {
      if (result.error) {
        const originalRow = lines[result.row - 1];
        annotatedLines.push(originalRow + ',ERROR,ERROR,ERROR,"' + result.error + '"');
      } else {
        const originalRow = lines[result.row - 1];
        const warnings = result.result.warnings.join('; ');
        annotatedLines.push(
          originalRow + ',' + 
          result.result.wqi + ',' + 
          result.result.label + ',' + 
          result.result.confidence + ',"' + warnings + '"'
        );
      }
    });

    const annotatedData = annotatedLines.join('\n');

    return NextResponse.json({
      success: true,
      data: {
        uploadId: upload.id,
        rowsTotal: lines.length - 1,
        rowsOk,
        rowsFailed,
        areasAdded,
        avgWQI,
        annotatedData,
        results,
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}