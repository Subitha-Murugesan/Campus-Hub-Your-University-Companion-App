import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Check, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LibraryBookingScreenProps {
  onBack: () => void;
}

interface Seat {
  id: string;
  floor: number;
  zone: string;
  number: string;
  available: boolean;
  hasOutlet: boolean;
  hasWindow: boolean;
}

export function LibraryBookingScreen({ onBack }: LibraryBookingScreenProps) {
  // Get today's date and max booking date (3 days from now)
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 3);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedFloor, setSelectedFloor] = useState(2);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const seats: Seat[] = [
    { id: '1', floor: 2, zone: 'A', number: '12', available: true, hasOutlet: true, hasWindow: true },
    { id: '2', floor: 2, zone: 'A', number: '13', available: true, hasOutlet: true, hasWindow: false },
    { id: '3', floor: 2, zone: 'A', number: '14', available: false, hasOutlet: true, hasWindow: true },
    { id: '4', floor: 2, zone: 'B', number: '05', available: true, hasOutlet: false, hasWindow: false },
    { id: '5', floor: 2, zone: 'B', number: '06', available: true, hasOutlet: true, hasWindow: true },
    { id: '6', floor: 2, zone: 'B', number: '07', available: false, hasOutlet: true, hasWindow: false },
    { id: '7', floor: 2, zone: 'C', number: '21', available: true, hasOutlet: true, hasWindow: true },
    { id: '8', floor: 2, zone: 'C', number: '22', available: true, hasOutlet: false, hasWindow: false },
  ];

  const handleBooking = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedSeat(null);
    }, 3000);
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
      <div className="relative h-32 bg-blue-600 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1703236079592-4d2f222e8d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWJyYXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MjY3NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Library"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 p-6 flex items-center">
          <button onClick={onBack} className="mr-4 text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Book Library Seat</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Date & Time Selection */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-gray-800">Select Date & Time</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                min={formatDate(today)}
                max={formatDate(maxDate)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Time Slot</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floor Selection */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-gray-800">Select Floor</h3>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  selectedFloor === floor
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>
        </div>

        {/* Available Seats */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Available Seats</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{seats.filter(s => s.available).length} available</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => seat.available && setSelectedSeat(seat.id)}
                disabled={!seat.available}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  !seat.available
                    ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                    : selectedSeat === seat.id
                    ? 'bg-blue-50 border-blue-600'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-gray-900">{seat.zone}-{seat.number}</div>
                    <div className="text-sm text-gray-500">Zone {seat.zone}</div>
                  </div>
                  {selectedSeat === seat.id && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 text-xs">
                  {seat.hasOutlet && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">⚡ Outlet</span>
                  )}
                  {seat.hasWindow && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">🪟 Window</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        {selectedSeat && (
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        )}

        {/* Booking Policy */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-900 mb-2">
                <strong>Booking Policy:</strong>
              </p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Bookings are limited to <strong>3 days in advance</strong></li>
                <li>• If you don't show up within <strong>30 minutes</strong>, your booking will be automatically cancelled</li>
                <li>• Maximum 4 hours per booking session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-gray-900">Booking Confirmed!</h2>
            <p className="text-gray-600">
              Your seat has been reserved for {selectedDate} at {selectedTime}
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