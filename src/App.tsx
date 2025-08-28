import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DataStatus } from './components/DataStatus';
import { BeachSelector } from './components/BeachSelector';
import { BeachOverview } from './components/BeachOverview';
import { SafetyAlerts } from './components/SafetyAlerts';
import { SunscreenReminder } from './components/SunscreenReminder';
import { SafetyTips } from './components/SafetyTips';
import { BeachData } from './data/beachData';
import { useRealTimeData } from './hooks/useRealTimeData';

function App() {
  const [selectedBeach, setSelectedBeach] = useState<string>('bondi');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastSunscreenTime, setLastSunscreenTime] = useState<Date | null>(null);
  
  // Use real-time data hook
  const { beachData, loading, error, lastUpdated, refetch } = useRealTimeData();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const currentBeach: BeachData | undefined = beachData[selectedBeach];

  const handleSunscreenApplied = () => {
    setLastSunscreenTime(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header currentTime={currentTime} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <DataStatus 
          loading={loading}
          error={error}
          lastUpdated={lastUpdated}
          onRefresh={refetch}
        />
        
        <BeachSelector 
          selectedBeach={selectedBeach} 
          onSelectBeach={setSelectedBeach}
          beachData={beachData}
        />
        
        {currentBeach ? (
          <>
            <BeachOverview beach={currentBeach} />
            
            <SafetyAlerts beach={currentBeach} />
            
            <SunscreenReminder 
              uvIndex={currentBeach.uvIndex}
              lastApplication={lastSunscreenTime}
              onSunscreenApplied={handleSunscreenApplied}
            />
            
            <SafetyTips />
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading beach data...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;