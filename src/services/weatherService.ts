interface WeatherData {
  temperature: number;
  windSpeed: number;
  uvIndex: number;
  description: string;
}

interface SurfData {
  waveHeight: string;
  surfConditions: string;
  waterTemp: number;
}

// OpenWeatherMap API service
export class WeatherService {
  private static readonly API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key';
  private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  static async getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        console.warn(`OpenWeatherMap API request failed with status ${response.status}. Using fallback data.`);
        return this.getFallbackWeatherData();
      }
      
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        uvIndex: await this.getUVIndex(lat, lon),
        description: data.weather[0].description
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getFallbackWeatherData();
    }
  }

  private static getFallbackWeatherData(): WeatherData {
    return {
      temperature: 22,
      windSpeed: 15,
      uvIndex: 7,
      description: 'partly cloudy'
    };
  }

  private static async getUVIndex(lat: number, lon: number): Promise<number> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`UV API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return Math.round(data.value);
    } catch (error) {
      console.error('Error fetching UV data:', error);
      return 7; // Fallback UV index
    }
  }
}

// Surf conditions service (using Stormglass API as example)
export class SurfService {
  private static readonly API_KEY = import.meta.env.VITE_STORMGLASS_API_KEY || 'demo_key';
  private static readonly BASE_URL = 'https://api.stormglass.io/v2';

  static async getSurfData(lat: number, lon: number): Promise<SurfData> {
    try {
      const params = 'waveHeight,waterTemperature,swellHeight';
      const response = await fetch(
        `${this.BASE_URL}/weather/point?lat=${lat}&lng=${lon}&params=${params}`,
        {
          headers: {
            'Authorization': this.API_KEY
          }
        }
      );

      if (!response.ok) {
        console.warn(`Stormglass API request failed with status ${response.status}. Using fallback data.`);
        return this.getFallbackSurfData();
      }

      const data = await response.json();
      const current = data.hours[0];
      
      const waveHeight = current.waveHeight?.noaa || current.waveHeight?.sg || 1.0;
      const waterTemp = current.waterTemperature?.noaa || current.waterTemperature?.sg || 20;
      
      return {
        waveHeight: this.formatWaveHeight(waveHeight),
        surfConditions: this.getSurfConditions(waveHeight),
        waterTemp: Math.round(waterTemp)
      };
    } catch (error) {
      console.warn('Error fetching surf data:', error);
      return this.getFallbackSurfData();
    }
  }

  private static getFallbackSurfData(): SurfData {
    return {
      waveHeight: '1.0-1.5m',
      surfConditions: 'Good',
      waterTemp: 20
    };
  }

  private static formatWaveHeight(height: number): string {
    const min = Math.max(0.5, height - 0.3);
    const max = height + 0.3;
    return `${min.toFixed(1)}-${max.toFixed(1)}m`;
  }

  private static getSurfConditions(waveHeight: number): string {
    if (waveHeight < 0.5) return 'Poor';
    if (waveHeight < 1.0) return 'Fair';
    if (waveHeight < 2.0) return 'Good';
    return 'Excellent';
  }
}

// Crowd estimation service (simulated based on time and weather)
export class CrowdService {
  static estimateCrowdLevel(beachName: string, weather: WeatherData, currentTime: Date): 'Low' | 'Medium' | 'High' {
    const hour = currentTime.getHours();
    const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;
    const isGoodWeather = weather.temperature > 20 && weather.windSpeed < 20;
    
    let crowdScore = 0;
    
    // Time-based scoring
    if (hour >= 10 && hour <= 16) crowdScore += 2; // Peak hours
    else if (hour >= 8 && hour <= 18) crowdScore += 1; // Good hours
    
    // Weekend bonus
    if (isWeekend) crowdScore += 1;
    
    // Weather bonus
    if (isGoodWeather) crowdScore += 1;
    
    // Beach-specific adjustments
    if (beachName === 'Bondi Beach') crowdScore += 1; // Always busier
    if (beachName === 'Coogee Beach') crowdScore -= 1; // Generally quieter
    
    if (crowdScore >= 4) return 'High';
    if (crowdScore >= 2) return 'Medium';
    return 'Low';
  }
}