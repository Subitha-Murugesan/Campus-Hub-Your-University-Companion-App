import { useState } from 'react';
import { LoginScreen, UserType } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LecturerWelcomeScreen } from './components/LecturerWelcomeScreen';
import { CleaningStaffDashboard } from './components/CleaningStaffDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LibraryBookingScreen } from './components/LibraryBookingScreen';
import { CafeteriaOccupancyScreen } from './components/CafeteriaOccupancyScreen';
import { ClassroomNavigationScreen } from './components/ClassroomNavigationScreen';
import { ClassroomBookingScreen } from './components/ClassroomBookingScreen';
import { TimetableScreen } from './components/TimetableScreen';
import { TemperatureVotingScreen } from './components/TemperatureVotingScreen';
import { IssueReportingScreen } from './components/IssueReportingScreen';
import { DigitalIDScreen } from './components/DigitalIDScreen';
import { MeetingRoomBookingScreen } from './components/MeetingRoomBookingScreen';
import { CleaningScheduleScreen } from './components/CleaningScheduleScreen';
import { AdminAnalyticsScreen } from './components/AdminAnalyticsScreen';
import { SensorOverviewScreen } from './components/SensorOverviewScreen';
import { AllBookingsScreen } from './components/AllBookingsScreen';
import { ChatbotAssistant, ChatbotButton } from './components/ChatbotAssistant';
import { Toaster } from 'sonner@2.0.3';

type Screen = 'welcome' | 'library' | 'cafeteria' | 'classroom' | 'classroom-booking' | 'timetable' | 'temperature' | 'issues' | 'digital-id' | 'meeting-rooms' | 'cleaning-schedule' | 'admin-analytics' | 'sensors' | 'all-bookings';
type AuthScreen = 'login' | 'signup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>('student');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showChatbot, setShowChatbot] = useState(false);

  // Show login/signup screens if not logged in
  if (!isLoggedIn) {
    if (authScreen === 'signup') {
      return (
        <SignupScreen
          onSignup={(type) => {
            setUserType(type);
            setIsLoggedIn(true);
          }}
          onBackToLogin={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <LoginScreen
        onLogin={(type) => {
          setUserType(type);
          setIsLoggedIn(true);
        }}
        onNavigateToSignup={() => setAuthScreen('signup')}
      />
    );
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('welcome');
  };

  const renderScreen = () => {
    // Role-specific welcome screens
    if (currentScreen === 'welcome') {
      switch (userType) {
        case 'lecturer':
          return <LecturerWelcomeScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
        case 'cleaning':
          return <CleaningStaffDashboard onNavigate={setCurrentScreen} onLogout={handleLogout} />;
        case 'admin':
          return <AdminDashboard onNavigate={setCurrentScreen} onLogout={handleLogout} />;
        case 'student':
        default:
          return <WelcomeScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      }
    }

    // Common screens accessible by all roles
    switch (currentScreen) {
      case 'library':
        // Only students and lecturers can access library
        if (userType === 'student' || userType === 'lecturer') {
          return <LibraryBookingScreen onBack={() => setCurrentScreen('welcome')} />;
        }
        return null;
      
      case 'cafeteria':
        return <CafeteriaOccupancyScreen onBack={() => setCurrentScreen('welcome')} />;
      
      case 'classroom':
        return <ClassroomNavigationScreen onBack={() => setCurrentScreen('welcome')} />;
      
      case 'classroom-booking':
        // Students and lecturers can book classrooms (lecturers get priority in the component)
        if (userType === 'student' || userType === 'lecturer') {
          return <ClassroomBookingScreen onBack={() => setCurrentScreen('welcome')} />;
        }
        return null;
      
      case 'timetable':
        // Only students and lecturers have timetables
        if (userType === 'student' || userType === 'lecturer') {
          return <TimetableScreen onBack={() => setCurrentScreen('welcome')} />;
        }
        return null;
      
      case 'temperature':
        return <TemperatureVotingScreen onBack={() => setCurrentScreen('welcome')} />;
      
      case 'issues':
        return <IssueReportingScreen onBack={() => setCurrentScreen('welcome')} />;
      
      case 'digital-id':
        return <DigitalIDScreen onBack={() => setCurrentScreen('welcome')} />;
      
      // Lecturer-specific screens
      case 'meeting-rooms':
        if (userType === 'lecturer') {
          return <MeetingRoomBookingScreen onBack={() => setCurrentScreen('welcome')} />;
        }
        return null;
      
      // Cleaning staff-specific screens
      case 'cleaning-schedule':
        if (userType === 'cleaning') {
          return <CleaningScheduleScreen onBack={() => setCurrentScreen('welcome')} />;
        }
        return null;
      
      // Admin-specific screens
      case 'admin-analytics':
        if (userType === 'admin') {
          return <AdminAnalyticsScreen onBack={() => setCurrentScreen('welcome')} />;
        }
        return null;
      
      // Sensor overview screen
      case 'sensors':
        return <SensorOverviewScreen onBack={() => setCurrentScreen('welcome')} />;
      
      // All bookings screen
      case 'all-bookings':
        return <AllBookingsScreen onBack={() => setCurrentScreen('welcome')} />;
      
      default:
        // Fallback to welcome screen
        switch (userType) {
          case 'lecturer':
            return <LecturerWelcomeScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
          case 'cleaning':
            return <CleaningStaffDashboard onNavigate={setCurrentScreen} onLogout={handleLogout} />;
          case 'admin':
            return <AdminDashboard onNavigate={setCurrentScreen} onLogout={handleLogout} />;
          case 'student':
          default:
            return <WelcomeScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {renderScreen()}
        <ChatbotButton onClick={() => setShowChatbot(true)} />
        {showChatbot && <ChatbotAssistant onClose={() => setShowChatbot(false)} />}
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
