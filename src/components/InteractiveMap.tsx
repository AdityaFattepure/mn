import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Fish, Zap } from 'lucide-react';
import worldOceanMap from '@/assets/world-ocean-map.png';

interface OceanRegionData {
  name: string;
  temperature: number;
  chlorophyll: number;
  salinity: number;
  fishActivity: number;
  coordinates: { x: number; y: number; width: number; height: number };
}

const oceanRegions: OceanRegionData[] = [
  {
    name: "North Pacific Ocean",
    temperature: 14.2,
    chlorophyll: 0.8,
    salinity: 34.8,
    fishActivity: 78,
    coordinates: { x: 5, y: 25, width: 35, height: 25 }
  },
  {
    name: "North Atlantic Ocean",
    temperature: 12.8,
    chlorophyll: 1.2,
    salinity: 35.2,
    fishActivity: 85,
    coordinates: { x: 40, y: 25, width: 25, height: 25 }
  },
  {
    name: "Indian Ocean",
    temperature: 26.4,
    chlorophyll: 0.6,
    salinity: 34.7,
    fishActivity: 92,
    coordinates: { x: 65, y: 40, width: 25, height: 20 }
  },
  {
    name: "South Pacific Ocean",
    temperature: 16.8,
    chlorophyll: 0.4,
    salinity: 34.9,
    fishActivity: 65,
    coordinates: { x: 5, y: 60, width: 35, height: 25 }
  },
  {
    name: "South Atlantic Ocean", 
    temperature: 18.2,
    chlorophyll: 0.7,
    salinity: 35.1,
    fishActivity: 73,
    coordinates: { x: 40, y: 60, width: 25, height: 25 }
  },
  {
    name: "Arctic Ocean",
    temperature: -1.2,
    chlorophyll: 0.3,
    salinity: 32.4,
    fishActivity: 25,
    coordinates: { x: 20, y: 5, width: 60, height: 15 }
  },
  {
    name: "Southern Ocean",
    temperature: 2.4,
    chlorophyll: 1.8,
    salinity: 34.6,
    fishActivity: 45,
    coordinates: { x: 10, y: 85, width: 80, height: 10 }
  }
];

interface InteractiveMapProps {
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ className = "" }) => {
  const [selectedRegion, setSelectedRegion] = useState<OceanRegionData | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getActivityColor = (activity: number) => {
    if (activity >= 80) return "bg-red-500/80";
    if (activity >= 60) return "bg-orange-500/80";
    if (activity >= 40) return "bg-yellow-500/80";
    return "bg-green-500/80";
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-lg bg-ocean-deep/20 border border-border">
        <img 
          src={worldOceanMap} 
          alt="World Ocean Bathymetric Map"
          className="w-full h-auto max-h-[600px] object-contain"
        />
        
        {/* Clickable regions overlay */}
        {oceanRegions.map((region) => (
          <div
            key={region.name}
            className={`absolute cursor-pointer transition-all duration-200 ${
              hoveredRegion === region.name 
                ? "bg-primary/40 border-2 border-primary" 
                : "bg-transparent hover:bg-primary/20"
            } ${selectedRegion?.name === region.name ? "ring-2 ring-accent" : ""}`}
            style={{
              left: `${region.coordinates.x}%`,
              top: `${region.coordinates.y}%`,
              width: `${region.coordinates.width}%`,
              height: `${region.coordinates.height}%`,
            }}
            onMouseEnter={() => setHoveredRegion(region.name)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion(region)}
            title={region.name}
          >
            {/* Activity indicator */}
            <div 
              className={`absolute top-1 left-1 w-3 h-3 rounded-full ${getActivityColor(region.fishActivity)} 
                         animate-pulse border border-white/50`}
            />
          </div>
        ))}
        
        {/* Region name overlay on hover */}
        {hoveredRegion && (
          <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
            <p className="text-sm font-medium text-foreground">{hoveredRegion}</p>
            <p className="text-xs text-muted-foreground">Click to view detailed data</p>
          </div>
        )}
      </div>

      {/* Regional Data Panel */}
      {selectedRegion && (
        <Card className="mt-6 bg-card/95 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-semibold">{selectedRegion.name}</span>
              <Badge variant="outline" className={getActivityColor(selectedRegion.fishActivity).replace('/80', '/20')}>
                Activity: {selectedRegion.fishActivity}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                  <Thermometer className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-lg font-semibold">{selectedRegion.temperature}°C</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chlorophyll</p>
                  <p className="text-lg font-semibold">{selectedRegion.chlorophyll} mg/m³</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salinity</p>
                  <p className="text-lg font-semibold">{selectedRegion.salinity} PSU</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                  <Fish className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fish Activity</p>
                  <p className="text-lg font-semibold">{selectedRegion.fishActivity}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};