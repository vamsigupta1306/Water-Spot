'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download,
  Save,
  Info
} from 'lucide-react';
import { WaterQualityResult } from '@/lib/water-quality';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResultCardProps {
  result: WaterQualityResult | null;
  isLoading?: boolean;
  onSave?: () => void;
  onExport?: () => void;
}

export function ResultCard({ result, isLoading, onSave, onExport }: ResultCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Calculating Water Quality...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-500">
            <Info className="h-5 w-5" />
            No Results Yet
          </CardTitle>
          <CardDescription>
            Enter water quality parameters to see analysis results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <div className="text-6xl mb-4">💧</div>
            <p>Fill in the form to calculate water quality index</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'Good': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'Good': return <CheckCircle className="h-4 w-4" />;
      case 'Moderate': return <AlertTriangle className="h-4 w-4" />;
      case 'Poor': return <XCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const chartData = result.parameterContributions.map(contrib => ({
    parameter: contrib.parameter.charAt(0).toUpperCase() + contrib.parameter.slice(1),
    contribution: Math.round(contrib.contribution * 100) / 100,
    value: contrib.value,
    status: contrib.status,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Water Quality Analysis
              <Badge className={getLabelColor(result.label)}>
                {getLabelIcon(result.label)}
                {result.label}
              </Badge>
            </CardTitle>
            <CardDescription>
              Based on {result.parameterContributions.length} parameters
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {onSave && (
              <Button variant="outline" size="sm" onClick={onSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            )}
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* WQI Score */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {result.wqi}
          </div>
          <div className="text-sm text-gray-600 mb-2">Water Quality Index</div>
          <Progress 
            value={result.wqi} 
            className="h-2 mb-2"
          />
          <div className="text-xs text-gray-500">
            0 = Worst | 100 = Excellent
          </div>
        </div>

        {/* Confidence */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-700">
              {result.confidence}%
            </div>
            <div className="text-sm text-gray-600">Confidence</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-700">
              {result.parameterContributions.length}
            </div>
            <div className="text-sm text-gray-600">Parameters</div>
          </div>
        </div>

        {/* Warnings */}
        {result.warnings.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-2">Warnings:</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Parameter Contributions Chart */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Parameter Contributions</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="parameter" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-medium">{data.parameter}</p>
                          <p className="text-sm">Value: {data.value}</p>
                          <p className="text-sm">Contribution: {data.contribution}</p>
                          <p className="text-sm">Status: {data.status}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="contribution" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Parameter Status Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Parameter Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.parameterContributions.map((contrib, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium capitalize">
                    {contrib.parameter.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Value: {contrib.value}
                  </div>
                </div>
                <Badge 
                  variant={contrib.status === 'good' ? 'default' : contrib.status === 'moderate' ? 'secondary' : 'destructive'}
                  className="capitalize"
                >
                  {contrib.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}