import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateWaterQuality, WaterQualityInputSchema } from '@/lib/water-quality';

const PredictRequestSchema = WaterQualityInputSchema.extend({
  area: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  date: z.string().datetime().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedInput = PredictRequestSchema.parse(body);
    
    // Calculate water quality
    const result = calculateWaterQuality(validatedInput);
    
    // Return result
    return NextResponse.json({
      success: true,
      data: {
        wqi: result.wqi,
        label: result.label,
        confidence: result.confidence,
        warnings: result.warnings,
        parameterContributions: result.parameterContributions,
        timestamp: new Date().toISOString(),
      }
    });
    
  } catch (error) {
    console.error('Prediction error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}