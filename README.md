# 🏖️ BeachSafe Planner

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive beach safety application for Sydney's popular beaches, providing real-time conditions, safety alerts, and crowd management information to help beachgoers make informed decisions.

![BeachSafe Planner Screenshot](https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- 🌊 **Real-time Beach Conditions** - Live weather, surf, and UV data from trusted APIs
- ⚠️ **Smart Safety Alerts** - Dynamic alerts based on current conditions and AI analysis
- 👥 **Crowd Level Estimation** - AI-powered crowd predictions using weather and time data
- ☀️ **Sunscreen Reminders** - UV-based protection recommendations with timing alerts
- 🛡️ **Interactive Safety Tips** - Comprehensive beach safety information and emergency contacts
- 📱 **Mobile-First Design** - Optimized for on-the-go beach planning
- 🔄 **Auto-Refresh** - Data updates every 10 minutes with manual refresh option
- 🚨 **Fallback System** - Graceful degradation when APIs are unavailable

## 🏖️ Beaches Covered

| Beach | Features | Patrol Hours |
|-------|----------|--------------|
| 🏄‍♂️ **Bondi Beach** | High activity, full facilities | 9:00 AM - 5:00 PM |
| 🌊 **Manly Beach** | Family-friendly, surf school | 9:00 AM - 5:00 PM |
| 🏊‍♀️ **Coogee Beach** | Ocean pool, BBQ areas | 10:00 AM - 4:00 PM |
| 🎣 **Cronulla Beach** | Fishing areas, bike paths | 9:00 AM - 5:00 PM |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- API keys (optional, app works with demo data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/beachsafe-planner.git
   cd beachsafe-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional)
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   VITE_STORMGLASS_API_KEY=your_stormglass_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔑 API Setup (Optional)

The app works with demo data, but for real-time information:

### OpenWeatherMap API (Weather Data)
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier: 1,000 calls/day, 60 calls/minute

### Stormglass API (Surf Data)
1. Visit [Stormglass](https://stormglass.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier: 50 calls/day

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with time display
│   ├── BeachSelector.tsx # Beach selection interface
│   ├── BeachOverview.tsx # Beach conditions overview
│   ├── SafetyAlerts.tsx # Dynamic safety alerts
│   ├── SunscreenReminder.tsx # UV protection reminders
│   ├── SafetyTips.tsx  # Interactive safety information
│   └── DataStatus.tsx  # API status and refresh controls
├── services/           # API integration services
│   ├── weatherService.ts # Weather and surf data APIs
│   └── alertService.ts # Alert generation logic
├── hooks/              # Custom React hooks
│   └── useRealTimeData.ts # Real-time data management
├── data/               # Static data and types
│   └── beachData.ts    # Beach information and types
└── App.tsx             # Main application component
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **HTTP Client**: Axios for API requests
- **State Management**: React hooks and context

## 📊 Data Sources

| Service | Purpose | Update Frequency |
|---------|---------|------------------|
| OpenWeatherMap | Temperature, wind, UV index | Every 10 minutes |
| Stormglass | Wave height, surf conditions, water temp | Every 10 minutes |
| AI Algorithm | Crowd level estimation | Real-time |
| Static Data | Beach facilities, patrol hours | As needed |

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run build && npm run preview  # Test production build locally
```

## 🌐 Deployment

The app can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly** with real API keys
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure mobile responsiveness
- Add proper error handling
- Test with both real and fallback data

## 📱 Mobile Support

The app is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🔒 Privacy & Security

- No personal data is stored or transmitted
- API keys are kept secure in environment variables
- All external API calls are made over HTTPS
- No tracking or analytics implemented

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Surf data provided by [Stormglass](https://stormglass.io/)
- Beach safety information from [Surf Life Saving Australia](https://sls.com.au/)
- Icons by [Lucide](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/beachsafe-planner/issues) page
2. Create a new issue with detailed information
3. For urgent beach safety concerns, contact local authorities

---

**⚠️ Disclaimer**: This app provides general beach safety information. Always follow local lifeguard instructions and official beach safety guidelines. In emergencies, call 000 (Australia) immediately.