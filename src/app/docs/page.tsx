'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Droplets, 
  Code, 
  Database,
  Calculator,
  BookOpen,
  Download,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function DocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
              <p className="text-gray-600">Complete guide to WaterSpot platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <nav className="space-y-2">
                    <a href="#wqi" className="block p-2 text-sm hover:bg-gray-100 rounded">WQI Formula</a>
                    <a href="#parameters" className="block p-2 text-sm hover:bg-gray-100 rounded">Parameters</a>
                    <a href="#api" className="block p-2 text-sm hover:bg-gray-100 rounded">API Reference</a>
                    <a href="#examples" className="block p-2 text-sm hover:bg-gray-100 rounded">Examples</a>
                    <a href="#data-dictionary" className="block p-2 text-sm hover:bg-gray-100 rounded">Data Dictionary</a>
                    <a href="#standards" className="block p-2 text-sm hover:bg-gray-100 rounded">Standards</a>
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="wqi">WQI Formula</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="standards">Standards</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Droplets className="h-5 w-5" />
                        Welcome to WaterSpot
                      </CardTitle>
                      <CardDescription>
                        Comprehensive water quality prediction and analysis platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">
                          WaterSpot is an advanced platform for analyzing and predicting water quality 
                          using scientific methodologies and machine learning. Our system calculates the 
                          Water Quality Index (WQI) based on multiple parameters and provides comprehensive 
                          insights for water quality management.
                        </p>
                        
                        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• <strong>Real-time Analysis:</strong> Instant water quality calculations with detailed parameter contributions</li>
                          <li>• <strong>Bulk Processing:</strong> Upload and analyze large datasets with streaming validation</li>
                          <li>• <strong>Interactive Maps:</strong> Geographic visualization with heatmaps and filtering</li>
                          <li>• <strong>Trend Analysis:</strong> Track water quality changes over time</li>
                          <li>• <strong>API Access:</strong> Programmatic access for integration with external systems</li>
                          <li>• <strong>Standards Compliance:</strong> BIS and WHO standard validation</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Single Prediction</h4>
                            <p className="text-sm text-gray-600">Go to the Prediction page and enter water quality parameters for instant analysis.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Bulk Upload</h4>
                            <p className="text-sm text-gray-600">Upload CSV or Excel files with multiple water quality records for batch processing.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Analyze Results</h4>
                            <p className="text-sm text-gray-600">Use the Analysis page to explore data with interactive maps and charts.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="wqi">
                <div className="space-y-6">
                  <Card id="wqi">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Water Quality Index (WQI) Formula
                      </CardTitle>
                      <CardDescription>
                        Scientific methodology for calculating water quality
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Overview</h3>
                          <p className="text-gray-600">
                            The Water Quality Index (WQI) is a single value that expresses the overall 
                            water quality based on multiple parameters. Our calculation uses a weighted 
                            aggregation method following BIS and WHO guidelines.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Formula</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <code className="text-sm">
                              WQI = Σ(Wi × Si) / ΣWi
                            </code>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Where Wi = weight of i-th parameter, Si = sub-index of i-th parameter
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Sub-Index Calculation</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <code className="text-sm">
                              Si = 100 × (1 - |Vi - Videal| / Vmax-deviation)
                            </code>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Where Vi = measured value, Videal = ideal value, Vmax-deviation = maximum allowable deviation
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Parameter Weights</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Parameter</th>
                                  <th className="text-left p-2">Weight</th>
                                  <th className="text-left p-2">Range</th>
                                  <th className="text-left p-2">Ideal</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">pH</td>
                                  <td className="p-2">0.12</td>
                                  <td className="p-2">6.5-8.5</td>
                                  <td className="p-2">7.0</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Hardness</td>
                                  <td className="p-2">0.08</td>
                                  <td className="p-2">0-300 mg/L</td>
                                  <td className="p-2">100 mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">TDS</td>
                                  <td className="p-2">0.10</td>
                                  <td className="p-2">0-500 mg/L</td>
                                  <td className="p-2">200 mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Turbidity</td>
                                  <td className="p-2">0.10</td>
                                  <td className="p-2">0-5 NTU</td>
                                  <td className="p-2">1 NTU</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Alkalinity</td>
                                  <td className="p-2">0.08</td>
                                  <td className="p-2">20-200 mg/L</td>
                                  <td className="p-2">100 mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Nitrate</td>
                                  <td className="p-2">0.12</td>
                                  <td className="p-2">0-45 mg/L</td>
                                  <td className="p-2">10 mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Fluoride</td>
                                  <td className="p-2">0.10</td>
                                  <td className="p-2">0-1.5 mg/L</td>
                                  <td className="p-2">0.7 mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Chloride</td>
                                  <td className="p-2">0.08</td>
                                  <td className="p-2">0-250 mg/L</td>
                                  <td className="p-2">100 mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Conductivity</td>
                                  <td className="p-2">0.10</td>
                                  <td className="p-2">0-1500 µS/cm</td>
                                  <td className="p-2">500 µS/cm</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Temperature</td>
                                  <td className="p-2">0.12</td>
                                  <td className="p-2">0-30°C</td>
                                  <td className="p-2">20°C</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">WQI Classification</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                              <div>
                                <span className="font-medium">Good:</span> WQI ≥ 80
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                              <div>
                                <span className="font-medium">Moderate:</span> 60 ≤ WQI &lt; 80
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                              <div>
                                <span className="font-medium">Poor:</span> WQI &lt; 60
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="api">
                <div className="space-y-6">
                  <Card id="api">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        API Reference
                      </CardTitle>
                      <CardDescription>
                        RESTful API for programmatic access to WaterSpot functionality
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                            https://api.waterspot.com/v1
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                          <p className="text-gray-600 mb-3">
                            Include your API key in the Authorization header:
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                            Authorization: Bearer YOUR_API_KEY
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Endpoints</h3>
                          
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">POST /predict</h4>
                                <Badge>Single Prediction</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Calculate water quality for a single set of parameters
                              </p>
                              
                              <div className="space-y-3">
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Request Body</h5>
                                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                                    <pre>{`{
  "ph": 7.2,
  "hardness": 150,
  "tds": 200,
  "turbidity": 2.5,
  "alkalinity": 100,
  "nitrate": 10,
  "fluoride": 0.7,
  "chloride": 50,
  "conductivity": 500,
  "temperature": 20,
  "area": "Sample Location",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-01-15T10:00:00Z"
}`}</pre>
                                  </div>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Response</h5>
                                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                                    <pre>{`{
  "success": true,
  "data": {
    "wqi": 75.5,
    "label": "Moderate",
    "confidence": 85.0,
    "warnings": [],
    "parameterContributions": [...],
    "timestamp": "2024-01-15T10:00:00Z"
  }
}`}</pre>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">POST /bulk-predict</h4>
                                <Badge>Bulk Prediction</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Process multiple water quality records asynchronously
                              </p>
                              
                              <div className="space-y-3">
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Request Body</h5>
                                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                                    <pre>{`{
  "data": [
    {
      "ph": 7.2,
      "hardness": 150,
      // ... other parameters
    },
    // ... more records
  ]
}`}</pre>
                                  </div>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Response</h5>
                                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                                    <pre>{`{
  "success": true,
  "data": {
    "jobId": "job_1642234567890_abc123",
    "status": "queued",
    "total": 1000
  }
}`}</pre>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">GET /bulk-predict?jobId=JOB_ID</h4>
                                <Badge>Job Status</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Check the status of a bulk prediction job
                              </p>
                              
                              <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                                <pre>{`{
  "success": true,
  "data": {
    "jobId": "job_1642234567890_abc123",
    "status": "completed",
    "progress": 1000,
    "total": 1000,
    "results": [...]
  }
}`}</pre>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Error Handling</h3>
                          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                            <pre>{`{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "ph",
      "message": "pH must be between 0 and 14"
    }
  ]
}`}</pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="examples">
                <div className="space-y-6">
                  <Card id="examples">
                    <CardHeader>
                      <CardTitle>Code Examples</CardTitle>
                      <CardDescription>
                        Sample code for integrating with WaterSpot API
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">JavaScript/Node.js</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Single Prediction</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => copyToClipboard(`const response = await fetch('https://api.waterspot.com/v1/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    ph: 7.2,
    hardness: 150,
    tds: 200,
    turbidity: 2.5,
    alkalinity: 100,
    nitrate: 10,
    fluoride: 0.7,
    chloride: 50,
    conductivity: 500,
    temperature: 20
  })
});

