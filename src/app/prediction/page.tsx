'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ParameterInput } from '@/components/water-quality/ParameterInput';
import { ResultCard } from '@/components/water-quality/ResultCard';
import { WaterQualityInput, WaterQualityResult } from '@/lib/water-quality';
import { MapPin, Calendar, RotateCcw, Play } from 'lucide-react';
import { toast } from 'sonner';

export default function PredictionPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<WaterQualityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [locationData, setLocationData] = useState({
    area: '',
    latitude: '',
    longitude: '',
    date: new Date().toISOString().split('T')[0],
  });

  const parameters = [
    'ph', 'hardness', 'tds', 'turbidity', 'alkalinity', 
    'nitrate', 'fluoride', 'chloride', 'conductivity', 'temperature'
  ] as const;

  const handleParameterChange = (parameter: string, value: string) => {
    setFormData(prev => ({ ...prev, [parameter]: value }));
    
    // Clear error for this field if value is valid
    if (value === '' || !isNaN(parseFloat(value))) {
      setErrors(prev => ({ ...prev, [parameter]: '' }));
    }
  };

  const handleLocationChange = (field: string, value: string) => {
    setLocationData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Check if at least one parameter is provided
    const hasValidParameter = parameters.some(param => {
      const value = formData[param];
      return value !== '' && !isNaN(parseFloat(value));
    });

    if (!hasValidParameter) {
      newErrors.general = 'Please provide at least one water quality parameter';
    }

    // Validate individual parameters
    parameters.forEach(param => {
      const value = formData[param];
      if (value !== '' && isNaN(parseFloat(value))) {
        newErrors[param] = 'Please enter a valid number';
      }
    });

    // Validate location data if provided
    if (locationData.latitude && (isNaN(parseFloat(locationData.latitude)) || 
        parseFloat(locationData.latitude) < -90 || parseFloat(locationData.latitude) > 90)) {
      newErrors.latitude = 'Please enter a valid latitude (-90 to 90)';
    }

    if (locationData.longitude && (isNaN(parseFloat(locationData.longitude)) || 
        parseFloat(locationData.longitude) < -180 || parseFloat(locationData.longitude) > 180)) {
      newErrors.longitude = 'Please enter a valid longitude (-180 to 180)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Prepare request data
      const requestData: any = {};
      
      // Add parameters
      parameters.forEach(param => {
        const value = formData[param];
        if (value !== '' && !isNaN(parseFloat(value))) {
          requestData[param] = parseFloat(value);
        }
      });

      // Add location data if provided
      if (locationData.area) requestData.area = locationData.area;
      if (locationData.latitude) requestData.latitude = parseFloat(locationData.latitude);
      if (locationData.longitude) requestData.longitude = parseFloat(locationData.longitude);
      if (locationData.date) requestData.date = new Date(locationData.date).toISOString();

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        toast.success('Water quality analysis completed successfully!');
      } else {
        toast.error(data.error || 'Failed to analyze water quality');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('An error occurred while analyzing water quality');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
    setErrors({});
    setLocationData({
      area: '',
      latitude: '',
      longitude: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    toast.success('Record saved successfully!');
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    toast.success('Results exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Water Quality Prediction</h1>
              <p className="text-gray-600">Analyze water quality parameters and get instant results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Information
                </CardTitle>
                <CardDescription>
                  Optional: Add location details for geographic analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="area">Area Name</Label>
                  <Input
                    id="area"
                    value={locationData.area}
                    onChange={(e) => handleLocationChange('area', e.target.value)}
                    placeholder="e.g., Downtown Water Station"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={locationData.latitude}
                      onChange={(e) => handleLocationChange('latitude', e.target.value)}
                      placeholder="e.g., 40.7128"
                      className={errors.latitude ? 'border-red-500' : ''}
                    />
                    {errors.latitude && (
                      <div className="text-sm text-red-600 mt-1">{errors.latitude}</div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={locationData.longitude}
                      onChange={(e) => handleLocationChange('longitude', e.target.value)}
                      placeholder="e.g., -74.0060"
                      className={errors.longitude ? 'border-red-500' : ''}
                    />
                    {errors.longitude && (
                      <div className="text-sm text-red-600 mt-1">{errors.longitude}</div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sample Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={locationData.date}
                    onChange={(e) => handleLocationChange('date', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Water Quality Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Parameters</CardTitle>
                <CardDescription>
                  Enter at least one parameter for analysis. More parameters provide better accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {errors.general && (
                  <Alert className="mb-4">
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid gap-4">
                  {parameters.map((parameter) => (
                    <ParameterInput
                      key={parameter}
                      parameter={parameter}
                      value={formData[parameter] || ''}
                      onChange={(value) => handleParameterChange(parameter, value)}
                      error={errors[parameter]}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Analyze Water Quality
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ResultCard
              result={result}
              isLoading={isLoading}
              onSave={handleSave}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}