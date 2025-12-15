import { useState } from 'react';
import { ArrowLeft, DoorOpen, Users, Clock, Check, Calendar, Building2, Wifi, Monitor, Tv, Video, MessageSquare, AlertCircle } from 'lucide-react';

interface ClassroomBookingScreenProps {
  onBack: () => void;
}

interface AvailableRoom {
  id: string;
  code: string;
  building: string;
  floor: number;
  capacity: number;
  features: string[];
  available: boolean;
}

export function ClassroomBookingScreen({ onBack }: ClassroomBookingScreenProps) {
  // Get today's date and max booking date (3 days from now)
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 3);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [selectedStartTime, setSelectedStartTime] = useState('14:00');
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('any');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [purpose, setPurpose] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const buildings = [
    { id: 'all', name: 'All Buildings' },
    { id: 'ENG', name: 'Engineering' },
    { id: 'SCI', name: 'Science Complex' },
    { id: 'AH', name: 'Arts & Humanities' },
    { id: 'BUS', name: 'Business School' },
  ];

  const floors = [
    { value: 'all', label: 'All Floors' },
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' },
  ];

  const equipmentOptions = [
    { id: 'projector', name: 'Projector', icon: Monitor },
    { id: 'whiteboard', name: 'Whiteboard', icon: MessageSquare },
    { id: 'wifi', name: 'WiFi', icon: Wifi },
    { id: 'computer', name: 'Computer', icon: Monitor },
    { id: 'tv', name: 'TV', icon: Tv },
    { id: 'videoconf', name: 'Video Conf', icon: Video },
  ];

  const durations = [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
  ];

  const capacityOptions = [
    { value: 'any', label: 'Any Size' },
    { value: '10', label: '10+ people' },
    { value: '20', label: '20+ people' },
    { value: '40', label: '40+ people' },
  ];

  const availableRooms: AvailableRoom[] = [
    {
      id: '1',
      code: 'ENG-105',
      building: 'Engineering',
      floor: 1,
      capacity: 25,
      features: ['Projector', 'Whiteboard', 'WiFi'],
      available: true,
    },
    {
      id: '2',
      code: 'ENG-210',
      building: 'Engineering',
      floor: 2,
      capacity: 40,
      features: ['Projector', 'Whiteboard', 'WiFi', 'Computer'],
      available: true,
    },
    {
      id: '3',
      code: 'SCI-115',
      building: 'Science Complex',
      floor: 1,
      capacity: 30,
      features: ['Projector', 'Whiteboard'],
      available: false,
    },
    {
      id: '4',
      code: 'SCI-220',
      building: 'Science Complex',
      floor: 2,
      capacity: 20,
      features: ['Whiteboard', 'WiFi'],
      available: true,
    },
    {
      id: '5',
      code: 'AH-101',
      building: 'Arts & Humanities',
      floor: 1,
      capacity: 15,
      features: ['Whiteboard', 'WiFi', 'TV'],
      available: true,
    },
    {
      id: '6',
      code: 'BUS-305',
      building: 'Business School',
      floor: 3,
      capacity: 50,
      features: ['Projector', 'Whiteboard', 'WiFi', 'Computer', 'Video Conf'],
      available: true,
    },
  ];

  const filteredRooms = availableRooms.filter((room) => {
    if (selectedBuilding !== 'all' && !room.building.includes(selectedBuilding === 'ENG' ? 'Engineering' : selectedBuilding === 'SCI' ? 'Science' : selectedBuilding === 'AH' ? 'Arts' : 'Business')) {
      return false;
    }
    if (selectedFloor !== 'all' && room.floor !== parseInt(selectedFloor)) {
      return false;
    }
    if (selectedCapacity !== 'any' && room.capacity < parseInt(selectedCapacity)) {
      return false;
    }
    if (selectedEquipment.length > 0 && !selectedEquipment.every((feature) => room.features.includes(feature))) {
      return false;
    }
    return true;
  });

  const handleBooking = () => {
    if (selectedRoom && purpose.trim()) {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedRoom(null);
        setPurpose('');
      }, 3000);
    }
  };

  const selectedRoomData = availableRooms.find((r) => r.id === selectedRoom);

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

      {/* Header */}
      <div className="bg-orange-600 p-6">
        <div className="flex items-center mb-2">
          <button onClick={onBack} className="mr-4 text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Book Classroom</h1>
        </div>
        <p className="text-white/90 text-sm ml-10">Reserve a room for study groups or meetings</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Date & Time Selection */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-gray-800">Date & Time</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg"
                  min={formatDate(today)}
                  max={formatDate(maxDate)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={selectedStartTime}
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Duration</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                >
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="mb-4 text-gray-800">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Building</label>
              <select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Floor</label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                {floors.map((floor) => (
                  <option key={floor.value} value={floor.value}>
                    {floor.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Capacity</label>
              <select
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                {capacityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Equipment</label>
              <div className="flex flex-wrap gap-2">
                {equipmentOptions.map((equipment) => {
                  const EquipmentIcon = equipment.icon;
                  const isSelected = selectedEquipment.includes(equipment.name);
                  return (
                    <button
                      key={equipment.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedEquipment(selectedEquipment.filter((e) => e !== equipment.name));
                        } else {
                          setSelectedEquipment([...selectedEquipment, equipment.name]);
                        }
                      }}
                      className={`px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-orange-500 text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <EquipmentIcon className="w-3.5 h-3.5" />
                      {equipment.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Available Rooms</h3>
            <div className="text-sm text-gray-600">
              {filteredRooms.filter((r) => r.available).length} available
            </div>
          </div>
          <div className="space-y-3">
            {filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => room.available && setSelectedRoom(room.id)}
                disabled={!room.available}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  !room.available
                    ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                    : selectedRoom === room.id
                    ? 'bg-orange-50 border-orange-600'
                    : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <DoorOpen className="w-5 h-5 text-orange-600" />
                      <div className="text-gray-900">{room.code}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {room.building} • Floor {room.floor}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {room.capacity} people</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {room.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedRoom === room.id && (
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                {!room.available && (
                  <div className="mt-2 text-sm text-red-600">Not available at this time</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Purpose Input */}
        {selectedRoom && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="mb-4 text-gray-800">Booking Details</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Group study session for CS 301, Team meeting for final project..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Booking Summary & Confirm Button */}
        {selectedRoom && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 border border-orange-100">
            <h3 className="text-gray-900 mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="text-gray-900">{selectedRoomData?.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Building:</span>
                <span className="text-gray-900">{selectedRoomData?.building}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="text-gray-900">
                  {selectedStartTime} ({selectedDuration} hour{selectedDuration !== '1' ? 's' : ''})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Capacity:</span>
                <span className="text-gray-900">{selectedRoomData?.capacity} people</span>
              </div>
            </div>
            <button
              onClick={handleBooking}
              disabled={!purpose.trim()}
              className="w-full mt-4 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        )}

        {/* Info */}
        <div className="space-y-3">
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
                  <li>• All bookings require admin approval (within 1 hour)</li>
                </ul>
              </div>
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
            <h2 className="mb-2 text-gray-900">Booking Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Your classroom booking request has been submitted for approval.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-left">
              <div className="text-gray-900">{selectedRoomData?.code}</div>
              <div className="text-gray-600">
                {selectedDate} at {selectedStartTime}
              </div>
            </div>
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