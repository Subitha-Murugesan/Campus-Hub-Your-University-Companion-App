import { BookOpen, Coffee, MapPin, Calendar, DoorOpen, LogOut, User, Clock, CalendarDays, Thermometer, AlertCircle, CreditCard, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Screen = 'welcome' | 'library' | 'cafeteria' | 'classroom' | 'classroom-booking' | 'timetable' | 'temperature' | 'issues' | 'digital-id' | 'all-bookings';

interface WelcomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout?: () => void;
}

export function WelcomeScreen({ onNavigate, onLogout }: WelcomeScreenProps) {
  const todayClasses = [
    {
      id: '1',
      subject: 'Data Structures',
      time: '08:30 - 10:00',
      room: 'H11',
      type: 'Lecture',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      subject: 'Database Systems',
      time: '10:15 - 11:45',
      room: 'CS-201',
      type: 'Tutorial',
      color: 'bg-purple-500',
    },
    {
      id: '3',
      subject: 'Software Engineering',
      time: '14:00 - 15:30',
      room: 'E-304',
      type: 'Lecture',
      color: 'bg-orange-500',
    },
  ];

  // Get the next upcoming class (first one for demo)
  const nextClass = todayClasses[0];

  // Today's bookings
  const todayBookings = [
    {
      id: '1',
      type: 'Library',
      location: 'Library - Seat A23',
      time: '09:00 - 12:00',
      status: 'Active',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      type: 'Classroom',
      location: 'Room E-205',
      time: '15:30 - 17:00',
      status: 'Upcoming',
      color: 'bg-orange-500',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Library Booking',
      description: 'Reserve your study space',
      screen: 'library' as Screen,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500',
    },
    {
      icon: DoorOpen,
      title: 'Classroom Booking',
      description: 'Reserve classrooms for lectures',
      screen: 'classroom-booking' as Screen,
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-500',
    },
    {
      icon: Coffee,
      title: 'Cafeteria',
      description: 'Check real-time occupancy',
      screen: 'cafeteria' as Screen,
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-500',
    },
    {
      icon: MapPin,
      title: 'Navigation',
      description: 'Find your way around campus',
      screen: 'classroom' as Screen,
      color: 'from-teal-500 to-cyan-600',
      iconBg: 'bg-teal-500',
    },
    {
      icon: Thermometer,
      title: 'Temperature Control',
      description: 'Vote for room temperature',
      screen: 'temperature' as Screen,
      color: 'from-red-500 to-pink-600',
      iconBg: 'bg-red-500',
    },
    {
      icon: AlertCircle,
      title: 'Report Issues',
      description: 'Report facility problems',
      screen: 'issues' as Screen,
      color: 'from-yellow-500 to-orange-500',
      iconBg: 'bg-yellow-500',
    },
    {
      icon: CreditCard,
      title: 'Digital ID',
      description: 'Your digital student card',
      screen: 'digital-id' as Screen,
      color: 'from-indigo-500 to-purple-600',
      iconBg: 'bg-indigo-500',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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

      {/* Hero Section with University Building Image */}
      <div className="relative text-white px-6 pt-12 pb-20">
        {/* Background Image */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684710087097-4b87480ad8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1MjcxMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="University Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-8 h-8" />
                <h1 className="text-2xl">FAU Campus</h1>
              </div>
              <p className="text-purple-100 text-sm">Student Portal</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                <User className="w-4 h-4" />
                <span className="text-sm">Student</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-100">Welcome back,</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Student</span>
            </div>
            <h2 className="text-xl mb-1">Hello Eelisa</h2>
            <div className="flex items-center gap-2 text-purple-100 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Tuesday, December 9, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule - Moved below header */}
      <div className="px-6 -mt-12 mb-6 relative z-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-white">Next Class</h2>
          <button
            onClick={() => onNavigate('timetable')}
            className="text-xs text-white hover:underline"
          >
            View All
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className={`h-1 ${nextClass.color}`} />
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-gray-900 flex-1">{nextClass.subject}</h3>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {nextClass.type}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{nextClass.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{nextClass.room}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex-1 px-6 py-6">
        <h3 className="text-sm text-gray-600 mb-4">Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.screen}
                onClick={() => onNavigate(feature.screen)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 text-left"
              >
                <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Bookings - Moved to end */}
      <div className="px-6 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-gray-600">Today's Bookings</h2>
          <button
            onClick={() => onNavigate('all-bookings')}
            className="text-xs text-purple-600 hover:underline flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {todayBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`h-1 ${booking.color}`} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{booking.type}</p>
                    <h4 className="text-sm">{booking.location}</h4>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{booking.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Credit - Bottom */}
      <div className="bg-white border-t px-6 py-3 text-center space-y-1">
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
  );
}