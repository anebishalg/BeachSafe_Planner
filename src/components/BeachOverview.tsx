import React from 'react';
import { Thermometer, Wind, Waves, Users, Flag, Clock } from 'lucide-react';
import { BeachData } from '../data/beachData';

interface BeachOverviewProps {
  beach: BeachData;
}

export function BeachOverview({ beach }: BeachOverviewProps) {
  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSurfColor = (conditions: string) => {
    switch (conditions) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{beach.name}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCrowdColor(beach.crowdLevel)}`}>
          <Users className="h-4 w-4 inline mr-1" />
          {beach.crowdLevel} Crowd
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Surf Conditions */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Waves className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Surf Conditions</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Wave Height:</span>
              <span className="font-medium">{beach.waveHeight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conditions:</span>
              <span className={`font-medium ${getSurfColor(beach.surfConditions)}`}>
                {beach.surfConditions}
              </span>
            </div>
          </div>
        </div>

        {/* Weather */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Thermometer className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Weather</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">{beach.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wind:</span>
              <span className="font-medium">{beach.windSpeed} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">UV Index:</span>
              <span className={`font-medium ${beach.uvIndex >= 8 ? 'text-red-600' : beach.uvIndex >= 6 ? 'text-orange-600' : 'text-green-600'}`}>
                {beach.uvIndex}/10
              </span>
            </div>
          </div>
        </div>

        {/* Safety Info */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Flag className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Safety Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Patrol Status:</span>
              <span className={`font-medium ${beach.patrolStatus === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {beach.patrolStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patrol Hours:</span>
              <span className="font-medium text-sm">{beach.patrolHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Water Temp:</span>
              <span className="font-medium">{beach.waterTemp}°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Available Facilities</h4>
        <div className="flex flex-wrap gap-2">
          {beach.facilities.map((facility, index) => (
            <span key={index} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">
              {facility}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}