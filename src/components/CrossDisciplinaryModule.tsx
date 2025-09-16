import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChartScatter, Zap, TrendingUp, Database } from 'lucide-react';

interface DatasetOption {
  id: string;
  name: string;
  type: 'otolith' | 'edna' | 'environmental' | 'fisheries';
  region: string;
  description: string;
}

const availableDatasets: DatasetOption[] = [
  {
    id: 'otolith_cod_north_atlantic',
    name: 'Atlantic Cod Growth Rates (North Atlantic)',
    type: 'otolith',
    region: 'North Atlantic',
    description: 'Age and growth analysis from otolith microstructure'
  },
  {
    id: 'edna_zooplankton_north_atlantic',
    name: 'Zooplankton Biodiversity (North Atlantic)',
    type: 'edna',
    region: 'North Atlantic',
    description: 'eDNA-derived zooplankton species diversity'
  },
  {
    id: 'sst_north_pacific',
    name: 'Sea Surface Temperature (North Pacific)',
    type: 'environmental',
    region: 'North Pacific',
    description: 'Satellite-derived temperature anomalies'
  },
  {
    id: 'tuna_catch_indian_ocean',
    name: 'Skipjack Tuna Catch Data (Indian Ocean)',
    type: 'fisheries',
    region: 'Indian Ocean',
    description: 'Commercial catch records with effort data'
  },
  {
    id: 'edna_coral_indo_pacific',
    name: 'Coral Reef Biodiversity (Indo-Pacific)',
    type: 'edna',
    region: 'Indo-Pacific',
    description: 'Environmental DNA from coral reef ecosystems'
  },
  {
    id: 'otolith_salmon_north_pacific',
    name: 'Pacific Salmon Migration Patterns',
    type: 'otolith',
    region: 'North Pacific',
    description: 'Otolith chemistry reveals migration pathways'
  }
];

export const CrossDisciplinaryModule: React.FC = () => {
  const [primaryDataset, setPrimaryDataset] = useState<string>('');
  const [correlatingDataset, setCorrelatingDataset] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const getDatasetTypeColor = (type: string) => {
    switch (type) {
      case 'otolith': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'edna': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'environmental': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'fisheries': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const generateInsight = async () => {
    if (!primaryDataset || !correlatingDataset) return;
    
    setIsGenerating(true);
    
    // Simulate analysis
    setTimeout(() => {
      const primary = availableDatasets.find(d => d.id === primaryDataset);
      const correlating = availableDatasets.find(d => d.id === correlatingDataset);
      
      setResults({
        correlation: 0.73,
        significance: 0.001,
        primaryDataset: primary,
        correlatingDataset: correlating,
        insight: `Strong positive correlation detected between ${primary?.name} and ${correlating?.name}. This suggests that ${primary?.type === 'otolith' ? 'fish growth rates' : 'biodiversity levels'} are significantly influenced by ${correlating?.type === 'environmental' ? 'environmental factors' : 'ecosystem health'}.`,
        recommendation: 'Further investigation recommended in overlapping regions. Consider expanding sampling efforts in areas where both datasets show high variability.'
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ChartScatter className="h-5 w-5 text-accent" />
          <span>Cross-Disciplinary Correlation Analysis</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Discover relationships between eDNA biodiversity data and otolith-derived fish life history traits
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Primary Dataset</label>
            <Select value={primaryDataset} onValueChange={setPrimaryDataset}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select primary dataset..." />
              </SelectTrigger>
              <SelectContent>
                {availableDatasets.map((dataset) => (
                  <SelectItem key={dataset.id} value={dataset.id}>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getDatasetTypeColor(dataset.type)}>
                        {dataset.type}
                      </Badge>
                      <span className="truncate">{dataset.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Correlating Dataset</label>
            <Select value={correlatingDataset} onValueChange={setCorrelatingDataset}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select correlating dataset..." />
              </SelectTrigger>
              <SelectContent>
                {availableDatasets
                  .filter(d => d.id !== primaryDataset)
                  .map((dataset) => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getDatasetTypeColor(dataset.type)}>
                          {dataset.type}
                        </Badge>
                        <span className="truncate">{dataset.name}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generateInsight}
          disabled={!primaryDataset || !correlatingDataset || isGenerating}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
        >
          {isGenerating ? (
            <>
              <Zap className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Data Relationships...
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Cross-Disciplinary Insight
            </>
          )}
        </Button>

        {results && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Analysis Results</h4>
              <Badge variant="outline" className="bg-success/10 text-green-400 border-green-500/20">
                r = {results.correlation}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Correlation Strength</p>
                <p className="font-semibold text-lg">{(results.correlation * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statistical Significance</p>
                <p className="font-semibold text-lg">p &lt; {results.significance}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-foreground mb-1">Key Insight</h5>
                <p className="text-sm text-muted-foreground">{results.insight}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-foreground mb-1">Recommendation</h5>
                <p className="text-sm text-muted-foreground">{results.recommendation}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Database className="h-3 w-3" />
              <span>Geographic overlap analysis available on main map</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};