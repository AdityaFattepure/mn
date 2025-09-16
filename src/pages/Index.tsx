import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { InteractiveMap } from '@/components/InteractiveMap';
import { RoleBasedWidgets } from '@/components/RoleBasedWidgets';
import { AlertsPanel } from '@/components/AlertsPanel';
import { CrossDisciplinaryModule } from '@/components/CrossDisciplinaryModule';
import { UserRole } from '@/components/UserRoleSwitcher';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('fisheries');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Interactive Map Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Global Ocean Intelligence Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Click on any ocean region below to explore real-time data on temperature, chlorophyll levels, 
              salinity, and fishing activity. Unified data from CMLRE, OBIS, Copernicus, and global research networks.
            </p>
          </div>
          
          <InteractiveMap className="w-full" />
        </section>

        {/* Role-Based Dashboard Content */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analytics - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RoleBasedWidgets role={currentRole} />
            </div>
            
            {/* Cross-Disciplinary Module (Only for Researchers) */}
            {currentRole === 'researcher' && (
              <div className="mt-8">
                <CrossDisciplinaryModule />
              </div>
            )}
          </div>

          {/* Alerts Panel - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <AlertsPanel currentRole={currentRole} />
          </div>
        </section>

        {/* Role-Specific Information */}
        <section className="mt-12 p-6 bg-card/30 rounded-lg border border-border/50">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">
              {currentRole === 'fisheries' && 'Fisheries Management Dashboard'}
              {currentRole === 'biodiversity' && 'Biodiversity Conservation Center'}
              {currentRole === 'researcher' && 'Scientific Research Workbench'}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {currentRole === 'fisheries' && 'Monitor global fishing activities, assess stock health, and ensure sustainable practices with real-time vessel tracking and catch forecasting.'}
              {currentRole === 'biodiversity' && 'Track marine biodiversity through eDNA analysis, monitor protected areas, and respond to conservation alerts across global ocean ecosystems.'}
              {currentRole === 'researcher' && 'Access comprehensive datasets, perform cross-disciplinary correlation analysis, and explore the revolutionary eDNA + Otolith data pipeline for advanced marine research.'}
            </p>
          </div>
        </section>
      </main>

      {/* Floating AI Chat Button */}
      <Button
        size="lg"
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* AI Chat Panel (Placeholder) */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-card border border-border rounded-lg shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">AI Ocean Assistant</h4>
            <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>×</Button>
          </div>
          <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground text-sm text-center">
              AI Chat Assistant<br />
              <span className="text-xs">Ask questions about ocean data, correlations, and insights</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;