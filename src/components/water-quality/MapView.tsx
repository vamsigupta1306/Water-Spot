'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Filter, 
  Layers,
  ZoomIn,
  ZoomOut,
  Download
} from 'lucide-react';

interface MapViewProps {
  data: any[];
  filters: any;
  onFilterChange: (filters: any) => void;
}

export function MapView({ data, filters, onFilterChange }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedArea, setSelectedArea] = useState<any>(null);

  // This is a placeholder component for the map
  // In a real implementation, you would use react-leaflet here
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getWQIColor = (wqi: number) => {
    if (wqi >= 80) return 'bg-green-500';
    if (wqi >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getWQILabel = (wqi: number) => {
    if (wqi >= 80) return 'Good';
    if (wqi >= 60) return 'Moderate';
    return 'Poor';
  };

  const exportMap = () => {
    // Placeholder for map export functionality
    console.log('Exporting map...');
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Water Quality Map
            </CardTitle>
            <CardDescription>
              Interactive map showing water quality by location
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm" onClick={exportMap}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Map Container */}
          <div 
            ref={mapRef}
            className="w-full h-96 bg-gray-100 relative overflow-hidden"
          >
            {!mapLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* Placeholder map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg font-medium">Interactive Map</p>
                      <p className="text-gray-500 text-sm">Water quality data visualization</p>
                    </div>
                  </div>
                </div>

                {/* Sample location markers */}
                {data.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`,
                    }}
                    onClick={() => setSelectedArea(item)}
                  >
                    <div className={`w-4 h-4 rounded-full ${getWQIColor(item.wqi || 70)} border-2 border-white shadow-lg`}></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                      {item.area || `Area ${index + 1}`}
                    </div>
                  </div>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="bg-white">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <h4 className="font-medium text-sm mb-2">Water Quality</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Good (≥80)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Moderate (60-79)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Poor (&lt;60)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected Area Details */}
          {selectedArea && (
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{selectedArea.area || 'Unknown Area'}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedArea(null)}
                >
                  ×
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>WQI:</span>
                  <Badge className={getWQIColor(selectedArea.wqi || 70).replace('bg-', 'bg-opacity-20 text-').replace('500', '600')}>
                    {selectedArea.wqi || 70} - {getWQILabel(selectedArea.wqi || 70)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Coordinates:</span>
                  <span className="text-gray-600">
                    {selectedArea.latitude?.toFixed(4) || 'N/A'}, {selectedArea.longitude?.toFixed(4) || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Records:</span>
                  <span className="text-gray-600">{selectedArea.recordCount || 1}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}