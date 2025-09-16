import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, TrendingUp, Fish, Thermometer, Waves, Clock, ChevronRight } from 'lucide-react';
import { UserRole } from './UserRoleSwitcher';

interface Alert {
  id: string;
  type: 'critical' | 'moderate' | 'advisory';
  category: 'climate' | 'biodiversity' | 'fisheries' | 'pollution';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  relevantRoles: UserRole[];
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    category: 'climate',
    title: 'Marine Heatwave Event',
    description: 'Sea surface temperatures in the North Pacific are 3.2°C above the 20-year average. Potential impacts on salmon migration patterns and plankton distribution.',
    location: 'North Pacific Ocean',
    timestamp: '2 hours ago',
    relevantRoles: ['fisheries', 'biodiversity', 'researcher']
  },
  {
    id: '2',
    type: 'moderate',
    category: 'biodiversity',
    title: 'Coral Bleaching Alert',
    description: 'eDNA analysis indicates 40% reduction in coral-associated species diversity in the Great Barrier Reef. Immediate monitoring recommended.',
    location: 'Coral Triangle',
    timestamp: '6 hours ago',
    relevantRoles: ['biodiversity', 'researcher']
  },
  {
    id: '3',
    type: 'advisory',
    category: 'fisheries',
    title: 'Unusual Fishing Activity Pattern',
    description: 'Vessel tracking data shows 200% increase in trawling activity near the Dogger Bank. Potential impact on cod spawning grounds.',
    location: 'North Atlantic Ocean',
    timestamp: '12 hours ago',
    relevantRoles: ['fisheries', 'researcher']
  },
  {
    id: '4',
    type: 'critical',
    category: 'biodiversity',
    title: 'Invasive Species Detection',
    description: 'eDNA samples confirm presence of Mnemiopsis leidyi (comb jelly) in Mediterranean waters. Rapid response protocol activated.',
    location: 'Mediterranean Sea',
    timestamp: '18 hours ago',
    relevantRoles: ['biodiversity', 'researcher']
  },
  {
    id: '5',
    type: 'moderate',
    category: 'pollution',
    title: 'Microplastic Concentration Spike',
    description: 'Satellite imagery and water sampling indicate 5x increase in microplastic density in subtropical gyre systems.',
    location: 'South Pacific Gyre',
    timestamp: '1 day ago',
    relevantRoles: ['biodiversity', 'researcher']
  },
  {
    id: '6',
    type: 'advisory',
    category: 'climate',
    title: 'Ocean Acidification Trend',
    description: 'pH levels in Arctic waters have decreased by 0.1 units over the past month. Monitoring shellfish populations recommended.',
    location: 'Arctic Ocean',
    timestamp: '2 days ago',
    relevantRoles: ['fisheries', 'biodiversity', 'researcher']
  }
];

interface AlertsPanelProps {
  currentRole: UserRole;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'climate': return Thermometer;
    case 'biodiversity': return Fish;
    case 'fisheries': return Waves;
    case 'pollution': return AlertTriangle;
    default: return AlertTriangle;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'climate': return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'biodiversity': return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'fisheries': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'pollution': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'moderate': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'advisory': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ currentRole }) => {
  // Filter alerts based on current role
  const relevantAlerts = alerts.filter(alert => 
    alert.relevantRoles.includes(currentRole)
  );

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Real-time Alerts & Advisories</span>
          </div>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            {relevantAlerts.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {relevantAlerts.map((alert) => {
              const CategoryIcon = getCategoryIcon(alert.category);
              
              return (
                <div
                  key={alert.id}
                  className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getTypeColor(alert.type)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(alert.category)}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {alert.category}
                      </Badge>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {alert.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Waves className="h-3 w-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing alerts relevant to {currentRole} role
            </span>
            <button className="text-primary hover:text-primary/80 transition-colors">
              View All Alerts →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};