'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Upload,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Droplets
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // Mock dashboard data
  useEffect(() => {
    const mockData = {
      kpis: {
        totalRecords: 1247,
        areasCovered: 45,
        goodPercentage: 68.5,
        moderatePercentage: 24.2,
        poorPercentage: 7.3,
        avgWQI: 76.8,
        lastUpload: '2024-01-19T14:30:00Z',
        recentUploads: 12,
      },
      wqiTrend: [
        { date: '2024-01-01', wqi: 72.5 },
        { date: '2024-01-05', wqi: 74.2 },
        { date: '2024-01-10', wqi: 76.8 },
        { date: '2024-01-15', wqi: 75.3 },
        { date: '2024-01-19', wqi: 76.8 },
      ],
      parameterDistribution: [
        { parameter: 'pH', avg: 7.2, min: 6.5, max: 8.1 },
        { parameter: 'Hardness', avg: 145, min: 80, max: 280 },
        { parameter: 'TDS', avg: 210, min: 150, max: 450 },
        { parameter: 'Turbidity', avg: 2.4, min: 1.2, max: 4.8 },
        { parameter: 'Nitrate', avg: 12.5, min: 5, max: 25 },
      ],
      recentUploads: [
        { id: '1', filename: 'january_data.csv', status: 'completed', rows: 150, date: '2024-01-19', user: 'John Doe' },
        { id: '2', filename: 'riverside_samples.xlsx', status: 'completed', rows: 89, date: '2024-01-18', user: 'Jane Smith' },
        { id: '3', filename: 'industrial_zone.csv', status: 'processing', rows: 200, date: '2024-01-19', user: 'Mike Johnson' },
        { id: '4', filename: 'lakeside_data.csv', status: 'failed', rows: 0, date: '2024-01-17', user: 'Sarah Wilson' },
      ],
      qualityDistribution: [
        { name: 'Good', value: 68.5, color: '#10b981' },
        { name: 'Moderate', value: 24.2, color: '#f59e0b' },
        { name: 'Poor', value: 7.3, color: '#ef4444' },
      ],
    };

    setTimeout(() => {
      setDashboardData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { kpis, wqiTrend, parameterDistribution, recentUploads, qualityDistribution } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Water quality monitoring and analytics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpis.totalRecords.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Areas Covered</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpis.areasCovered}</div>
              <p className="text-xs text-muted-foreground">
                +3 new areas this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average WQI</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpis.avgWQI}</div>
              <p className="text-xs text-muted-foreground">
                +2.3 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpis.recentUploads}</div>
              <p className="text-xs text-muted-foreground">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quality Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Water Quality Distribution</CardTitle>
              <CardDescription>
                Overview of water quality classifications across all areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Good Quality</span>
                    <span className="text-sm text-gray-600">{kpis.goodPercentage}%</span>
                  </div>
                  <Progress value={kpis.goodPercentage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Moderate Quality</span>
                    <span className="text-sm text-gray-600">{kpis.moderatePercentage}%</span>
                  </div>
                  <Progress value={kpis.moderatePercentage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Poor Quality</span>
                    <span className="text-sm text-gray-600">{kpis.poorPercentage}%</span>
                  </div>
                  <Progress value={kpis.poorPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={qualityDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {qualityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {qualityDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trends">WQI Trends</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="uploads">Recent Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Water Quality Index Trends
                </CardTitle>
                <CardDescription>
                  Average WQI over time across all monitored areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wqiTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="wqi" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Parameter Distribution Analysis
                </CardTitle>
                <CardDescription>
                  Statistical overview of water quality parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={parameterDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="parameter" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Average</TableHead>
                        <TableHead>Min</TableHead>
                        <TableHead>Max</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parameterDistribution.map((param) => (
                        <TableRow key={param.parameter}>
                          <TableCell className="font-medium">{param.parameter}</TableCell>
                          <TableCell>{param.avg}</TableCell>
                          <TableCell>{param.min}</TableCell>
                          <TableCell>{param.max}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uploads">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Recent Upload Activity
                </CardTitle>
                <CardDescription>
                  Latest file uploads and their processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filename</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Rows</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUploads.map((upload) => (
                      <TableRow key={upload.id}>
                        <TableCell className="font-medium">{upload.filename}</TableCell>
                        <TableCell>{upload.user}</TableCell>
                        <TableCell>{upload.rows}</TableCell>
                        <TableCell>
                          <Badge className={
                            upload.status === 'completed' ? 'bg-green-100 text-green-800' :
                            upload.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {upload.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {upload.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                            {upload.status === 'failed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {upload.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{upload.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}