import { GraduationCap, Users, BookOpen, MapPin, Thermometer, AlertCircle, CreditCard, MessageSquare, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Screen = 'welcome' | 'library' | 'cafeteria' | 'classroom' | 'classroom-booking' | 'timetable' | 'temperature' | 'issues' | 'digital-id' | 'meeting-rooms';

interface LecturerWelcomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function LecturerWelcomeScreen({ onNavigate, onLogout }: LecturerWelcomeScreenProps) {
  const features = [
    { 
      icon: BookOpen, 
      title: 'Meeting Rooms', 
      description: 'Book rooms with priority access',
      screen: 'meeting-rooms' as Screen,
      color: 'from-purple-500 to-purple-600',
      badge: 'Priority'
    },
    { 
      icon: Users, 
      title: 'Classroom Booking', 
      description: 'Reserve classrooms for lectures',
      screen: 'classroom-booking' as Screen,
      color: 'from-orange-500 to-orange-600'
    },
    { 
      icon: MapPin, 
      title: 'Navigation', 
      description: 'Find your way around campus',
      screen: 'classroom' as Screen,
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Thermometer, 
      title: 'Temperature Control', 
      description: 'Vote for room temperature',
      screen: 'temperature' as Screen,
      color: 'from-red-500 to-pink-600'
    },
    { 
      icon: AlertCircle, 
      title: 'Report Issues', 
      description: 'Report facility problems',
      screen: 'issues' as Screen,
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: CreditCard, 
      title: 'Digital ID', 
      description: 'Your digital staff card',
      screen: 'digital-id' as Screen,
      color: 'from-indigo-500 to-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Developer Credit - Top */}
      <div className="bg-white border-b px-6 py-3 text-center space-y-1">
        <p className="text-xs text-gray-500">
          Fully developed by <span className="font-semibold text-gray-700">SUBITHA MURUGESAN</span>
        </p>
        <div className="flex items-center justify-center gap-3 text-xs">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
            subithaa10@gmail.com
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
            LinkedIn
          </a>
        </div>
      </div>

      {/* Header with University Building Image */}
      <div className="relative text-white px-6 pt-12 pb-20">
        {/* Background Image */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684710087097-4b87480ad8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1MjcxMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="University Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-indigo-900/80" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-8 h-8" />
                <h1 className="text-2xl">FAU Campus</h1>
              </div>
              <p className="text-purple-100 text-sm">Lecturer Portal</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-100">Welcome back,</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Staff</span>
            </div>
            <h2 className="text-xl mb-1">Prof. Dr. Schmidt</h2>
            <p className="text-sm text-purple-100">Department of Computer Science</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-12 mb-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-2xl mb-1">3</p>
            <p className="text-xs text-gray-600">Meetings Today</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-2xl mb-1">2</p>
            <p className="text-xs text-gray-600">Lectures</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-2xl mb-1">5</p>
            <p className="text-xs text-gray-600">Office Hours</p>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="px-6 mb-6 relative z-10">
        <h3 className="text-sm text-gray-600 mb-3">Today's Schedule</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">10:00</div>
            <div className="flex-1">
              <p className="text-sm mb-1">Advanced Algorithms</p>
              <p className="text-xs text-gray-500">Room CS-301 • 90 min</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">14:00</div>
            <div className="flex-1">
              <p className="text-sm mb-1">Thesis Meeting</p>
              <p className="text-xs text-gray-500">Meeting Room B • 60 min</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">16:00</div>
            <div className="flex-1">
              <p className="text-sm mb-1">Office Hours</p>
              <p className="text-xs text-gray-500">Office 4.23 • 120 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-24 relative z-10">
        <h3 className="text-sm text-gray-600 mb-3">Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.screen}
                onClick={() => onNavigate(feature.screen)}
                className="relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
              >
                {feature.badge && (
                  <div className="absolute top-2 right-2 bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                    {feature.badge}
                  </div>
                )}
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </button>
            );
          })}
        </div>

      {/* Developer Credit - Bottom */}
      <div className="px-6 py-3 text-center border-t space-y-1">
        <p className="text-xs text-gray-500">
          Fully developed by <span className="font-semibold text-gray-700">SUBITHA MURUGESAN</span>
        </p>
        <div className="flex items-center justify-center gap-3 text-xs">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
            subithaa10@gmail.com
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}