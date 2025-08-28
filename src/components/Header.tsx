import React from 'react';
import { Waves, Shield } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
}

export function Header({ currentTime }: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-AU', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Australia/Sydney'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'Australia/Sydney'
    });
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Waves className="h-8 w-8" />
              <Shield className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">BeachSafe Planner</h1>
              <p className="text-blue-100 text-sm">Sydney Beach Safety Guide</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-semibold">{formatTime(currentTime)}</div>
            <div className="text-blue-100 text-sm">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
    </header>
  );
}