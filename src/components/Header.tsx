import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, User, MessageCircle, Anchor, Waves } from 'lucide-react';
import { UserRole, UserRoleSwitcher } from './UserRoleSwitcher';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding - Left */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  MarineIQ
                </h1>
                <span className="text-xs text-muted-foreground">Ocean Intelligence Platform</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                v2.4.1
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                Live
              </Badge>
            </div>
          </div>

          {/* Role Switcher - Center */}
          <div className="flex-1 flex justify-center max-w-2xl mx-8">
            <UserRoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
          </div>

          {/* User Controls - Right */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search data..."
                className="pl-10 w-64 bg-muted/50 border-border/50 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-critical">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};