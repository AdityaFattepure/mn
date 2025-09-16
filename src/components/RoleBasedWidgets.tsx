import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Fish, TreePine, AlertTriangle, Ship, Zap, Microscope } from 'lucide-react';
import { UserRole } from './UserRoleSwitcher';

interface RoleBasedWidgetsProps {
  role: UserRole;
}

// Sample data for different visualizations
const ecosystemHealthData = [
  { month: 'Jan', health: 7.2, temp: 26.4 },
  { month: 'Feb', health: 7.4, temp: 26.8 },
  { month: 'Mar', health: 6.8, temp: 27.2 },
  { month: 'Apr', health: 6.9, temp: 27.6 },
  { month: 'May', health: 7.1, temp: 28.1 },
  { month: 'Jun', health: 6.5, temp: 28.8 },
  { month: 'Jul', health: 6.3, temp: 29.2 },
  { month: 'Aug', health: 6.4, temp: 29.4 },
  { month: 'Sep', health: 6.7, temp: 28.9 },
  { month: 'Oct', health: 7.0, temp: 28.2 },
  { month: 'Nov', health: 7.3, temp: 27.4 },
  { month: 'Dec', health: 7.2, temp: 26.9 }
];

const globalCatchData = [
  { species: 'Anchoveta', volume: 7000 },
  { species: 'Alaska Pollock', volume: 3500 },
  { species: 'Skipjack Tuna', volume: 3100 },
  { species: 'Atlantic Herring', volume: 2000 },
  { species: 'Blue Whiting', volume: 1800 }
];

const biodiversityData = [
  { ecosystem: 'Coral Triangle', percentage: 40, color: '#FF6B6B' },
  { ecosystem: 'Amazon Reef', percentage: 15, color: '#4ECDC4' },
  { ecosystem: 'Mesoamerican Reef', percentage: 15, color: '#45B7D1' },
  { ecosystem: 'Tropical E. Pacific', percentage: 10, color: '#96CEB4' },
  { ecosystem: 'Mediterranean Sea', percentage: 10, color: '#FECA57' },
  { ecosystem: 'Other', percentage: 10, color: '#A8E6CF' }
];

const fishingEffortData = [
  { effort: 120, catch: 85, region: 'North Atlantic' },
  { effort: 200, catch: 140, region: 'Pacific' },
  { effort: 180, catch: 95, region: 'Indian Ocean' },
  { effort: 150, catch: 110, region: 'Mediterranean' },
  { effort: 300, catch: 180, region: 'Southern Ocean' },
  { effort: 250, catch: 160, region: 'Arctic' }
];

const FisheriesWidgets: React.FC = () => (
  <>
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Ship className="h-5 w-5 text-blue-400" />
          <span>Global Fishing Fleet Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">4,120</p>
            <p className="text-sm text-muted-foreground">Fleet Carbon (kt CO₂e)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">285.5k</p>
            <p className="text-sm text-muted-foreground">Forecasted Catch (tons)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">847</p>
            <p className="text-sm text-muted-foreground">Active Vessels</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Global Top 5 Species by Catch Volume (2024)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={globalCatchData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="species" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="volume" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Fishing Effort vs. Catch Efficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={fishingEffortData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="effort" name="Effort (thousands of hours)" stroke="hsl(var(--muted-foreground))" />
            <YAxis dataKey="catch" name="Catch (thousands of tons)" stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card p-3 border border-border rounded-lg shadow-lg">
                      <p className="font-semibold">{data.region}</p>
                      <p className="text-sm">Effort: {data.effort}k hours</p>
                      <p className="text-sm">Catch: {data.catch}k tons</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter dataKey="catch" fill="hsl(var(--accent))" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </>
);

const BiodiversityWidgets: React.FC = () => (
  <>
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <TreePine className="h-5 w-5 text-green-400" />
          <span>Global Conservation Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">8.2%</p>
            <p className="text-sm text-muted-foreground">Ocean Under Protection</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">23</p>
            <p className="text-sm text-muted-foreground">Active Biodiversity Alerts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">1,247</p>
            <p className="text-sm text-muted-foreground">eDNA Samples (This Month)</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>eDNA Species Diversity by Marine Ecosystem</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={biodiversityData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="percentage"
            >
              {biodiversityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card p-3 border border-border rounded-lg shadow-lg">
                      <p className="font-semibold">{data.ecosystem}</p>
                      <p className="text-sm">{data.percentage}% of global diversity</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Global Ecosystem Health Index (2024)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ecosystemHealthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[6, 8]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="health" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </>
);

const ResearcherWidgets: React.FC = () => (
  <>
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Microscope className="h-5 w-5 text-purple-400" />
          <span>Research Analytics Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">47</p>
            <p className="text-sm text-muted-foreground">Active Datasets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">156</p>
            <p className="text-sm text-muted-foreground">Correlation Analyses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">89%</p>
            <p className="text-sm text-muted-foreground">Data Coverage</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">12</p>
            <p className="text-sm text-muted-foreground">New Insights</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Multi-Parameter Ecosystem Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ecosystemHealthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" domain={[6, 8]} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" domain={[25, 30]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="health" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Ecosystem Health Index"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="temp" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="Sea Surface Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Data Integration Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Otolith</Badge>
              <span className="text-sm">Fish Life History Data</span>
            </div>
            <span className="text-sm font-semibold">8,429 samples</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">eDNA</Badge>
              <span className="text-sm">Environmental DNA Analysis</span>
            </div>
            <span className="text-sm font-semibold">12,847 sequences</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Satellite</Badge>
              <span className="text-sm">Environmental Parameters</span>
            </div>
            <span className="text-sm font-semibold">2.4M data points</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);

export const RoleBasedWidgets: React.FC<RoleBasedWidgetsProps> = ({ role }) => {
  switch (role) {
    case 'fisheries':
      return <FisheriesWidgets />;
    case 'biodiversity':
      return <BiodiversityWidgets />;
    case 'researcher':
      return <ResearcherWidgets />;
    default:
      return null;
  }
};