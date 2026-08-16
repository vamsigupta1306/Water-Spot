'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Droplets, 
  MapPin, 
  Upload, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Activity,
  FileText,
  Users
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">WaterSpot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs">
              <Button variant="ghost">Documentation</Button>
            </Link>
            <Link href="/prediction">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
          AI-Powered Water Quality Analysis
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Predict & Map Water Quality
          <span className="block text-blue-600">By Area</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Advanced water quality prediction and analysis platform. Transform single measurements 
          or large datasets into actionable insights with interactive maps and comprehensive reports.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/prediction">
            <Button size="lg" className="text-lg px-8 py-6">
              <Activity className="mr-2 h-5 w-5" />
              Try Prediction
            </Button>
          </Link>
          <Link href="/upload">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Upload className="mr-2 h-5 w-5" />
              Upload Dataset
            </Button>
          </Link>
          <Link href="/analysis">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <MapPin className="mr-2 h-5 w-5" />
              View Analysis
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Water Quality Tools
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to analyze, predict, and monitor water quality
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Instant Prediction</CardTitle>
              </div>
              <CardDescription>
                Get real-time water quality analysis with WQI scores and confidence levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Weighted parameter analysis</li>
                <li>• BIS/WHO standard compliance</li>
                <li>• Detailed parameter contributions</li>
                <li>• Automated warning system</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Interactive Maps</CardTitle>
              </div>
              <CardDescription>
                Visualize water quality data with heatmaps and geographic filtering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time heatmap visualization</li>
                <li>• Geographic area filtering</li>
                <li>• Time-based analysis</li>
                <li>• Parameter-specific views</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Bulk Processing</CardTitle>
              </div>
              <CardDescription>
                Upload and process large CSV/XLSX datasets with streaming validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• CSV & Excel file support</li>
                <li>• Real-time validation</li>
                <li>• Progress tracking</li>
                <li>• Error reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Trend Analysis</CardTitle>
              </div>
              <CardDescription>
                Track water quality trends over time with advanced analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Time series analysis</li>
                <li>• Parameter correlations</li>
                <li>• Outlier detection</li>
                <li>• Statistical summaries</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Quality Assurance</CardTitle>
              </div>
              <CardDescription>
                Comprehensive validation based on BIS and WHO standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Standard compliance checking</li>
                <li>• Automated warnings</li>
                <li>• Confidence scoring</li>
                <li>• Quality thresholds</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
              </div>
              <CardDescription>
                Comprehensive dashboard with KPIs and detailed insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time KPI tracking</li>
                <li>• Distribution analysis</li>
                <li>• Performance metrics</li>
                <li>• Export capabilities</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Water Quality Data?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals using WaterSpot for water quality analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prediction">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Free Analysis
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                <FileText className="mr-2 h-5 w-5" />
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">WaterSpot</span>
              </div>
              <p className="text-gray-400">
                Advanced water quality prediction and analysis platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/prediction" className="hover:text-white">Prediction</Link></li>
                <li><Link href="/analysis" className="hover:text-white">Analysis</Link></li>
                <li><Link href="/upload" className="hover:text-white">Upload</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/docs#api" className="hover:text-white">API Reference</Link></li>
                <li><Link href="/docs#wqi" className="hover:text-white">WQI Formula</Link></li>
                <li><Link href="/docs#examples" className="hover:text-white">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/settings" className="hover:text-white">Settings</Link></li>
                <li><span className="flex items-center gap-1"><Users className="h-4 w-4" /> Contact</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WaterSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}