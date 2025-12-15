import { ArrowLeft, BookOpen, DoorOpen, Calendar, Clock, MapPin, Trash2 } from 'lucide-react';

interface AllBookingsScreenProps {
  onBack: () => void;
}

export function AllBookingsScreen({ onBack }: AllBookingsScreenProps) {
  const allBookings = [
    // Today's Bookings
    {
      id: '1',
      type: 'Library',
      location: 'Library - Seat A23',
      date: 'Today',
      time: '09:00 - 12:00',
      status: 'Active',
      color: 'bg-blue-500',
      icon: BookOpen,
    },
    {
      id: '2',
      type: 'Classroom',
      location: 'Room E-205',
      date: 'Today',
      time: '15:30 - 17:00',
      status: 'Upcoming',
      color: 'bg-orange-500',
      icon: DoorOpen,
    },
    // Tomorrow's Bookings
    {
      id: '3',
      type: 'Library',
      location: 'Library - Seat B12',
      date: 'Tomorrow',
      time: '10:00 - 14:00',
      status: 'Scheduled',
      color: 'bg-blue-500',
      icon: BookOpen,
    },
    {
      id: '4',
      type: 'Classroom',
      location: 'Room CS-301',
      date: 'Tomorrow',
      time: '14:00 - 16:00',
      status: 'Scheduled',
      color: 'bg-orange-500',
      icon: DoorOpen,
    },
    // Future Bookings
    {
      id: '5',
      type: 'Library',
      location: 'Library - Seat C45',
      date: 'Dec 11, 2025',
      time: '08:00 - 12:00',
      status: 'Scheduled',
      color: 'bg-blue-500',
      icon: BookOpen,
    },
    {
      id: '6',
      type: 'Classroom',
      location: 'Room H11',
      date: 'Dec 12, 2025',
      time: '16:00 - 18:00',
      status: 'Scheduled',
      color: 'bg-orange-500',
      icon: DoorOpen,
    },
  ];

  const groupBookingsByDate = () => {
    const grouped: { [key: string]: typeof allBookings } = {};
    allBookings.forEach((booking) => {
      if (!grouped[booking.date]) {
        grouped[booking.date] = [];
      }
      grouped[booking.date].push(booking);
    });
    return grouped;
  };

  const groupedBookings = groupBookingsByDate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'Scheduled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl mb-1">All Bookings</h1>
            <p className="text-purple-100 text-sm">Manage your reservations</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl mb-1">{allBookings.filter(b => b.status === 'Active').length}</p>
            <p className="text-xs text-gray-600">Active Now</p>
          </div>
          <div>
            <p className="text-2xl mb-1">{allBookings.filter(b => b.status === 'Upcoming').length}</p>
            <p className="text-xs text-gray-600">Today</p>
          </div>
          <div>
            <p className="text-2xl mb-1">{allBookings.length}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 py-6">
        {Object.entries(groupedBookings).map(([date, bookings]) => (
          <div key={date} className="mb-6">
            <h3 className="text-sm text-gray-600 mb-3">{date}</h3>
            <div className="space-y-3">
              {bookings.map((booking) => {
                const Icon = booking.icon;
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-1 ${booking.color}`} />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 ${booking.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">{booking.type}</p>
                            <h4 className="text-sm mb-2">{booking.location}</h4>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Calendar className="w-3 h-3" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Clock className="w-3 h-3" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <button
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Cancel booking"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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
  );
}