const result = await response.json();
console.log('WQI:', result.data.wqi);
console.log('Label:', result.data.label);`)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-xs font-mono overflow-x-auto">{`const response = await fetch('https://api.waterspot.com/v1/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    ph: 7.2,
    hardness: 150,
    tds: 200,
    turbidity: 2.5,
    alkalinity: 100,
    nitrate: 10,
    fluoride: 0.7,
    chloride: 50,
    conductivity: 500,
    temperature: 20
  })
});

const result = await response.json();
console.log('WQI:', result.data.wqi);
console.log('Label:', result.data.label);`}</pre>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Python</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Bulk Prediction</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => copyToClipboard(`import requests
import json

# Submit bulk prediction job
data = {
    "data": [
        {
            "ph": 7.2,
            "hardness": 150,
            "tds": 200,
            # ... other parameters
        },
        # ... more records
    ]
}

response = requests.post(
    'https://api.waterspot.com/v1/bulk-predict',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    json=data
)

job = response.json()
job_id = job['data']['jobId']

# Poll for results
while True:
    status_response = requests.get(
        f'https://api.waterspot.com/v1/bulk-predict?jobId={job_id}',
        headers={'Authorization': 'Bearer YOUR_API_KEY'}
    )
    
    status = status_response.json()
    if status['data']['status'] == 'completed':
        results = status['data']['results']
        break
    elif status['data']['status'] == 'failed':
        print('Job failed:', status['data']['error'])
        break
    
    time.sleep(5)  # Wait 5 seconds before checking again`)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-xs font-mono overflow-x-auto">{`import requests
