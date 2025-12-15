import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Zap, ThermometerSun, Wind, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';

interface AdminAnalyticsScreenProps {
  onBack: () => void;
}

export function AdminAnalyticsScreen({ onBack }: AdminAnalyticsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'energy' | 'co2' | 'occupancy'>('temperature');
  const [viewMode, setViewMode] = useState<'historical' | 'predictions'>('historical');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('Main');
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  // Buildings list
  const buildings = ['Main', 'Science', 'Engineering', 'Business', 'Cafeteria', 'Arts & Humanities', 'Library'];
  
  // Rooms by building
  const roomsByBuilding: { [key: string]: string[] } = {
    'Main': ['M-101', 'M-102', 'M-201', 'M-202', 'M-301'],
    'Science': ['S-101', 'S-102', 'S-Lab1', 'S-Lab2'],
    'Engineering': ['E-101', 'E-201', 'E-Lab', 'E-Workshop'],
    'Business': ['B-Hall1', 'B-Hall2', 'B-Seminar1'],
    'Cafeteria': ['Dining Hall', 'Kitchen', 'Storage'],
    'Arts & Humanities': ['AH-101', 'AH-Studio', 'AH-Theater'],
    'Library': ['Reading Room 1', 'Reading Room 2', 'Study Hall', 'Archives'],
  };

  // Current incidents
  const incidents = [
    {
      id: 1,
      building: 'Main',
      room: 'M-201',
      issue: 'Temperature too high',
      priority: 'high',
      reportedAt: '2 hours ago',
      status: 'In Progress',
    },
    {
      id: 2,
      building: 'Science',
      room: 'S-Lab1',
      issue: 'Broken projector',
      priority: 'medium',
      reportedAt: '5 hours ago',
      status: 'Pending',
    },
    {
      id: 3,
      building: 'Engineering',
      room: 'E-Workshop',
      issue: 'AC not working',
      priority: 'high',
      reportedAt: '1 day ago',
      status: 'Assigned',
    },
    {
      id: 4,
      building: 'Library',
      room: 'Reading Room 1',
      issue: 'Lighting flickering',
      priority: 'low',
      reportedAt: '3 hours ago',
      status: 'Pending',
    },
  ];

  // Filter incidents based on selection
  const getFilteredIncidents = () => {
    if (selectedRoom) {
      return incidents.filter(i => i.building === selectedBuilding && i.room === selectedRoom);
    }
    return incidents.filter(i => i.building === selectedBuilding);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Assigned':
        return 'bg-purple-100 text-purple-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Generate data based on selected period
  const getTemperatureData = () => {
    if (selectedPeriod === 'year') {
      return [
        { period: '2020', avgTemp: 22.1, optimalRange: 21.0, energyCost: 145000 },
        { period: '2021', avgTemp: 21.8, optimalRange: 21.0, energyCost: 138000 },
        { period: '2022', avgTemp: 21.5, optimalRange: 21.0, energyCost: 132000 },
        { period: '2023', avgTemp: 21.3, optimalRange: 21.0, energyCost: 125000 },
        { period: '2024', avgTemp: 21.1, optimalRange: 21.0, energyCost: 118000 },
      ];
    } else if (selectedPeriod === 'month') {
      return [
        { period: 'Jan', avgTemp: 21.2, optimalRange: 21.0 },
        { period: 'Feb', avgTemp: 21.0, optimalRange: 21.0 },
        { period: 'Mar', avgTemp: 20.8, optimalRange: 21.0 },
        { period: 'Apr', avgTemp: 21.3, optimalRange: 21.0 },
        { period: 'May', avgTemp: 21.5, optimalRange: 21.0 },
        { period: 'Jun', avgTemp: 21.8, optimalRange: 21.0 },
        { period: 'Jul', avgTemp: 22.1, optimalRange: 21.0 },
        { period: 'Aug', avgTemp: 22.0, optimalRange: 21.0 },
        { period: 'Sep', avgTemp: 21.4, optimalRange: 21.0 },
        { period: 'Oct', avgTemp: 20.9, optimalRange: 21.0 },
        { period: 'Nov', avgTemp: 21.0, optimalRange: 21.0 },
        { period: 'Dec', avgTemp: 21.1, optimalRange: 21.0 },
      ];
    } else { // week
      return [
        { period: 'Mon', avgTemp: 21.0, optimalRange: 21.0 },
        { period: 'Tue', avgTemp: 21.2, optimalRange: 21.0 },
        { period: 'Wed', avgTemp: 21.3, optimalRange: 21.0 },
        { period: 'Thu', avgTemp: 21.1, optimalRange: 21.0 },
        { period: 'Fri', avgTemp: 20.9, optimalRange: 21.0 },
        { period: 'Sat', avgTemp: 20.7, optimalRange: 21.0 },
        { period: 'Sun', avgTemp: 20.6, optimalRange: 21.0 },
      ];
    }
  };

  const getEnergyData = () => {
    if (selectedPeriod === 'year') {
      return [
        { period: '2020', consumption: 145000, predicted: 140000, cost: 130500 },
        { period: '2021', consumption: 138000, predicted: 135000, cost: 124200 },
        { period: '2022', consumption: 132000, predicted: 130000, cost: 118800 },
        { period: '2023', consumption: 125000, predicted: 123000, cost: 112500 },
        { period: '2024', consumption: 118000, predicted: 116000, cost: 106200 },
      ];
    } else if (selectedPeriod === 'month') {
      return [
        { period: 'Jan', consumption: 12500, predicted: 12000, cost: 11250 },
        { period: 'Feb', consumption: 11800, predicted: 11500, cost: 10620 },
        { period: 'Mar', consumption: 10200, predicted: 10500, cost: 9180 },
        { period: 'Apr', consumption: 8900, predicted: 9000, cost: 8010 },
        { period: 'May', consumption: 7800, predicted: 8200, cost: 7020 },
        { period: 'Jun', consumption: 8200, predicted: 8500, cost: 7380 },
        { period: 'Jul', consumption: 9100, predicted: 9300, cost: 8190 },
        { period: 'Aug', consumption: 8800, predicted: 9000, cost: 7920 },
        { period: 'Sep', consumption: 9500, predicted: 9800, cost: 8550 },
        { period: 'Oct', consumption: 10800, predicted: 11000, cost: 9720 },
        { period: 'Nov', consumption: 11500, predicted: 11800, cost: 10350 },
        { period: 'Dec', consumption: 12100, predicted: 12300, cost: 10890 },
      ];
    } else { // week
      return [
        { period: 'Mon', consumption: 580, predicted: 570, cost: 522 },
        { period: 'Tue', consumption: 620, predicted: 610, cost: 558 },
        { period: 'Wed', consumption: 650, predicted: 640, cost: 585 },
        { period: 'Thu', consumption: 610, predicted: 600, cost: 549 },
        { period: 'Fri', consumption: 590, predicted: 580, cost: 531 },
        { period: 'Sat', consumption: 420, predicted: 410, cost: 378 },
        { period: 'Sun', consumption: 380, predicted: 370, cost: 342 },
      ];
    }
  };

  const getCO2Data = () => {
    if (selectedPeriod === 'year') {
      return [
        { period: '2020', morning: 480, afternoon: 640, evening: 510, limit: 600 },
        { period: '2021', morning: 470, afternoon: 620, evening: 500, limit: 600 },
        { period: '2022', morning: 450, afternoon: 600, evening: 480, limit: 600 },
        { period: '2023', morning: 430, afternoon: 580, evening: 460, limit: 600 },
        { period: '2024', morning: 420, afternoon: 560, evening: 450, limit: 600 },
      ];
    } else if (selectedPeriod === 'month') {
      return [
        { period: 'Jan', morning: 400, afternoon: 540, evening: 430, limit: 600 },
        { period: 'Feb', morning: 410, afternoon: 550, evening: 440, limit: 600 },
        { period: 'Mar', morning: 420, afternoon: 560, evening: 445, limit: 600 },
        { period: 'Apr', morning: 430, afternoon: 570, evening: 455, limit: 600 },
        { period: 'May', morning: 440, afternoon: 580, evening: 465, limit: 600 },
        { period: 'Jun', morning: 450, afternoon: 590, evening: 475, limit: 600 },
      ];
    } else { // week
      return [
        { period: 'Mon', morning: 420, afternoon: 580, evening: 450, limit: 600 },
        { period: 'Tue', morning: 430, afternoon: 590, evening: 460, limit: 600 },
        { period: 'Wed', morning: 440, afternoon: 600, evening: 470, limit: 600 },
        { period: 'Thu', morning: 435, afternoon: 595, evening: 465, limit: 600 },
        { period: 'Fri', morning: 425, afternoon: 585, evening: 455, limit: 600 },
        { period: 'Sat', morning: 380, afternoon: 490, evening: 400, limit: 600 },
        { period: 'Sun', morning: 360, afternoon: 470, evening: 390, limit: 600 },
      ];
    }
  };

  const getOccupancyData = () => {
    if (selectedPeriod === 'year') {
      return [
        { period: '2020', occupancy: 65, capacity: 100 },
        { period: '2021', occupancy: 45, capacity: 100 },
        { period: '2022', occupancy: 58, capacity: 100 },
        { period: '2023', occupancy: 72, capacity: 100 },
        { period: '2024', occupancy: 78, capacity: 100 },
      ];
    } else if (selectedPeriod === 'month') {
      return [
        { period: 'Jan', occupancy: 72, capacity: 100 },
        { period: 'Feb', occupancy: 75, capacity: 100 },
        { period: 'Mar', occupancy: 78, capacity: 100 },
        { period: 'Apr', occupancy: 80, capacity: 100 },
        { period: 'May', occupancy: 68, capacity: 100 },
        { period: 'Jun', occupancy: 45, capacity: 100 },
        { period: 'Jul', occupancy: 12, capacity: 100 },
        { period: 'Aug', occupancy: 8, capacity: 100 },
        { period: 'Sep', occupancy: 65, capacity: 100 },
        { period: 'Oct', occupancy: 82, capacity: 100 },
        { period: 'Nov', occupancy: 80, capacity: 100 },
        { period: 'Dec', occupancy: 70, capacity: 100 },
      ];
    } else { // week
      return [
        { period: 'Mon', occupancy: 78, capacity: 100 },
        { period: 'Tue', occupancy: 82, capacity: 100 },
        { period: 'Wed', occupancy: 85, capacity: 100 },
        { period: 'Thu', occupancy: 80, capacity: 100 },
        { period: 'Fri', occupancy: 72, capacity: 100 },
        { period: 'Sat', occupancy: 35, capacity: 100 },
        { period: 'Sun', occupancy: 22, capacity: 100 },
      ];
    }
  };

  // Future predictions based on period
  const getFuturePredictions = () => {
    if (selectedPeriod === 'year') {
      return {
        energy: [
          { period: '2025', predicted: 112000, optimized: 106000, savings: 6000 },
          { period: '2026', predicted: 108000, optimized: 102000, savings: 6000 },
          { period: '2027', predicted: 104000, optimized: 98000, savings: 6000 },
        ],
        occupancy: [
          { period: '2025', predicted: 82, historical: 78 },
          { period: '2026', predicted: 85, historical: 82 },
          { period: '2027', predicted: 87, historical: 85 },
        ]
      };
    } else if (selectedPeriod === 'month') {
      return {
        energy: [
          { period: 'Jan', predicted: 11400, optimized: 10800, savings: 600 },
          { period: 'Feb', predicted: 10900, optimized: 10300, savings: 600 },
          { period: 'Mar', predicted: 9800, optimized: 9300, savings: 500 },
          { period: 'Apr', predicted: 8500, optimized: 8100, savings: 400 },
          { period: 'May', predicted: 7600, optimized: 7200, savings: 400 },
          { period: 'Jun', predicted: 8000, optimized: 7600, savings: 400 },
        ],
        occupancy: [
          { period: 'Jan', predicted: 75, historical: 72 },
          { period: 'Feb', predicted: 78, historical: 75 },
          { period: 'Mar', predicted: 81, historical: 78 },
          { period: 'Apr', predicted: 83, historical: 80 },
          { period: 'May', predicted: 71, historical: 68 },
          { period: 'Jun', predicted: 48, historical: 45 },
        ]
      };
    } else { // week
      return {
        energy: [
          { period: 'Mon', predicted: 560, optimized: 530, savings: 30 },
          { period: 'Tue', predicted: 600, optimized: 570, savings: 30 },
          { period: 'Wed', predicted: 630, optimized: 600, savings: 30 },
          { period: 'Thu', predicted: 590, optimized: 560, savings: 30 },
          { period: 'Fri', predicted: 570, optimized: 540, savings: 30 },
          { period: 'Sat', predicted: 400, optimized: 380, savings: 20 },
          { period: 'Sun', predicted: 360, optimized: 340, savings: 20 },
        ],
        occupancy: [
          { period: 'Mon', predicted: 80, historical: 78 },
          { period: 'Tue', predicted: 84, historical: 82 },
          { period: 'Wed', predicted: 87, historical: 85 },
          { period: 'Thu', predicted: 82, historical: 80 },
          { period: 'Fri', predicted: 74, historical: 72 },
          { period: 'Sat', predicted: 38, historical: 35 },
          { period: 'Sun', predicted: 25, historical: 22 },
        ]
      };
    }
  };

  const predictiveMaintenanceAlerts = [
    {
      equipment: 'HVAC Unit - Main Building',
      prediction: 'Failure in 14 days',
      confidence: 87,
      recommendation: 'Schedule preventive maintenance',
      estimatedCost: '€2,500',
      potentialDowntime: '4 hours',
    },
    {
      equipment: 'Cooling System - CS Building',
      prediction: 'Performance degradation',
      confidence: 72,
      recommendation: 'Filter replacement needed',
      estimatedCost: '€450',
      potentialDowntime: '1 hour',
    },
    {
      equipment: 'Ventilation - Library',
      prediction: 'Optimal condition',
      confidence: 95,
      recommendation: 'No action required',
      estimatedCost: '€0',
      potentialDowntime: '0 hours',
    },
  ];

  const futureBookingPredictions = [
    { week: 'Week 1', classrooms: 145, library: 280, meetingRooms: 42 },
    { week: 'Week 2', classrooms: 152, library: 295, meetingRooms: 38 },
    { week: 'Week 3', classrooms: 148, library: 288, meetingRooms: 45 },
    { week: 'Week 4', classrooms: 158, library: 310, meetingRooms: 48 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Developer Credit - Top */}
      <div className="bg-white border-b px-6 py-3 text-center space-y-1 relative z-20">
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl mb-1">System Analytics</h1>
            <p className="text-sm text-indigo-100">Comprehensive facility insights</p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="space-y-3">
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-indigo-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
            <button
              onClick={() => setViewMode('historical')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-colors ${
                viewMode === 'historical'
                  ? 'bg-white text-indigo-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              📊 Historical Data
            </button>
            <button
              onClick={() => setViewMode('predictions')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-colors ${
                viewMode === 'predictions'
                  ? 'bg-white text-indigo-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              🔮 Future Predictions
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Building/Room Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm mb-3">Building & Room Analytics</h3>
          
          {/* Building Selector */}
          <div className="mb-3">
            <label className="text-xs text-gray-600 mb-2 block">Select Building</label>
            <select
              value={selectedBuilding}
              onChange={(e) => {
                setSelectedBuilding(e.target.value);
                setSelectedRoom('');
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {buildings.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
          </div>

          {/* Room Selector */}
          <div className="mb-4">
            <label className="text-xs text-gray-600 mb-2 block">Select Room (Optional)</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Rooms</option>
              {roomsByBuilding[selectedBuilding]?.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Location Info */}
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-xs text-indigo-700">
              <strong>Viewing analytics for:</strong> {selectedBuilding}
              {selectedRoom && ` → ${selectedRoom}`}
            </p>
          </div>
        </div>

        {/* Current Incidents */}
        <div>
          <h3 className="text-sm text-gray-600 mb-3">
            Current Incidents {selectedRoom ? `in ${selectedRoom}` : `in ${selectedBuilding}`}
          </h3>
          {getFilteredIncidents().length > 0 ? (
            <div className="space-y-2">
              {getFilteredIncidents().map((incident) => (
                <div
                  key={incident.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                    incident.priority === 'high' ? 'border-red-500' :
                    incident.priority === 'medium' ? 'border-orange-500' :
                    'border-yellow-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(incident.priority)}`}>
                          {incident.priority}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      <h4 className="text-sm mb-1">{incident.issue}</h4>
                      <p className="text-xs text-gray-600">
                        {incident.building} • {incident.room}
                      </p>
                    </div>
                    <AlertTriangle className={`w-5 h-5 ${
                      incident.priority === 'high' ? 'text-red-600' :
                      incident.priority === 'medium' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Reported {incident.reportedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No incidents reported</p>
              <p className="text-xs text-gray-500 mt-1">All systems operating normally</p>
            </div>
          )}
        </div>

        {viewMode === 'historical' ? (
          <>
            {/* Key Insights */}
            <div>
              <h3 className="text-sm text-gray-600 mb-3">Key Performance Indicators</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="text-xs text-gray-600">Energy Savings</span>
                  </div>
                  <p className="text-2xl mb-1">€27K</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingDown className="w-3 h-3" />
                    <span>18.5% vs last year</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-blue-600" />
                    <span className="text-xs text-gray-600">Air Quality</span>
                  </div>
                  <p className="text-2xl mb-1">Good</p>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>Avg 485 ppm CO₂</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature Trends Over Years */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">Temperature Optimization</h3>
                  <p className="text-xs text-gray-500">Historical trends & cost savings</p>
                </div>
                <ThermometerSun className="w-5 h-5 text-orange-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={getTemperatureData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="avgTemp"
                    stroke="#f97316"
                    strokeWidth={2}
                    name="Avg Temperature (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="optimalRange"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Optimal (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  <strong>Improvement:</strong> Average temperature reduced from 22.1°C (2020) to 21.1°C (2024).
                  Energy cost savings: €27,000 annually.
                </p>
              </div>
            </div>

            {/* Energy Consumption */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">Energy Consumption</h3>
                  <p className="text-xs text-gray-500">kWh usage & predictions</p>
                </div>
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={getEnergyData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="#eab308"
                    fill="#fef3c7"
                    name="Actual (kWh)"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    fill="#dbeafe"
                    name="Predicted (kWh)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Total Consumption</p>
                  <p className="text-lg">121.2K kWh</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Total Cost</p>
                  <p className="text-lg">€109.1K</p>
                </div>
              </div>
            </div>

            {/* CO2 Monitoring */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">CO₂ Monitoring</h3>
                  <p className="text-xs text-gray-500">Air quality by building & time</p>
                </div>
                <Wind className="w-5 h-5 text-cyan-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={getCO2Data()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="morning" fill="#10b981" name="Morning (ppm)" />
                  <Bar dataKey="afternoon" fill="#f59e0b" name="Afternoon (ppm)" />
                  <Bar dataKey="evening" fill="#3b82f6" name="Evening (ppm)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-xs text-orange-700">
                  <strong>Alert:</strong> Cafeteria exceeds 600 ppm limit during afternoon peak (750 ppm).
                  Recommendation: Increase ventilation during lunch hours.
                </p>
              </div>
            </div>

            {/* Occupancy Patterns */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">Occupancy Patterns</h3>
                  <p className="text-xs text-gray-500">Daily usage trends</p>
                </div>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={getOccupancyData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#a855f7"
                    fill="#f3e8ff"
                    name="Occupancy (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Insight:</strong> Peak occupancy at 12:00 (85%). Optimize cleaning schedule for low occupancy periods (8:00, 18:00+).
                </p>
              </div>
            </div>

            {/* Predictive Maintenance */}
            <div>
              <h3 className="text-sm text-gray-600 mb-3">Predictive Maintenance</h3>
              <div className="space-y-3">
                {predictiveMaintenanceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                      alert.confidence > 80
                        ? 'border-red-500'
                        : alert.confidence > 60
                        ? 'border-orange-500'
                        : 'border-green-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">{alert.equipment}</h4>
                        <p className="text-xs text-gray-600 mb-2">{alert.prediction}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                alert.confidence > 80 ? 'bg-red-500' :
                                alert.confidence > 60 ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${alert.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{alert.confidence}%</span>
                        </div>
                      </div>
                      {alert.confidence > 60 ? (
                        <AlertTriangle className="w-5 h-5 text-orange-600 ml-2" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-gray-500 mb-1">Cost</p>
                        <p className="text-gray-900">{alert.estimatedCost}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-gray-500 mb-1">Downtime</p>
                        <p className="text-gray-900">{alert.potentialDowntime}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded col-span-3">
                        <p className="text-gray-500 mb-1">Recommendation</p>
                        <p className="text-gray-900">{alert.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <h3 className="text-sm mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                AI-Powered Recommendations
              </h3>
              <div className="space-y-2">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs mb-1">
                    <strong>Energy Optimization:</strong>
                  </p>
                  <p className="text-xs text-gray-700">
                    Adjust HVAC schedule to reduce consumption during low occupancy periods (6-8 PM). Potential savings: €3,200/year.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs mb-1">
                    <strong>Temperature Control:</strong>
                  </p>
                  <p className="text-xs text-gray-700">
                    CS Building averages 22.1°C. Reduce by 0.5°C to save €1,800/year while maintaining comfort.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs mb-1">
                    <strong>Maintenance Priority:</strong>
                  </p>
                  <p className="text-xs text-gray-700">
                    Schedule HVAC maintenance for Main Building within 2 weeks to prevent costly failure and 4-hour downtime.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Future Energy Predictions */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">Future Energy Predictions</h3>
                  <p className="text-xs text-gray-500">Optimized consumption & savings</p>
                </div>
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={getFuturePredictions().energy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#eab308"
                    fill="#fef3c7"
                    name="Predicted (kWh)"
                  />
                  <Area
                    type="monotone"
                    dataKey="optimized"
                    stroke="#3b82f6"
                    fill="#dbeafe"
                    name="Optimized (kWh)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Total Predicted</p>
                  <p className="text-lg">70.5K kWh</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Total Savings</p>
                  <p className="text-lg">€3.3K</p>
                </div>
              </div>
            </div>

            {/* Future Booking Predictions */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">Future Booking Predictions</h3>
                  <p className="text-xs text-gray-500">Classrooms, library, meeting rooms</p>
                </div>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={futureBookingPredictions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="classrooms" fill="#10b981" name="Classrooms" />
                  <Bar dataKey="library" fill="#f59e0b" name="Library" />
                  <Bar dataKey="meetingRooms" fill="#3b82f6" name="Meeting Rooms" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Insight:</strong> Library bookings are expected to increase by 10% in the next month.
                </p>
              </div>
            </div>

            {/* Future Occupancy Trends */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm mb-1">Future Occupancy Trends</h3>
                  <p className="text-xs text-gray-500">Predicted vs historical occupancy</p>
                </div>
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={getFuturePredictions().occupancy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#f97316"
                    strokeWidth={2}
                    name="Predicted (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Historical (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  <strong>Improvement:</strong> Predicted occupancy is expected to be 5% higher than historical trends.
                </p>
              </div>
            </div>
          </>
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
    </div>
  );
}