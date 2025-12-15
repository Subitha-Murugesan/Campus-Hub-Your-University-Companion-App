import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Star, Check } from 'lucide-react';

interface MeetingRoomBookingScreenProps {
  onBack: () => void;
}

interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  floor: number;
  building: string;
  equipment: string[];
  available: boolean;
  priorityAccess: boolean;
}

export function MeetingRoomBookingScreen({ onBack }: MeetingRoomBookingScreenProps) {
  const [selectedDate, setSelectedDate] = useState('2024-12-09');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [duration, setDuration] = useState('60');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const meetingRooms: MeetingRoom[] = [
    {
      id: '1',
      name: 'Executive Room A',
      capacity: 12,
      floor: 4,
      building: 'Main Building',
      equipment: ['Projector', 'Whiteboard', 'Video Conference'],
      available: true,
      priorityAccess: true,
    },
    {
      id: '2',
      name: 'Conference Room B',
      capacity: 8,
      floor: 3,
      building: 'Main Building',
      equipment: ['TV Screen', 'Whiteboard'],
      available: true,
      priorityAccess: true,
    },
    {
      id: '3',
      name: 'Small Meeting Room 1',
      capacity: 6,
      floor: 2,
      building: 'Research Center',
      equipment: ['Whiteboard', 'Video Conference'],
      available: true,
      priorityAccess: false,
    },
    {
      id: '4',
      name: 'Board Room',
      capacity: 20,
      floor: 5,
      building: 'Administration',
      equipment: ['Large Projector', 'Video Conference', 'Sound System', 'Whiteboard'],
      available: false,
      priorityAccess: true,
    },
    {
      id: '5',
      name: 'Innovation Hub',
      capacity: 10,
      floor: 1,
      building: 'Innovation Center',
      equipment: ['Interactive Display', 'Whiteboard', 'Video Conference'],
      available: true,
      priorityAccess: true,
    },
  ];

  const handleBooking = () => {
    if (selectedRoom) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 2000);
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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl mb-1">Meeting Rooms</h1>
            <p className="text-sm text-purple-100">Priority access for lecturers</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-purple-100 mb-2">Date</label>
              <div className="bg-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-white text-sm flex-1 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-purple-100 mb-2">Time</label>
              <div className="bg-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-transparent text-white text-sm flex-1 outline-none"
                >
                  <option value="08:00">08:00</option>
                  <option value="10:00">10:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-purple-100 mb-2">Duration</label>
            <div className="flex gap-2">
              {['30', '60', '90', '120'].map((min) => (
                <button
                  key={min}
                  onClick={() => setDuration(min)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    duration === min
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="px-6 py-6 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm text-gray-600">Available Rooms</h3>
          <div className="flex items-center gap-1 text-xs text-purple-600">
            <Star className="w-3 h-3 fill-current" />
            <span>Priority Access</span>
          </div>
        </div>

        {meetingRooms.map((room) => (
          <div
            key={room.id}
            className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
              selectedRoom === room.id
                ? 'border-purple-600 shadow-md'
                : room.available
                ? 'border-transparent hover:border-gray-200'
                : 'border-transparent opacity-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm">{room.name}</h4>
                  {room.priorityAccess && (
                    <Star className="w-3 h-3 text-purple-600 fill-current" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Up to {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Floor {room.floor}, {room.building}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {room.equipment.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {room.available ? (
                <button
                  onClick={() => setSelectedRoom(room.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ml-2 ${
                    selectedRoom === room.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedRoom === room.id ? 'Selected' : 'Select'}
                </button>
              ) : (
                <div className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm ml-2">
                  Booked
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book Button */}
      {selectedRoom && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:shadow-lg transition-all active:scale-95"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg mb-2">Booking Confirmed!</h3>
            <p className="text-sm text-gray-600">
              Your meeting room has been reserved for {selectedDate} at {selectedTime}
            </p>
          </div>
        </div>
      )}

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