import json

# Submit bulk prediction job
data = {
    "data": [
        {
            "ph": 7.2,
            "hardness": 150,
            "tds": 200,
            # ... other parameters
        },
        # ... more records
    ]
}

response = requests.post(
    'https://api.waterspot.com/v1/bulk-predict',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    json=data
)

job = response.json()
job_id = job['data']['jobId']

# Poll for results
while True:
    status_response = requests.get(
        f'https://api.waterspot.com/v1/bulk-predict?jobId={job_id}',
        headers={'Authorization': 'Bearer YOUR_API_KEY'}
    )
    
    status = status_response.json()
    if status['data']['status'] == 'completed':
        results = status['data']['results']
        break
    elif status['data']['status'] == 'failed':
        print('Job failed:', status['data']['error'])
        break
    
    time.sleep(5)  # Wait 5 seconds before checking again`}</pre>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">cURL</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">API Request</span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => copyToClipboard(`curl -X POST https://api.waterspot.com/v1/predict \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "ph": 7.2,
    "hardness": 150,
    "tds": 200,
    "turbidity": 2.5,
    "alkalinity": 100,
    "nitrate": 10,
    "fluoride": 0.7,
    "chloride": 50,
    "conductivity": 500,
    "temperature": 20
  }'`)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <pre className="text-xs font-mono overflow-x-auto">{`curl -X POST https://api.waterspot.com/v1/predict \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "ph": 7.2,
    "hardness": 150,
    "tds": 200,
    "turbidity": 2.5,
    "alkalinity": 100,
    "nitrate": 10,
    "fluoride": 0.7,
    "chloride": 50,
    "conductivity": 500,
    "temperature": 20
  }'`}</pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="standards">
                <div className="space-y-6">
                  <Card id="standards">
                    <CardHeader>
                      <CardTitle>Water Quality Standards</CardTitle>
                      <CardDescription>
                        BIS and WHO standards for water quality parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">BIS (Bureau of Indian Standards)</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Parameter</th>
                                  <th className="text-left p-2">Acceptable Limit</th>
                                  <th className="text-left p-2">Permissible Limit</th>
                                  <th className="text-left p-2">Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">pH</td>
                                  <td className="p-2">6.5-8.5</td>
                                  <td className="p-2">-</td>
                                  <td className="p-2">-</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Hardness</td>
                                  <td className="p-2">300</td>
                                  <td className="p-2">600</td>
                                  <td className="p-2">mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">TDS</td>
                                  <td className="p-2">500</td>
                                  <td className="p-2">2000</td>
                                  <td className="p-2">mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Turbidity</td>
                                  <td className="p-2">5</td>
                                  <td className="p-2">10</td>
                                  <td className="p-2">NTU</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Alkalinity</td>
                                  <td className="p-2">200</td>
                                  <td className="p-2">600</td>
                                  <td className="p-2">mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Nitrate</td>
                                  <td className="p-2">45</td>
                                  <td className="p-2">100</td>
                                  <td className="p-2">mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Fluoride</td>
                                  <td className="p-2">1.0</td>
                                  <td className="p-2">1.5</td>
                                  <td className="p-2">mg/L</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Chloride</td>
                                  <td className="p-2">250</td>
                                  <td className="p-2">1000</td>
                                  <td className="p-2">mg/L</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">WHO (World Health Organization)</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Parameter</th>
                                  <th className="text-left p-2">Guideline Value</th>
                                  <th className="text-left p-2">Unit</th>
                                  <th className="text-left p-2">Health-based</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">pH</td>
                                  <td className="p-2">6.5-8.5</td>
                                  <td className="p-2">-</td>
                                  <td className="p-2">No</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">TDS</td>
                                  <td className="p-2">1000</td>
                                  <td className="p-2">mg/L</td>
                                  <td className="p-2">No</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Turbidity</td>
                                  <td className="p-2">5</td>
                                  <td className="p-2">NTU</td>
                                  <td className="p-2">No</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Nitrate</td>
                                  <td className="p-2">50</td>
                                  <td className="p-2">mg/L</td>
                                  <td className="p-2">Yes</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Fluoride</td>
                                  <td className="p-2">1.5</td>
                                  <td className="p-2">mg/L</td>
                                  <td className="p-2">Yes</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Chloride</td>
                                  <td className="p-2">250</td>
                                  <td className="p-2">mg/L</td>
                                  <td className="p-2">No</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">References</h3>
                          <ul className="space-y-2 text-gray-600">
                            <li>• IS 10500:2012 - Indian Standard for Drinking Water</li>
                            <li>• WHO Guidelines for Drinking-Water Quality (4th Edition)</li>
                            <li>• EPA National Primary Drinking Water Regulations</li>
                            <li>• EU Drinking Water Directive (98/83/EC)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}