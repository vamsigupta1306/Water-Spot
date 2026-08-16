import { z } from 'zod';

// Water quality parameter ranges based on BIS/WHO standards
export const PARAMETER_RANGES = {
  ph: { min: 6.5, max: 8.5, ideal: 7.0, weight: 0.12 },
  hardness: { min: 0, max: 300, ideal: 100, weight: 0.08 }, // mg/L
  tds: { min: 0, max: 500, ideal: 200, weight: 0.10 }, // mg/L
  turbidity: { min: 0, max: 5, ideal: 1, weight: 0.10 }, // NTU
  alkalinity: { min: 20, max: 200, ideal: 100, weight: 0.08 }, // mg/L
  nitrate: { min: 0, max: 45, ideal: 10, weight: 0.12 }, // mg/L
  fluoride: { min: 0, max: 1.5, ideal: 0.7, weight: 0.10 }, // mg/L
  chloride: { min: 0, max: 250, ideal: 100, weight: 0.08 }, // mg/L
  conductivity: { min: 0, max: 1500, ideal: 500, weight: 0.10 }, // µS/cm
  temperature: { min: 0, max: 30, ideal: 20, weight: 0.12 }, // °C
} as const;

export const WaterQualityInputSchema = z.object({
  ph: z.number().min(0).max(14).optional(),
  hardness: z.number().min(0).max(1000).optional(),
  tds: z.number().min(0).max(2000).optional(),
  turbidity: z.number().min(0).max(100).optional(),
  alkalinity: z.number().min(0).max(500).optional(),
  nitrate: z.number().min(0).max(200).optional(),
  fluoride: z.number().min(0).max(10).optional(),
  chloride: z.number().min(0).max(1000).optional(),
  conductivity: z.number().min(0).max(5000).optional(),
  temperature: z.number().min(-10).max(50).optional(),
});

export type WaterQualityInput = z.infer<typeof WaterQualityInputSchema>;

export interface WaterQualityResult {
  wqi: number;
  label: 'Good' | 'Moderate' | 'Poor';
  confidence: number;
  warnings: string[];
  parameterContributions: Array<{
    parameter: keyof typeof PARAMETER_RANGES;
    value: number;
    contribution: number;
    status: 'good' | 'moderate' | 'poor';
  }>;
}

// Calculate sub-index for a single parameter
function calculateSubIndex(
  parameter: keyof typeof PARAMETER_RANGES,
  value: number
): number {
  const range = PARAMETER_RANGES[parameter];
  
  if (value < range.min || value > range.max) {
    return 0; // Out of acceptable range
  }
  
  // Calculate deviation from ideal
  const deviation = Math.abs(value - range.ideal);
  const maxDeviation = Math.max(range.ideal - range.min, range.max - range.ideal);
  
  // Convert to 0-100 scale (100 = ideal, 0 = worst acceptable)
  const subIndex = Math.max(0, 100 - (deviation / maxDeviation) * 100);
  
  return subIndex;
}

// Get parameter status based on value
function getParameterStatus(
  parameter: keyof typeof PARAMETER_RANGES,
  value: number
): 'good' | 'moderate' | 'poor' {
  const range = PARAMETER_RANGES[parameter];
  
  if (value < range.min || value > range.max) {
    return 'poor';
  }
  
  const deviation = Math.abs(value - range.ideal);
  const maxDeviation = Math.max(range.ideal - range.min, range.max - range.ideal);
  const deviationPercent = (deviation / maxDeviation) * 100;
  
  if (deviationPercent <= 25) return 'good';
  if (deviationPercent <= 50) return 'moderate';
  return 'poor';
}

// Generate warnings for parameters exceeding limits
function generateWarnings(input: WaterQualityInput): string[] {
  const warnings: string[] = [];
  
  Object.entries(input).forEach(([key, value]) => {
    if (value === undefined) return;
    
    const param = key as keyof typeof PARAMETER_RANGES;
    const range = PARAMETER_RANGES[param];
    
    if (value < range.min) {
      warnings.push(`${key.toUpperCase()} is below minimum acceptable level (${range.min})`);
    } else if (value > range.max) {
      warnings.push(`${key.toUpperCase()} exceeds maximum acceptable level (${range.max})`);
    }
  });
  
  return warnings;
}

// Main water quality calculation function
export function calculateWaterQuality(input: WaterQualityInput): WaterQualityResult {
  const validatedInput = WaterQualityInputSchema.parse(input);
  
  // Calculate weighted WQI
  let totalWeightedScore = 0;
  let totalWeight = 0;
  const parameterContributions: WaterQualityResult['parameterContributions'] = [];
  
  Object.entries(validatedInput).forEach(([key, value]) => {
    if (value === undefined) return;
    
    const param = key as keyof typeof PARAMETER_RANGES;
    const range = PARAMETER_RANGES[param];
    
    const subIndex = calculateSubIndex(param, value);
    const weightedScore = subIndex * range.weight;
    
    totalWeightedScore += weightedScore;
    totalWeight += range.weight;
    
    parameterContributions.push({
      parameter: param,
      value,
      contribution: weightedScore,
      status: getParameterStatus(param, value),
    });
  });
  
  // Calculate final WQI (0-100 scale)
  const wqi = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  
  // Determine label based on WQI thresholds
  let label: 'Good' | 'Moderate' | 'Poor';
  if (wqi >= 80) {
    label = 'Good';
  } else if (wqi >= 60) {
    label = 'Moderate';
  } else {
    label = 'Poor';
  }
  
  // Calculate confidence based on number of parameters provided
  const parameterCount = Object.values(validatedInput).filter(v => v !== undefined).length;
  const maxParameters = Object.keys(PARAMETER_RANGES).length;
  const confidence = Math.min(100, (parameterCount / maxParameters) * 100);
  
  // Generate warnings
  const warnings = generateWarnings(validatedInput);
  
  return {
    wqi: Math.round(wqi * 100) / 100, // Round to 2 decimal places
    label,
    confidence: Math.round(confidence * 100) / 100,
    warnings,
    parameterContributions,
  };
}

// Export utility functions for testing and validation
export { calculateSubIndex, getParameterStatus, generateWarnings };