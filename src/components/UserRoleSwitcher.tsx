import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ship, TreePine, Microscope } from 'lucide-react';

export type UserRole = 'fisheries' | 'biodiversity' | 'researcher';

interface UserRoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleConfig = {
  fisheries: {
    name: 'Fisheries Management',
    icon: Ship,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Monitor fishing activities, stock health, and sustainability metrics'
  },
  biodiversity: {
    name: 'Biodiversity Conservation',
    icon: TreePine,
    color: 'bg-green-500/10 text-green-400 border-green-500/20',
    description: 'Track marine biodiversity, protected areas, and conservation efforts'
  },
  researcher: {
    name: 'Scientific Research',
    icon: Microscope,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Deep data exploration and cross-disciplinary analysis tools'
  }
};

export const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({ 
  currentRole, 
  onRoleChange 
}) => {
  return (
    <div className="flex items-center space-x-2 p-1 bg-muted/50 rounded-lg backdrop-blur-sm border border-border">
      {Object.entries(roleConfig).map(([role, config]) => {
        const Icon = config.icon;
        const isActive = currentRole === role;
        
        return (
          <Button
            key={role}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onRoleChange(role as UserRole)}
            className={`flex items-center space-x-2 px-3 py-2 transition-all duration-200 ${
              isActive 
                ? 'bg-primary/20 text-primary border border-primary/30' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{config.name}</span>
            {isActive && (
              <Badge variant="outline" className="ml-1 px-1.5 py-0.5 text-xs">
                Active
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
};