'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PARAMETER_RANGES } from '@/lib/water-quality';

interface ParameterInputProps {
  parameter: keyof typeof PARAMETER_RANGES;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ParameterInput({ parameter, value, onChange, error }: ParameterInputProps) {
  const range = PARAMETER_RANGES[parameter];
  const [isFocused, setIsFocused] = useState(false);

  const getUnit = (param: keyof typeof PARAMETER_RANGES) => {
    const units: Record<string, string> = {
      ph: '',
      hardness: 'mg/L',
      tds: 'mg/L',
      turbidity: 'NTU',
      alkalinity: 'mg/L',
      nitrate: 'mg/L',
      fluoride: 'mg/L',
      chloride: 'mg/L',
      conductivity: 'µS/cm',
      temperature: '°C',
    };
    return units[param] || '';
  };

  const getStatusColor = (param: keyof typeof PARAMETER_RANGES, val: string) => {
    const numValue = parseFloat(val);
    if (isNaN(numValue)) return 'text-gray-500';
    
    if (numValue < range.min || numValue > range.max) {
      return 'text-red-600';
    }
    
    const deviation = Math.abs(numValue - range.ideal);
    const maxDeviation = Math.max(range.ideal - range.min, range.max - range.ideal);
    const deviationPercent = (deviation / maxDeviation) * 100;
    
    if (deviationPercent <= 25) return 'text-green-600';
    if (deviationPercent <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className={`transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500' : ''} ${error ? 'border-red-500' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg capitalize">{parameter.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
            <CardDescription className="text-sm">
              {getUnit(parameter) && `(${getUnit(parameter)})`}
            </CardDescription>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-xs">
              {range.min} - {range.max}
            </Badge>
            <div className="text-xs text-gray-500 mt-1">
              Ideal: {range.ideal}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor={parameter} className="text-sm font-medium">
            Value
          </Label>
          <Input
            id={parameter}
            type="number"
            step="any"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={`Enter ${parameter} value`}
            className={error ? 'border-red-500' : ''}
          />
          {value && !isNaN(parseFloat(value)) && (
            <div className={`text-xs ${getStatusColor(parameter, value)}`}>
              {parseFloat(value) < range.min && 'Below minimum range'}
              {parseFloat(value) > range.max && 'Above maximum range'}
              {parseFloat(value) >= range.min && parseFloat(value) <= range.max && 'Within acceptable range'}
            </div>
          )}
          {error && (
            <div className="text-xs text-red-600">{error}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}