'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UploadWizard } from '@/components/water-quality/UploadWizard';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadPage() {
  const [uploadResults, setUploadResults] = useState<any>(null);

  const handleUploadComplete = (results: any) => {
    setUploadResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bulk Upload</h1>
              <p className="text-gray-600">Upload and process large water quality datasets</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Instructions
              </CardTitle>
              <CardDescription>
                Follow these guidelines to ensure successful data processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Required Columns
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code>area</code> - Location name</li>
                    <li>• <code>latitude</code> - Geographic latitude</li>
                    <li>• <code>longitude</code> - Geographic longitude</li>
                    <li>• <code>date</code> - Sample date (YYYY-MM-DD)</li>
                    <li>• <code>ph</code> - pH value</li>
                    <li>• <code>hardness</code> - Total hardness (mg/L)</li>
                    <li>• <code>tds</code> - Total dissolved solids (mg/L)</li>
                    <li>• <code>turbidity</code> - Turbidity (NTU)</li>
                    <li>• <code>alkalinity</code> - Total alkalinity (mg/L)</li>
                    <li>• <code>nitrate</code> - Nitrate (mg/L)</li>
                    <li>• <code>fluoride</code> - Fluoride (mg/L)</li>
                    <li>• <code>chloride</code> - Chloride (mg/L)</li>
                    <li>• <code>conductivity</code> - Conductivity (µS/cm)</li>
                    <li>• <code>temperature</code> - Temperature (°C)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    File Requirements
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CSV or Excel format (.csv, .xlsx, .xls)</li>
                    <li>• Maximum file size: 50MB</li>
                    <li>• First row must contain column headers</li>
                    <li>• At least one data row required</li>
                    <li>• Numeric values for water parameters</li>
                    <li>• Valid coordinates (-90 to 90, -180 to 180)</li>
                    <li>• Valid date format (YYYY-MM-DD)</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tip:</strong> Download the template below to see the exact format required.
                  All water quality parameters will be analyzed using the WQI formula.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Upload Wizard */}
          <UploadWizard onUploadComplete={handleUploadComplete} />

          {/* Upload Results Summary */}
          {uploadResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Upload Completed Successfully
                </CardTitle>
                <CardDescription>
                  Your data has been processed and added to the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                    <div className="text-sm text-blue-700">New Areas</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {uploadResults.avgWQI?.toFixed(1) || 'N/A'}
                    </div>
                    <div className="text-sm text-purple-700">Average WQI</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Your data is now available in the <strong>Analysis</strong> page for mapping and visualization</li>
                    <li>• You can view detailed statistics in the <strong>Dashboard</strong></li>
                    <li>• Download the annotated file to see all predictions and warnings</li>
                    <li>• Individual records can be viewed and edited in the system</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}