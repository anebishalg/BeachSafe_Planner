export interface Alert {
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface BeachData {
  name: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
  waveHeight: string;
  surfConditions: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  temperature: number;
  waterTemp: number;
  windSpeed: number;
  uvIndex: number;
  patrolStatus: 'Active' | 'Inactive';
  patrolHours: string;
  facilities: string[];
  alerts: Alert[];
}

export const beachData: Record<string, BeachData> = {
  bondi: {
    name: 'Bondi Beach',
    crowdLevel: 'High',
    waveHeight: '1.2-1.8m',
    surfConditions: 'Good',
    temperature: 24,
    waterTemp: 21,
    windSpeed: 15,
    uvIndex: 8,
    patrolStatus: 'Active',
    patrolHours: '9:00 AM - 5:00 PM',
    facilities: ['Toilets', 'Showers', 'Cafes', 'Parking', 'First Aid', 'Equipment Rental'],
    alerts: [
      {
        title: 'High UV Warning',
        message: 'UV index is very high (8/10). Apply SPF 50+ sunscreen regularly and seek shade during peak hours (10 AM - 3 PM).',
        severity: 'high'
      },
      {
        title: 'Crowded Conditions',
        message: 'Beach is experiencing high visitor numbers. Allow extra time for parking and be patient with lifeguards.',
        severity: 'medium'
      }
    ]
  },
  manly: {
    name: 'Manly Beach',
    crowdLevel: 'Medium',
    waveHeight: '0.8-1.2m',
    surfConditions: 'Excellent',
    temperature: 23,
    waterTemp: 20,
    windSpeed: 12,
    uvIndex: 7,
    patrolStatus: 'Active',
    patrolHours: '9:00 AM - 5:00 PM',
    facilities: ['Toilets', 'Showers', 'Restaurants', 'Shops', 'Parking', 'Surf School'],
    alerts: [
      {
        title: 'Perfect Surf Conditions',
        message: 'Excellent conditions for surfing and swimming. Waves are clean and consistent.',
        severity: 'low'
      }
    ]
  },
  coogee: {
    name: 'Coogee Beach',
    crowdLevel: 'Low',
    waveHeight: '0.5-0.8m',
    surfConditions: 'Fair',
    temperature: 25,
    waterTemp: 22,
    windSpeed: 8,
    uvIndex: 9,
    patrolStatus: 'Active',
    patrolHours: '10:00 AM - 4:00 PM',
    facilities: ['Toilets', 'Showers', 'Cafes', 'Playground', 'BBQ Areas', 'Ocean Pool'],
    alerts: [
      {
        title: 'Extreme UV Conditions',
        message: 'UV index is extremely high (9/10). Limit sun exposure and use maximum protection.',
        severity: 'high'
      },
      {
        title: 'Bluebottle Sighting',
        message: 'Minor bluebottle (jellyfish) activity reported. Lifeguards are monitoring the situation.',
        severity: 'medium'
      }
    ]
  },
  cronulla: {
    name: 'Cronulla Beach',
    crowdLevel: 'Medium',
    waveHeight: '1.0-1.5m',
    surfConditions: 'Good',
    temperature: 22,
    waterTemp: 19,
    windSpeed: 18,
    uvIndex: 6,
    patrolStatus: 'Active',
    patrolHours: '9:00 AM - 5:00 PM',
    facilities: ['Toilets', 'Showers', 'Cafes', 'Parking', 'Bike Path', 'Fishing Areas'],
    alerts: [
      {
        title: 'Windy Conditions',
        message: 'Moderate to strong winds (18 km/h). Be cautious with inflatables and light beach equipment.',
        severity: 'medium'
      }
    ]
  }
};