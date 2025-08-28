import React from 'react';
import { RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react';

interface DataStatusProps {
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export function DataStatus({ loading, error, lastUpdated, onRefresh }: DataStatusProps) {
  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {error ? (
            <WifiOff className="h-5 w-5 text-red-500" />
          ) : (
            <Wifi className="h-5 w-5 text-green-500" />
          )}
          
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">
                {error ? 'Connection Issues' : 'Live Data'}
              </span>
              {loading && (
                <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
              )}
            </div>
            
            {lastUpdated && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-3 w-3" />
                <span>Updated {formatLastUpdated(lastUpdated)}</span>
              </div>
            )}
            
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>
        </div>
        
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}