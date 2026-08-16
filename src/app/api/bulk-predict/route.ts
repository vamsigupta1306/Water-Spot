import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateWaterQuality, WaterQualityInputSchema } from '@/lib/water-quality';

const BulkPredictItemSchema = WaterQualityInputSchema.extend({
  area: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  date: z.string().datetime().optional(),
});

const BulkPredictRequestSchema = z.object({
  data: z.array(BulkPredictItemSchema).min(1).max(10000), // Limit batch size
});

// Simple job tracking (in production, use Redis or database)
const jobStatus = new Map<string, {
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  total: number;
  results?: any[];
  error?: string;
}>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedInput = BulkPredictRequestSchema.parse(body);
    
    // Generate job ID
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize job status
    jobStatus.set(jobId, {
      status: 'queued',
      progress: 0,
      total: validatedInput.data.length,
    });
    
    // Process asynchronously
    processBulkPredict(jobId, validatedInput.data);
    
    return NextResponse.json({
      success: true,
      data: {
        jobId,
        status: 'queued',
        total: validatedInput.data.length,
      }
    });
    
  } catch (error) {
    console.error('Bulk predict error:', error);
    
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');
  
  if (!jobId) {
    return NextResponse.json({
      success: false,
      error: 'Job ID is required'
    }, { status: 400 });
  }
  
  const job = jobStatus.get(jobId);
  
  if (!job) {
    return NextResponse.json({
      success: false,
      error: 'Job not found'
    }, { status: 404 });
  }
  
  return NextResponse.json({
    success: true,
    data: {
      jobId,
      status: job.status,
      progress: job.progress,
      total: job.total,
      results: job.results || null,
      error: job.error || null,
    }
  });
}

async function processBulkPredict(jobId: string, data: any[]) {
  try {
    const job = jobStatus.get(jobId);
    if (!job) return;
    
    job.status = 'processing';
    const results = [];
    
    for (let i = 0; i < data.length; i++) {
      try {
        const result = calculateWaterQuality(data[i]);
        results.push({
          input: data[i],
          result: {
            wqi: result.wqi,
            label: result.label,
            confidence: result.confidence,
            warnings: result.warnings,
            parameterContributions: result.parameterContributions,
          }
        });
      } catch (error) {
        results.push({
          input: data[i],
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
      
      // Update progress
      job.progress = i + 1;
      
      // Prevent blocking the event loop too long
      if (i % 100 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    // Complete job
    job.status = 'completed';
    job.results = results;
    
  } catch (error) {
    const job = jobStatus.get(jobId);
    if (job) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : 'Unknown error';
    }
  }
}