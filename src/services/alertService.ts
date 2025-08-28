import { Alert } from '../data/beachData';

interface WeatherConditions {
  temperature: number;
  windSpeed: number;
  uvIndex: number;
  description: string;
}

export class AlertService {
  static generateAlerts(
    beachName: string, 
    weather: WeatherConditions, 
    crowdLevel: string,
    currentTime: Date
  ): Alert[] {
    const alerts: Alert[] = [];

    // UV Index alerts
    if (weather.uvIndex >= 8) {
      alerts.push({
        title: weather.uvIndex >= 10 ? 'EXTREME UV Warning' : 'High UV Warning',
        message: `UV index is ${weather.uvIndex >= 10 ? 'extreme' : 'very high'} (${weather.uvIndex}/10). Apply SPF 50+ sunscreen regularly and seek shade during peak hours (10 AM - 3 PM).`,
        severity: 'high'
      });
    } else if (weather.uvIndex >= 6) {
      alerts.push({
        title: 'Moderate UV Alert',
        message: `UV index is high (${weather.uvIndex}/10). Use SPF 30+ sunscreen and consider protective clothing.`,
        severity: 'medium'
      });
    }

    // Wind alerts
    if (weather.windSpeed >= 25) {
      alerts.push({
        title: 'Strong Wind Warning',
        message: `Strong winds (${weather.windSpeed} km/h). Be cautious with inflatables, umbrellas, and light beach equipment. Swimming conditions may be affected.`,
        severity: 'high'
      });
    } else if (weather.windSpeed >= 20) {
      alerts.push({
        title: 'Windy Conditions',
        message: `Moderate to strong winds (${weather.windSpeed} km/h). Be cautious with inflatables and light beach equipment.`,
        severity: 'medium'
      });
    }

    // Temperature alerts
    if (weather.temperature >= 35) {
      alerts.push({
        title: 'Extreme Heat Warning',
        message: `Very high temperature (${weather.temperature}°C). Stay hydrated, seek shade regularly, and limit sun exposure.`,
        severity: 'high'
      });
    }

    // Crowd alerts
    if (crowdLevel === 'High') {
      alerts.push({
        title: 'Crowded Conditions',
        message: 'Beach is experiencing high visitor numbers. Allow extra time for parking and be patient with lifeguards.',
        severity: 'medium'
      });
    }

    // Time-based alerts
    const hour = currentTime.getHours();
    if (hour >= 10 && hour <= 15 && weather.uvIndex >= 7) {
      alerts.push({
        title: 'Peak UV Hours',
        message: 'Currently in peak UV hours (10 AM - 3 PM). Consider seeking shade or indoor activities.',
        severity: 'medium'
      });
    }

    // Simulated marine life alerts (in real app, this would come from marine biology APIs)
    if (this.shouldShowMarineAlert(beachName, currentTime)) {
      alerts.push({
        title: 'Marine Life Activity',
        message: 'Minor bluebottle (jellyfish) activity reported in the area. Lifeguards are monitoring the situation.',
        severity: 'medium'
      });
    }

    // Good conditions alert
    if (alerts.length === 0 && weather.temperature > 18 && weather.windSpeed < 15) {
      alerts.push({
        title: 'Perfect Beach Conditions',
        message: 'Excellent conditions for swimming and beach activities. Enjoy your visit!',
        severity: 'low'
      });
    }

    return alerts;
  }

  private static shouldShowMarineAlert(beachName: string, currentTime: Date): boolean {
    // Simulate marine life alerts based on beach and season
    const month = currentTime.getMonth();
    const isWarmerMonths = month >= 10 || month <= 3; // Nov-Mar in Southern Hemisphere
    
    // Higher chance during warmer months
    if (isWarmerMonths && beachName === 'Coogee Beach') {
      return Math.random() < 0.3; // 30% chance
    }
    
    return Math.random() < 0.1; // 10% chance otherwise
  }
}