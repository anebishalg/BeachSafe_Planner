import React from 'react';
import { Sun, Clock, CheckCircle } from 'lucide-react';

interface SunscreenReminderProps {
  uvIndex: number;
  lastApplication: Date | null;
  onSunscreenApplied: () => void;
}

export function SunscreenReminder({ uvIndex, lastApplication, onSunscreenApplied }: SunscreenReminderProps) {
  const getUVRisk = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-50' };
    return { level: 'Extreme', color: 'text-purple-600', bg: 'bg-purple-50' };
  };

  const getSunscreenRecommendation = (uv: number) => {
    if (uv <= 2) return 'SPF 15+ recommended';
    if (uv <= 5) return 'SPF 30+ recommended';
    if (uv <= 7) return 'SPF 30-50+ recommended';
    return 'SPF 50+ strongly recommended';
  };

  const getReapplicationTime = (uv: number) => {
    if (uv <= 5) return 120; // 2 hours
    if (uv <= 7) return 90;  // 1.5 hours
    return 60; // 1 hour for very high/extreme
  };

  const needsReapplication = () => {
    if (!lastApplication) return true;
    const now = new Date();
    const timeDiff = now.getTime() - lastApplication.getTime();
    const minutesSinceApplication = timeDiff / (1000 * 60);
    return minutesSinceApplication >= getReapplicationTime(uvIndex);
  };

  const getTimeSinceApplication = () => {
    if (!lastApplication) return null;
    const now = new Date();
    const timeDiff = now.getTime() - lastApplication.getTime();
    const minutesSinceApplication = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesSinceApplication < 60) {
      return `${minutesSinceApplication} minutes ago`;
    } else {
      const hours = Math.floor(minutesSinceApplication / 60);
      const minutes = minutesSinceApplication % 60;
      return `${hours}h ${minutes}m ago`;
    }
  };

  const uvRisk = getUVRisk(uvIndex);
  const needsApplication = needsReapplication();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Sun className="h-5 w-5 mr-2 text-yellow-500" />
          Sun Protection
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${uvRisk.color} ${uvRisk.bg}`}>
          UV {uvIndex}/10 - {uvRisk.level}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Sunscreen Recommendation</h4>
            <p className="text-gray-600">{getSunscreenRecommendation(uvIndex)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Reapply every {getReapplicationTime(uvIndex)} minutes
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Last Application</h4>
            {lastApplication ? (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">
                  {getTimeSinceApplication()}
                </span>
                {!needsApplication && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No application recorded</span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {needsApplication ? (
            <div className={`p-4 rounded-lg ${uvIndex >= 8 ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'}`}>
              <div className="text-center">
                <Sun className={`h-8 w-8 mx-auto mb-2 ${uvIndex >= 8 ? 'text-red-600' : 'text-orange-600'}`} />
                <p className={`font-semibold mb-3 ${uvIndex >= 8 ? 'text-red-800' : 'text-orange-800'}`}>
                  {uvIndex >= 8 ? 'URGENT: Apply Sunscreen Now!' : 'Time to Apply Sunscreen'}
                </p>
                <button
                  onClick={onSunscreenApplied}
                  className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                    uvIndex >= 8 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  I've Applied Sunscreen
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">You're Protected!</p>
              <p className="text-green-600 text-sm">
                Next application due in {getReapplicationTime(uvIndex) - Math.floor((new Date().getTime() - lastApplication!.getTime()) / (1000 * 60))} minutes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}