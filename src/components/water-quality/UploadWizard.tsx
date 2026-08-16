'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Download,
  X,
  File,
  Table
} from 'lucide-react';
import { toast } from 'sonner';

interface UploadWizardProps {
  onUploadComplete?: (results: any) => void;
}

export function UploadWizard({ onUploadComplete }: UploadWizardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [uploadResults, setUploadResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredColumns = [
    'area', 'latitude', 'longitude', 'date', 'ph', 'hardness', 'tds', 
    'turbidity', 'alkalinity', 'nitrate', 'fluoride', 'chloride', 'conductivity', 'temperature'
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Please select a CSV or Excel file');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error('File size must be less than 50MB');
      return;
    }

    setFile(selectedFile);
    setUploadStatus('idle');
    setValidationErrors([]);
    setUploadResults(null);
    parseFile(selectedFile);
  };

  const parseFile = async (file: File) => {
    try {
      let text = '';

      // Support CSV and Excel files (.csv, .xlsx, .xls)
      const name = file.name.toLowerCase();
      if (name.endsWith('.xls') || name.endsWith('.xlsx')) {
        // Use SheetJS (xlsx) to convert first sheet to CSV in the browser
        const arrayBuffer = await file.arrayBuffer();
        const XLSX = await import('xlsx');
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        text = XLSX.utils.sheet_to_csv(sheet);
      } else {
        // Treat as plain text CSV
        text = await file.text();
      }

      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setValidationErrors(['File must contain at least a header row and one data row']);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        setValidationErrors([
          `Missing required columns: ${missingColumns.join(', ')}`,
          `Required columns: ${requiredColumns.join(', ')}`
        ]);
        return;
      }

      // Parse preview data (first 50 rows)
  const previewRows: any[] = [];
      for (let i = 1; i < Math.min(51, lines.length); i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        previewRows.push(row);
      }

      setPreviewData(previewRows);
      toast.success(`File parsed successfully. Found ${lines.length - 1} data rows.`);
      
    } catch (error) {
      console.error('File parsing error:', error);
      setValidationErrors(['Failed to parse file. Please check the format.']);
      toast.error('Failed to parse file');
    }
  };

  const handleUpload = async () => {
    if (!file || previewData.length === 0) {
      toast.error('Please select a valid file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (result.success) {
        setUploadStatus('completed');
        setUploadResults(result.data);
        toast.success('File uploaded and processed successfully!');
        onUploadComplete?.(result.data);
      } else {
        setUploadStatus('error');
        setValidationErrors([result.error || 'Upload failed']);
        toast.error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setValidationErrors(['Upload failed. Please try again.']);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadStatus('idle');
    setPreviewData([]);
    setValidationErrors([]);
    setUploadResults(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const template = [
      requiredColumns.join(','),
      `Sample Area,40.7128,-74.0060,2024-01-15,7.2,150,200,2.5,100,10,0.7,50,500,20`
    ].join('\n');

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'water_quality_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadResults = () => {
    if (!uploadResults?.annotatedData) return;

    const blob = new Blob([uploadResults.annotatedData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `water_quality_results_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Water Quality Data
          </CardTitle>
          <CardDescription>
            Upload CSV or Excel files with water quality measurements for bulk analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Template Download */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-900">Download Template</h4>
                <p className="text-sm text-blue-700">Get the required CSV format template</p>
              </div>
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Template
              </Button>
            </div>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drop your file here</p>
                  <p className="text-sm text-gray-600">or click to browse</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select File
                </Button>
                <div className="text-xs text-gray-500">
                  Supports CSV, Excel files up to 50MB
                </div>
              </div>
            </div>

            {/* Selected File */}
            {file && (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={uploadStatus === 'completed' ? 'default' : 'secondary'}>
                    {uploadStatus}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {validationErrors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {/* Action Buttons */}
            {file && previewData.length > 0 && uploadStatus === 'idle' && (
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload and Process
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview and Results */}
      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Data Preview
            </CardTitle>
            <CardDescription>
              First 50 rows of your data. All {previewData.length} rows will be processed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Data Preview</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-4">
                <ScrollArea className="h-96 rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {requiredColumns.map((col) => (
                          <th key={col} className="px-4 py-2 text-left font-medium">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="border-t">
                          {requiredColumns.map((col) => (
                            <td key={col} className="px-4 py-2">
                              {row[col] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="results" className="mt-4">
                {uploadResults ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {uploadResults.rowsOk}
                        </div>
                        <div className="text-sm text-green-700">Rows Processed</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {uploadResults.rowsFailed}
                        </div>
                        <div className="text-sm text-red-700">Rows Failed</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {uploadResults.areasAdded}
                        </div>
                        <div className="text-sm text-blue-700">Areas Added</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {uploadResults.avgWQI?.toFixed(1) || 'N/A'}
                        </div>
                        <div className="text-sm text-purple-700">Avg WQI</div>
                      </div>
                    </div>
                    
                    {uploadResults.annotatedData && (
                      <Button onClick={downloadResults} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Results with Predictions
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Upload your file to see results</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}