'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/water-quality/MapView';
import { 
  MapPin, 
  Filter, 
  TrendingUp, 
  BarChart3, 
  Download,
  RefreshCw,
  Calendar,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AnalysisPage() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    parameter: 'wqi',
    minWQI: '',
    maxWQI: '',
    label: 'all',
    area: '',
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockData = [
      {
        id: '1',
        area: 'Downtown Station',
        latitude: 40.7128,
        longitude: -74.0060,
        date: '2024-01-15',
        wqi: 75.5,
        label: 'Moderate',
        ph: 7.2,
        hardness: 150,
        tds: 200,
        turbidity: 2.5,
        recordCount: 24,
      },
      {
        id: '2',
        area: 'Riverside Plant',
        latitude: 40.7580,
        longitude: -73.9855,
        date: '2024-01-16',
        wqi: 85.2,
        label: 'Good',
        ph: 7.0,
        hardness: 120,
        tds: 180,
        turbidity: 1.8,
        recordCount: 18,
      },
      {
        id: '3',
        area: 'Industrial Zone',
        latitude: 40.7489,
        longitude: -73.9680,
        date: '2024-01-17',
        wqi: 55.8,
        label: 'Poor',
        ph: 6.8,
        hardness: 280,
        tds: 450,
        turbidity: 4.2,
        recordCount: 32,
      },
      {
        id: '4',
        area: 'Suburban North',
        latitude: 40.7831,
        longitude: -73.9712,
        date: '2024-01-18',
        wqi: 82.1,
        label: 'Good',
        ph: 7.1,
        hardness: 130,
        tds: 190,
        turbidity: 2.1,
        recordCount: 15,
      },
      {
        id: '5',
        area: 'Lakeside Facility',
        latitude: 40.7794,
        longitude: -73.9632,
        date: '2024-01-19',
        wqi: 68.9,
        label: 'Moderate',
        ph: 7.3,
        hardness: 160,
        tds: 220,
        turbidity: 2.8,
        recordCount: 21,
      },
    ];

    setTimeout(() => {
      setData(mockData);
      setFilteredData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...data];

    if (filters.minWQI) {
      filtered = filtered.filter(item => item.wqi >= parseFloat(filters.minWQI));
    }

    if (filters.maxWQI) {
      filtered = filtered.filter(item => item.wqi <= parseFloat(filters.maxWQI));
    }

    if (filters.label !== 'all') {
      filtered = filtered.filter(item => item.label === filters.label);
    }

    if (filters.area) {
      filtered = filtered.filter(item => 
        item.area.toLowerCase().includes(filters.area.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [data, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: 'all',
      parameter: 'wqi',
      minWQI: '',
      maxWQI: '',
      label: 'all',
      area: '',
    });
  };

  const exportData = () => {
    // Placeholder for export functionality
    console.log('Exporting data...');
  };

  // Prepare chart data
  const trendData = data.map(item => ({
    date: item.date,
    wqi: item.wqi,
    area: item.area,
  }));

  const distributionData = [
    { label: 'Good', count: data.filter(d => d.label === 'Good').length, color: '#10b981' },
    { label: 'Moderate', count: data.filter(d => d.label === 'Moderate').length, color: '#f59e0b' },
    { label: 'Poor', count: data.filter(d => d.label === 'Poor').length, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Water Quality Analysis</h1>
              <p className="text-gray-600">Interactive maps and comprehensive data analysis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="area">Area Name</Label>
                <Input
                  id="area"
                  placeholder="Search areas..."
                  value={filters.area}
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="minWQI">Min WQI</Label>
                <Input
                  id="minWQI"
                  type="number"
                  placeholder="0"
                  value={filters.minWQI}
                  onChange={(e) => handleFilterChange('minWQI', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxWQI">Max WQI</Label>
                <Input
                  id="maxWQI"
                  type="number"
                  placeholder="100"
                  value={filters.maxWQI}
                  onChange={(e) => handleFilterChange('maxWQI', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="label">Quality Label</Label>
                <Select value={filters.label} onValueChange={(value) => handleFilterChange('label', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Labels</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" onClick={resetFilters}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Badge variant="secondary">
                {filteredData.length} of {data.length} areas
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <MapView 
              data={filteredData} 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Summary Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Summary Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredData.length}
                    </div>
                    <div className="text-sm text-blue-700">Total Areas</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-green-50 rounded">
                      <div className="text-lg font-semibold text-green-600">
                        {filteredData.filter(d => d.label === 'Good').length}
                      </div>
                      <div className="text-xs text-green-700">Good</div>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded">
                      <div className="text-lg font-semibold text-yellow-600">
                        {filteredData.filter(d => d.label === 'Moderate').length}
                      </div>
                      <div className="text-xs text-yellow-700">Moderate</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded">
                      <div className="text-lg font-semibold text-red-600">
                        {filteredData.filter(d => d.label === 'Poor').length}
                      </div>
                      <div className="text-xs text-red-700">Poor</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-semibold text-gray-700">
                      {filteredData.length > 0 
                        ? (filteredData.reduce((sum, item) => sum + item.wqi, 0) / filteredData.length).toFixed(1)
                        : '0'
                      }
                    </div>
                    <div className="text-sm text-gray-600">Average WQI</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analysis Tabs */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trends" className="w-full">
              <TabsList>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="areas">Areas</TabsTrigger>
                <TabsTrigger value="correlations">Correlations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trends" className="mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">WQI Trends Over Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="wqi" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="areas" className="mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Area Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Area</TableHead>
                        <TableHead>WQI</TableHead>
                        <TableHead>Label</TableHead>
                        <TableHead>pH</TableHead>
                        <TableHead>Records</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.area}</TableCell>
                          <TableCell>{item.wqi}</TableCell>
                          <TableCell>
                            <Badge className={
                              item.label === 'Good' ? 'bg-green-100 text-green-800' :
                              item.label === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {item.label}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.ph}</TableCell>
                          <TableCell>{item.recordCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="correlations" className="mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Parameter Correlations</h3>
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Correlation analysis will be available with more data</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}