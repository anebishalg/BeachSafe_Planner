import { useState, useEffect } from 'react';
import { BeachData } from '../data/beachData';
import { WeatherService, SurfService, CrowdService } from '../services/weatherService';
import { AlertService } from '../services/alertService';

// Beach coordinates for API calls
const BEACH_COORDINATES: Record<string, { lat: number; lon: number }> = {
  bondi: { lat: -33.8908, lon: 151.2743 },
  manly: { lat: -33.7969, lon: 151.2840 },
  coogee: { lat: -33.9173, lon: 151.2590 },
  cronulla: { lat: -34.0583, lon: 151.1531 }
};

// Static facilities data (this doesn't change frequently)
const BEACH_FACILITIES: Record<string, string[]> = {
  bondi: ['Toilets', 'Showers', 'Cafes', 'Parking', 'First Aid', 'Equipment Rental'],
  manly: ['Toilets', 'Showers', 'Restaurants', 'Shops', 'Parking', 'Surf School'],
  coogee: ['Toilets', 'Showers', 'Cafes', 'Playground', 'BBQ Areas', 'Ocean Pool'],
  cronulla: ['Toilets', 'Showers', 'Cafes', 'Parking', 'Bike Path', 'Fishing Areas']
};

const BEACH_NAMES: Record<string, string> = {
  bondi: 'Bondi Beach',
  manly: 'Manly Beach',
  coogee: 'Coogee Beach',
  cronulla: 'Cronulla Beach'
};

export function useRealTimeData() {
  const [beachData, setBeachData] = useState<Record<string, BeachData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBeachData = async () => {
    try {
      setError(null);
      const currentTime = new Date();
      const newBeachData: Record<string, BeachData> = {};

      // Fetch data for all beaches
      for (const [beachId, coordinates] of Object.entries(BEACH_COORDINATES)) {
        try {
          // Fetch weather and surf data
          const [weatherData, surfData] = await Promise.all([
            WeatherService.getWeatherData(coordinates.lat, coordinates.lon),
            SurfService.getSurfData(coordinates.lat, coordinates.lon)
          ]);

          // Estimate crowd level
          const crowdLevel = CrowdService.estimateCrowdLevel(
            BEACH_NAMES[beachId], 
            weatherData, 
            currentTime
          );

          // Generate alerts
          const alerts = AlertService.generateAlerts(
            BEACH_NAMES[beachId],
            weatherData,
            crowdLevel,
            currentTime
          );

          // Determine patrol status based on time
          const hour = currentTime.getHours();
          const patrolStatus = (hour >= 9 && hour <= 17) ? 'Active' : 'Inactive';
          const patrolHours = beachId === 'coogee' ? '10:00 AM - 4:00 PM' : '9:00 AM - 5:00 PM';

          newBeachData[beachId] = {
            name: BEACH_NAMES[beachId],
            crowdLevel,
            waveHeight: surfData.waveHeight,
            surfConditions: surfData.surfConditions,
            temperature: weatherData.temperature,
            waterTemp: surfData.waterTemp,
            windSpeed: weatherData.windSpeed,
            uvIndex: weatherData.uvIndex,
            patrolStatus,
            patrolHours,
            facilities: BEACH_FACILITIES[beachId],
            alerts
          };
        } catch (beachError) {
          console.error(`Error fetching data for ${beachId}:`, beachError);
          // Use fallback data for this beach
          newBeachData[beachId] = createFallbackData(beachId);
        }
      }

      setBeachData(newBeachData);
      setLastUpdated(currentTime);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching beach data:', err);
      setError('Failed to fetch real-time data. Using cached information.');
      setLoading(false);
    }
  };

  const createFallbackData = (beachId: string): BeachData => ({
    name: BEACH_NAMES[beachId],
    crowdLevel: 'Medium',
    waveHeight: '1.0-1.5m',
    surfConditions: 'Good',
    temperature: 22,
    waterTemp: 20,
    windSpeed: 15,
    uvIndex: 7,
    patrolStatus: 'Active',
    patrolHours: '9:00 AM - 5:00 PM',
    facilities: BEACH_FACILITIES[beachId],
    alerts: [{
      title: 'Data Unavailable',
      message: 'Real-time data is currently unavailable. Information may not be current.',
      severity: 'medium'
    }]
  });

  useEffect(() => {
    // Initial fetch
    fetchBeachData();

    // Set up periodic updates every 10 minutes
    const interval = setInterval(fetchBeachData, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    beachData,
    loading,
    error,
    lastUpdated,
    refetch: fetchBeachData
  };
}