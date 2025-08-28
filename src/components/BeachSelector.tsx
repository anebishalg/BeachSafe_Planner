import React from 'react';
import { MapPin } from 'lucide-react';
import { BeachData } from '../data/beachData';

interface BeachSelectorProps {
  selectedBeach: string;
  onSelectBeach: (beachId: string) => void;
  beachData: Record<string, BeachData>;
}

export function BeachSelector({ selectedBeach, onSelectBeach, beachData }: BeachSelectorProps) {
  // Show loading state if no data available
  if (Object.keys(beachData).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Select Beach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-lg border-2 border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
        Select Beach
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(beachData).map(([beachId, beach]) => (
          <button
            key={beachId}
            onClick={() => onSelectBeach(beachId)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedBeach === beachId
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold text-gray-800">{beach.name}</div>
            <div className="text-sm text-gray-600 mt-1">
              Crowd: <span className={`font-medium ${
                beach.crowdLevel === 'Low' ? 'text-green-600' :
                beach.crowdLevel === 'Medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {beach.crowdLevel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}