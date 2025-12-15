import { ArrowLeft, Thermometer, Wind, Users, Eye, Camera, Wifi, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SensorOverviewScreenProps {
  onBack: () => void;
}

interface Sensor {
  id: string;
  type: 'temperature' | 'co2' | 'occupancy-desk' | 'heat-camera-cafeteria' | 'heat-camera-hallway';
  location: string;
  building: string;
  status: 'online' | 'offline' | 'warning';
  lastReading: string;
  value?: string;
}

export function SensorOverviewScreen({ onBack }: SensorOverviewScreenProps) {
  const sensors: Sensor[] = [
    // Library desk occupancy sensors
    { id: 'L-D-001', type: 'occupancy-desk', location: 'Library - Desk A12', building: 'Library', status: 'online', lastReading: '2 min ago', value: 'Occupied' },
    { id: 'L-D-002', type: 'occupancy-desk', location: 'Library - Desk A13', building: 'Library', status: 'online', lastReading: '2 min ago', value: 'Empty' },
    { id: 'L-D-003', type: 'occupancy-desk', location: 'Library - Desk B05', building: 'Library', status: 'online', lastReading: '2 min ago', value: 'Occupied' },
    { id: 'L-D-004', type: 'occupancy-desk', location: 'Library - Desk C22', building: 'Library', status: 'warning', lastReading: '15 min ago', value: 'Unknown' },
    
    // Cafeteria heat cameras
    { id: 'CAF-H-001', type: 'heat-camera-cafeteria', location: 'Main Cafeteria - Area A', building: 'Cafeteria', status: 'online', lastReading: '1 min ago', value: '45 people' },
    { id: 'CAF-H-002', type: 'heat-camera-cafeteria', location: 'Main Cafeteria - Area B', building: 'Cafeteria', status: 'online', lastReading: '1 min ago', value: '62 people' },
    
    // Classroom thermostats
    { id: 'ENG-T-202', type: 'temperature', location: 'ENG-202', building: 'Engineering', status: 'online', lastReading: '30 sec ago', value: '21.5°C' },
    { id: 'SCI-T-101', type: 'temperature', location: 'SCI-101', building: 'Science', status: 'online', lastReading: '45 sec ago', value: '22.1°C' },
    { id: 'CS-T-301', type: 'temperature', location: 'CS-301', building: 'Computer Science', status: 'online', lastReading: '1 min ago', value: '20.8°C' },
    
    // Classroom CO2 sensors
    { id: 'ENG-C-202', type: 'co2', location: 'ENG-202', building: 'Engineering', status: 'online', lastReading: '30 sec ago', value: '520 ppm' },
    { id: 'SCI-C-101', type: 'co2', location: 'SCI-101', building: 'Science', status: 'online', lastReading: '45 sec ago', value: '680 ppm' },
    { id: 'CS-C-301', type: 'co2', location: 'CS-301', building: 'Computer Science', status: 'warning', lastReading: '5 min ago', value: '750 ppm' },
    
    // Hallway heat cameras
    { id: 'HALL-H-001', type: 'heat-camera-hallway', location: 'Main Building - Floor 1', building: 'Main', status: 'online', lastReading: '1 min ago', value: '23 people' },
    { id: 'HALL-H-002', type: 'heat-camera-hallway', location: 'Engineering - Floor 2', building: 'Engineering', status: 'online', lastReading: '1 min ago', value: '15 people' },
    { id: 'HALL-H-003', type: 'heat-camera-hallway', location: 'Science - Floor 3', building: 'Science', status: 'offline', lastReading: '2 hours ago', value: 'N/A' },
  ];

  const sensorStats = {
    total: sensors.length,
    online: sensors.filter(s => s.status === 'online').length,
    warning: sensors.filter(s => s.status === 'warning').length,
    offline: sensors.filter(s => s.status === 'offline').length,
  };

  const getSensorIcon = (type: Sensor['type']) => {
    switch (type) {
      case 'temperature':
        return Thermometer;
      case 'co2':
        return Wind;
      case 'occupancy-desk':
        return Users;
      case 'heat-camera-cafeteria':
        return Camera;
      case 'heat-camera-hallway':
        return Eye;
    }
  };

  const getSensorTypeLabel = (type: Sensor['type']) => {
    switch (type) {
      case 'temperature':
        return 'Temperature Sensor';
      case 'co2':
        return 'CO₂ Sensor';
      case 'occupancy-desk':
        return 'Desk Occupancy';
      case 'heat-camera-cafeteria':
        return 'Heat Camera (Cafeteria)';
      case 'heat-camera-hallway':
        return 'Heat Camera (Hallway)';
    }
  };

  const getStatusColor = (status: Sensor['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'offline':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusIcon = (status: Sensor['status']) => {
    switch (status) {
      case 'online':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'offline':
        return XCircle;
    }
  };

  const groupedSensors = {
    library: sensors.filter(s => s.building === 'Library'),
    cafeteria: sensors.filter(s => s.building === 'Cafeteria'),
    classrooms: sensors.filter(s => ['Engineering', 'Science', 'Computer Science'].includes(s.building)),
    hallways: sensors.filter(s => s.type === 'heat-camera-hallway'),
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl mb-1">Sensor Network</h1>
            <p className="text-sm text-indigo-100">Campus-wide monitoring infrastructure</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <Wifi className="w-5 h-5 mx-auto mb-1" />
            <p className="text-2xl">{sensorStats.total}</p>
            <p className="text-xs text-indigo-100">Total</p>
          </div>
          <div className="bg-green-500/30 backdrop-blur-sm rounded-lg p-3 text-center border border-green-300">
            <CheckCircle className="w-5 h-5 mx-auto mb-1" />
            <p className="text-2xl">{sensorStats.online}</p>
            <p className="text-xs text-green-100">Online</p>
          </div>
          <div className="bg-orange-500/30 backdrop-blur-sm rounded-lg p-3 text-center border border-orange-300">
            <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
            <p className="text-2xl">{sensorStats.warning}</p>
            <p className="text-xs text-orange-100">Warning</p>
          </div>
          <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-3 text-center border border-red-300">
            <XCircle className="w-5 h-5 mx-auto mb-1" />
            <p className="text-2xl">{sensorStats.offline}</p>
            <p className="text-xs text-red-100">Offline</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-20">
        {/* Library Desk Sensors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm text-gray-600">Library Desk Occupancy Sensors</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Technology:</strong> Pressure and infrared sensors at each desk detect occupancy in real-time.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Coverage:</strong> All {groupedSensors.library.length} study desks across 3 floors
            </p>
          </div>
          <div className="space-y-2">
            {groupedSensors.library.map((sensor) => {
              const Icon = getSensorIcon(sensor.type);
              const StatusIcon = getStatusIcon(sensor.status);
              return (
                <div key={sensor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm text-gray-900">{sensor.location}</p>
                          <p className="text-xs text-gray-500">{sensor.id}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(sensor.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {sensor.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <span>Value: <strong>{sensor.value}</strong></span>
                        <span>Updated: {sensor.lastReading}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cafeteria Heat Cameras */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-orange-600" />
            <h3 className="text-sm text-gray-600">Cafeteria Heat Cameras</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Technology:</strong> Thermal imaging cameras reconstruct occupancy from heat signatures without identifying individuals.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Privacy:</strong> No visual recording, only anonymous heat patterns for counting
            </p>
          </div>
          <div className="space-y-2">
            {groupedSensors.cafeteria.map((sensor) => {
              const Icon = getSensorIcon(sensor.type);
              const StatusIcon = getStatusIcon(sensor.status);
              return (
                <div key={sensor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm text-gray-900">{sensor.location}</p>
                          <p className="text-xs text-gray-500">{sensor.id}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(sensor.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {sensor.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <span>Count: <strong>{sensor.value}</strong></span>
                        <span>Updated: {sensor.lastReading}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Classroom Sensors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-5 h-5 text-red-600" />
            <h3 className="text-sm text-gray-600">Classroom Environmental Sensors</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Temperature:</strong> Smart thermostats measure ambient temperature for HVAC optimization
            </p>
            <p className="text-xs text-gray-600">
              <strong>Air Quality:</strong> CO₂ sensors monitor ventilation needs and ensure healthy learning environments
            </p>
          </div>
          <div className="space-y-2">
            {groupedSensors.classrooms.map((sensor) => {
              const Icon = getSensorIcon(sensor.type);
              const StatusIcon = getStatusIcon(sensor.status);
              const isTemp = sensor.type === 'temperature';
              return (
                <div key={sensor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${isTemp ? 'bg-red-100' : 'bg-cyan-100'} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${isTemp ? 'text-red-600' : 'text-cyan-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm text-gray-900">{sensor.location}</p>
                          <p className="text-xs text-gray-500">{getSensorTypeLabel(sensor.type)} • {sensor.id}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(sensor.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {sensor.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <span>Reading: <strong>{sensor.value}</strong></span>
                        <span>Updated: {sensor.lastReading}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hallway Heat Cameras */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm text-gray-600">Hallway Occupancy Cameras</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-3">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Technology:</strong> Heat cameras installed at strategic points monitor foot traffic patterns
            </p>
            <p className="text-xs text-gray-600">
              <strong>Purpose:</strong> Optimize cleaning schedules and emergency evacuation planning
            </p>
          </div>
          <div className="space-y-2">
            {groupedSensors.hallways.map((sensor) => {
              const Icon = getSensorIcon(sensor.type);
              const StatusIcon = getStatusIcon(sensor.status);
              return (
                <div key={sensor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm text-gray-900">{sensor.location}</p>
                          <p className="text-xs text-gray-500">{sensor.id}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(sensor.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {sensor.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <span>Count: <strong>{sensor.value}</strong></span>
                        <span>Updated: {sensor.lastReading}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
          <h4 className="text-gray-900 mb-3 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-indigo-600" />
            Sensor Network Benefits
          </h4>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span>
              <span><strong>Real-time Monitoring:</strong> Continuous data collection across all campus facilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span>
              <span><strong>Energy Optimization:</strong> Temperature and occupancy data drive HVAC efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span>
              <span><strong>Smart Cleaning:</strong> Occupancy patterns inform optimal maintenance schedules</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span>
              <span><strong>Health & Safety:</strong> CO₂ monitoring ensures proper ventilation standards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">•</span>
              <span><strong>Privacy-First:</strong> Heat cameras provide anonymous counting without visual recording</span>
            </li>
          </ul>
        </div>
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
