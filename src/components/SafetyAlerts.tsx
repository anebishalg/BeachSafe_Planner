import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { BeachData } from '../data/beachData';

interface SafetyAlertsProps {
  beach: BeachData;
}

export function SafetyAlerts({ beach }: SafetyAlertsProps) {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Safety Alerts</h2>
      
      <div className="space-y-3">
        {beach.alerts.map((alert, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.severity)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{alert.title}</h4>
                <p className="text-sm opacity-90">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
        
        {beach.alerts.length === 0 && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Info className="h-5 w-5" />
              <span>No current safety alerts. Conditions are normal.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}