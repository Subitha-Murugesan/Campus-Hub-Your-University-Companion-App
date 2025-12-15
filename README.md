# Campus Hub - Your University Companion App

A comprehensive, modern web application for students and staff at Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU). This app provides integrated access to campus life features including library bookings, classroom navigation, course timetables, cafeteria information, facility issue reporting, and an intelligent AI chatbot assistant.

**GitHub Repository**: [Subitha-Murugesan/Campus-Hub-Your-University-Companion-App](https://github.com/Subitha-Murugesan/Campus-Hub-Your-University-Companion-App)  
**Live Site**: [https://campushub-99096.web.app](https://campushub-99096.web.app)

<img width="652" height="773" alt="image" src="https://github.com/user-attachments/assets/05a6ca41-1c5b-41cb-9e2c-945b731b968d" />


## ✨ Features

### 📚 Core Functionality
- **Library Management** - Check hours, book study seats, and access library resources
- **Classroom Navigation** - GPS-enabled campus navigation with interactive floor plans
- **Course Timetables** - View and manage your academic schedule
- **Cafeteria Occupancy** - Real-time occupancy tracking and menu information
- **Issue Reporting** - Report and track facility maintenance issues
- **Digital Student ID** - NFC-enabled virtual student identification
- **Meeting Room Bookings** - Reserve meeting and study spaces
- **Temperature Voting** - Smart building climate control via user preferences
- **Cleaning Schedule** - Optimized cleaning schedules for staff
- **Admin Analytics** - Comprehensive campus analytics and insights
  
<img width="303" height="740" alt="student" src="https://github.com/user-attachments/assets/fb0ffea6-1a4c-42d8-aa83-d7b1ca100073" />
<img width="301" height="778" alt="Lecturer" src="https://github.com/user-attachments/assets/e8b2f2b0-56fb-4775-95e8-74979099370b" />
<img width="225" height="766" alt="staff" src="https://github.com/user-attachments/assets/4b6b72a4-ad40-4e1c-839f-d5a025f8d217" />
<img width="219" height="655" alt="clea" src="https://github.com/user-attachments/assets/dac916a9-761e-4043-b8d4-3128991a1ab1" />
<img width="228" height="712" alt="admin" src="https://github.com/user-attachments/assets/e44c4219-82ed-445f-946a-ed7d11cdfe32" />
<img width="231" height="773" alt="system" src="https://github.com/user-attachments/assets/053856aa-4913-4c01-a011-ffad00d69d6b" />
<img width="228" height="701" alt="sya" src="https://github.com/user-attachments/assets/e5cb72b8-6e8b-4bea-9b8a-26642b818da1" />


### 🤖 AI Chatbot Assistant (Lara)
- Intelligent campus assistant powered by Google Gemini AI
- Answers academic and campus-related questions
- Real-time conversation with natural language understanding
- Assists with library, navigation, courses, facilities, and more

  <img width="371" height="481" alt="image" src="https://github.com/user-attachments/assets/4c00f96f-ba8b-480c-a9a4-b558891157dc" />
  


## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18.3** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite 6.3** | Fast build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Radix UI** | Accessible component library |
| **Recharts** | Data visualization & charts |
| **Google Generative AI** | Chatbot AI integration |
| **Firebase Hosting** | Production deployment |

## 📁 Project Structure

```
src/
├── components/
│   ├── AdminAnalyticsScreen.tsx
│   ├── AdminDashboard.tsx
│   ├── AllBookingsScreen.tsx
│   ├── CafeteriaOccupancyScreen.tsx
│   ├── ChatbotAssistant.tsx          # 🤖 AI Chatbot (Lara)
│   ├── ClassroomBookingScreen.tsx
│   ├── ClassroomNavigationScreen.tsx
│   ├── CleaningScheduleScreen.tsx
│   ├── CleaningStaffDashboard.tsx
│   ├── DigitalIDScreen.tsx
│   ├── IssueReportingScreen.tsx
│   ├── LecturerWelcomeScreen.tsx
│   ├── LibraryBookingScreen.tsx
│   ├── LoginScreen.tsx
│   ├── MeetingRoomBookingScreen.tsx
│   ├── SensorOverviewScreen.tsx
│   ├── SignupScreen.tsx
│   ├── TemperatureVotingScreen.tsx
│   ├── TimetableScreen.tsx
│   ├── WelcomeScreen.tsx
│   ├── ui/                           # Radix UI components
│   └── figma/                        # Figma integration utilities
├── services/
│   └── geminiService.ts              # Google Gemini API integration
├── styles/
│   ├── globals.css
│   └── index.css
├── App.tsx                           # Main app component & routing
├── main.tsx                          # Application entry point
└── index.css                         # Global styles

build/                                # Production build (generated)
firebase.json                         # Firebase Hosting configuration
.firebaserc                          # Firebase project settings
.env.local                           # Local development secrets (not committed)
.env.production                      # Production secrets (use in CI/CD)
DEPLOY_FIREBASE.md                   # Detailed deployment guide
```

## ⚙️ Environment Variables

### Development
Create `.env.local` in the root directory:
```
VITE_GEMINI_API_KEY=your_development_key_here
```

### Production
Create `.env.production` in the root directory:
```
VITE_GEMINI_API_KEY=your_production_key_here
```

**⚠️ Security**: Never commit `.env.production` or API keys. Use GitHub Secrets for CI/CD pipelines.

## 🚢 Deployment

### Firebase Hosting

**Full deployment guide**: See [DEPLOY_FIREBASE.md](./DEPLOY_FIREBASE.md)

#### Quick Deploy

```bash
# 1. Install Firebase CLI (one-time)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Build and deploy
npm run build
firebase deploy --project campushub-99096
```

#### Live Site
https://campushub-99096.web.app

#### GitHub Actions (Automated Deployment)
The project includes GitHub Actions workflow for automatic deployment. Configure secrets:
- `VITE_GEMINI_API_KEY` - API key for Gemini
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON

On push to `main` branch, the app automatically builds and deploys.

## 🤖 Chatbot Integration

### Overview
The chatbot (Lara) is powered by Google Generative AI (Gemini 2.5 Flash) and provides intelligent responses about campus life and academic questions.

### Configuration
- **API Key**: Set via `VITE_GEMINI_API_KEY` environment variable
- **Service**: [src/services/geminiService.ts](./src/services/geminiService.ts)
- **Component**: [src/components/ChatbotAssistant.tsx](./src/components/ChatbotAssistant.tsx)

### Capabilities
- Campus navigation assistance
- Library and study resources
- Course registration and timetable help
- Academic support and programming questions
- Facility issue reporting
- Dining and cafeteria information

## 🔐 Security Notes

- **Client-side secrets**: API keys in `.env.production` are visible in production builds. For sensitive operations, use a secure backend (Cloud Functions).
- **Environment secrets**: Use GitHub Secrets or Firebase environment variables for CI/CD.
- **Data privacy**: Comply with GDPR and university data policies.

## 📊 Admin Analytics

The Admin Dashboard provides:
- Real-time campus occupancy data
- Temperature trends and HVAC optimization
- CO₂ monitoring and air quality
- Energy consumption tracking
- Predictive maintenance alerts
- Cost optimization recommendations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:prod   # Build and deploy to Firebase (if configured)
npm run preview      # Preview production build locally
```

## 🤝 Contributing

1. Clone the repository:
   ```bash
   git clone https://github.com/Subitha-Murugesan/Campus-Hub-Your-University-Companion-App.git
   cd "Campus-Hub-Your-University-Companion-App"
   ```

2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Repository**: https://github.com/Subitha-Murugesan/Campus-Hub-Your-University-Companion-App


## 👥 Team

- **Subitha Murugesan** - Developer & Project Lead
- **GitHub**: [@Subitha-Murugesan](https://github.com/Subitha-Murugesan)
- **LinkedIn**: [@Subitha-Murugesan](https://www.linkedin.com/in/subitha-murugesan/)
- **Repository**: [Campus-Hub-Your-University-Companion-App](https://github.com/Subitha-Murugesan/Campus-Hub-Your-University-Companion-App)

## 📚 Resources

- **GitHub Repository**: https://github.com/Subitha-Murugesan/Campus-Hub-Your-University-Companion-App
- **Live Site**: https://campushub-99096.web.app
- **Deployment Guide**: [DEPLOY_FIREBASE.md](./DEPLOY_FIREBASE.md)
- **Design**: [Figma Project](https://www.figma.com/design/ko6knepiXQUHp0sak3VlW5/University-Student-App-Screens)

**Last Updated**: December 15, 2025  
**Status**: ✅ Production Ready
  
