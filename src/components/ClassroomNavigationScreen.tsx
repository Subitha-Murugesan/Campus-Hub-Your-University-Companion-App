import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Navigation, Clock, Building2, Compass, ChevronDown, ZoomIn, ZoomOut, Maximize2, ArrowUp, ArrowRight } from 'lucide-react';

interface ClassroomNavigationScreenProps {
  onBack: () => void;
}

interface Building {
  id: string;
  name: string;
  code: string;
  distance: string;
  walkTime: string;
  lat: number;
  lng: number;
}

interface Classroom {
  id: string;
  code: string;
  building: string;
  floor: number;
  capacity: number;
  distance: string;
  walkTime: string;
  x: number; // Position on map
  y: number; // Position on map
  lat: number; // GPS coordinates
  lng: number; // GPS coordinates
}

interface NavigationStep {
  instruction: string;
  distance: string;
  icon: 'straight' | 'right' | 'left';
}

export function ClassroomNavigationScreen({ onBack }: ClassroomNavigationScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('ENG');
  const [selectedFloor, setSelectedFloor] = useState(2);
  const [navigatingTo, setNavigatingTo] = useState<Classroom | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [mapView, setMapView] = useState<'floor' | 'gps'>('floor');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Simulated current location (entrance of campus)
  const currentLocation = { lat: 49.5732, lng: 11.0278 };

  const buildings: Building[] = [
    { id: '1', name: 'Engineering Building', code: 'ENG', distance: '120m', walkTime: '2 min', lat: 49.5742, lng: 11.0288 },
    { id: '2', name: 'Science Complex', code: 'SCI', distance: '230m', walkTime: '3 min', lat: 49.5752, lng: 11.0298 },
    { id: '3', name: 'Arts & Humanities', code: 'AH', distance: '180m', walkTime: '2 min', lat: 49.5738, lng: 11.0295 },
    { id: '4', name: 'Business School', code: 'BUS', distance: '310m', walkTime: '4 min', lat: 49.5745, lng: 11.0305 },
    { id: '5', name: 'Medical Sciences', code: 'MED', distance: '420m', walkTime: '6 min', lat: 49.5760, lng: 11.0315 },
  ];

  const classrooms: Classroom[] = [
    { id: '1', code: 'ENG-201', building: 'ENG', floor: 2, capacity: 50, distance: '120m', walkTime: '2 min', x: 20, y: 20, lat: 49.5742, lng: 11.0288 },
    { id: '2', code: 'ENG-202', building: 'ENG', floor: 2, capacity: 45, distance: '120m', walkTime: '2 min', x: 60, y: 20, lat: 49.5742, lng: 11.0288 },
    { id: '3', code: 'ENG-203', building: 'ENG', floor: 2, capacity: 80, distance: '120m', walkTime: '2 min', x: 20, y: 60, lat: 49.5742, lng: 11.0288 },
    { id: '4', code: 'ENG-204', building: 'ENG', floor: 2, capacity: 60, distance: '120m', walkTime: '2 min', x: 60, y: 60, lat: 49.5742, lng: 11.0288 },
    { id: '5', code: 'ENG-301', building: 'ENG', floor: 3, capacity: 50, distance: '120m', walkTime: '2 min', x: 15, y: 25, lat: 49.5742, lng: 11.0288 },
    { id: '6', code: 'ENG-302', building: 'ENG', floor: 3, capacity: 70, distance: '120m', walkTime: '2 min', x: 55, y: 25, lat: 49.5742, lng: 11.0288 },
    { id: '7', code: 'ENG-303', building: 'ENG', floor: 3, capacity: 90, distance: '120m', walkTime: '2 min', x: 35, y: 55, lat: 49.5742, lng: 11.0288 },
    { id: '8', code: 'SCI-101', building: 'SCI', floor: 1, capacity: 120, distance: '230m', walkTime: '3 min', x: 25, y: 30, lat: 49.5752, lng: 11.0298 },
    { id: '9', code: 'SCI-102', building: 'SCI', floor: 1, capacity: 100, distance: '230m', walkTime: '3 min', x: 65, y: 30, lat: 49.5752, lng: 11.0298 },
    { id: '10', code: 'SCI-204', building: 'SCI', floor: 2, capacity: 60, distance: '230m', walkTime: '3 min', x: 30, y: 50, lat: 49.5752, lng: 11.0298 },
    { id: '11', code: 'AH-150', building: 'AH', floor: 1, capacity: 40, distance: '180m', walkTime: '2 min', x: 40, y: 40, lat: 49.5738, lng: 11.0295 },
    { id: '12', code: 'BUS-320', building: 'BUS', floor: 3, capacity: 100, distance: '310m', walkTime: '4 min', x: 45, y: 35, lat: 49.5745, lng: 11.0305 },
  ];

  const navigationSteps: NavigationStep[] = [
    { instruction: 'Head north on Campus Main Street', distance: '50m', icon: 'straight' },
    { instruction: 'Turn right onto Engineering Way', distance: '40m', icon: 'right' },
    { instruction: 'Enter Engineering Building on your left', distance: '30m', icon: 'left' },
  ];

  const floors = [1, 2, 3, 4, 5];

  const filteredClassrooms = classrooms.filter(
    (classroom) =>
      (classroom.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classroom.building.toLowerCase().includes(searchQuery.toLowerCase())) &&
      classroom.building === selectedBuilding &&
      classroom.floor === selectedFloor
  );

  const handleNavigate = (classroom: Classroom) => {
    setNavigatingTo(classroom);
    setMapView('gps');
  };

  const stopNavigation = () => {
    setNavigatingTo(null);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Convert GPS coordinates to SVG coordinates for campus map
  const latLngToXY = (lat: number, lng: number) => {
    const minLat = 49.5730;
    const maxLat = 49.5765;
    const minLng = 11.0275;
    const maxLng = 11.0320;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    
    return { x, y };
  };

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
      <div className="bg-purple-600 p-6 pb-4">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4 text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Find Classrooms</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search classroom or building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm"
          />
        </div>
      </div>

      {/* Navigation Active Banner */}
      {navigatingTo && (
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 animate-pulse" />
              <div>
                <div className="text-sm opacity-90">Navigating to</div>
                <div>{navigatingTo.code} • {navigatingTo.walkTime} walk</div>
              </div>
            </div>
            <button
              onClick={stopNavigation}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Access: Next Class */}
        <div className="p-6 pb-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-start gap-3 mb-3">
              <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">Next Class</h3>
                <div className="text-sm text-gray-600">Computer Science 301</div>
                <div className="text-sm text-gray-600">11:00 AM - ENG-202</div>
              </div>
            </div>
            <button
              onClick={() => handleNavigate(classrooms[1])}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Navigate Now
            </button>
          </div>
        </div>

        {/* Map View Toggle */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMap(true)}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                showMap
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setShowMap(false)}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                !showMap
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {showMap ? (
          <>
            {/* Map Type Selector */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMapView('gps')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-colors text-sm ${
                    mapView === 'gps'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  GPS Campus Map
                </button>
                <button
                  onClick={() => setMapView('floor')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-colors text-sm ${
                    mapView === 'floor'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Floor Plan
                </button>
              </div>
            </div>

            {mapView === 'gps' ? (
              /* GPS Campus Map View */
              <div className="px-6 pb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Map Header */}
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          FAU Campus Navigation
                        </h3>
                        <p className="text-sm text-gray-600">
                          {navigatingTo ? `To ${navigatingTo.code}` : 'Select a destination'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-sm text-gray-900">
                          {navigatingTo ? navigatingTo.distance : '---'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {navigatingTo ? navigatingTo.walkTime : '---'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GPS Map Canvas */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-300"
                      style={{ transform: `scale(${zoomLevel})` }}
                    >
                      {/* Map background - simulated satellite view */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50" />
                      
                      {/* Campus roads */}
                      <svg className="absolute inset-0 w-full h-full">
                        {/* Main campus road - vertical */}
                        <path
                          d="M 50 0 L 50 100"
                          stroke="#9ca3af"
                          strokeWidth="8"
                          fill="none"
                        />
                        {/* Horizontal roads */}
                        <path
                          d="M 0 25 L 100 25"
                          stroke="#9ca3af"
                          strokeWidth="6"
                          fill="none"
                        />
                        <path
                          d="M 0 50 L 100 50"
                          stroke="#9ca3af"
                          strokeWidth="6"
                          fill="none"
                        />
                        <path
                          d="M 0 75 L 100 75"
                          stroke="#9ca3af"
                          strokeWidth="6"
                          fill="none"
                        />
                        
                        {/* Road markings */}
                        <path
                          d="M 50 5 L 50 20 M 50 30 L 50 45 M 50 55 L 50 70 M 50 80 L 50 95"
                          stroke="white"
                          strokeWidth="1"
                          strokeDasharray="3,3"
                        />
                      </svg>

                      {/* Campus buildings */}
                      {buildings.map((building) => {
                        const pos = latLngToXY(building.lat, building.lng);
                        const isDestination = navigatingTo && 
                          classrooms.find(c => c.id === navigatingTo.id)?.building === building.code;
                        
                        return (
                          <div
                            key={building.id}
                            className={`absolute transition-all ${
                              isDestination 
                                ? 'z-20' 
                                : 'z-10'
                            }`}
                            style={{
                              left: `${pos.x}%`,
                              top: `${pos.y}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <div
                              className={`w-16 h-16 rounded-lg shadow-lg transition-all ${
                                isDestination
                                  ? 'bg-blue-600 ring-4 ring-blue-300 scale-110'
                                  : 'bg-purple-600 hover:scale-105'
                              }`}
                            >
                              <div className="w-full h-full flex flex-col items-center justify-center text-white text-xs">
                                <Building2 className="w-6 h-6 mb-1" />
                                <span>{building.code}</span>
                              </div>
                            </div>
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                              <div className="bg-white px-2 py-1 rounded shadow-sm text-xs text-gray-700">
                                {building.code}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Current location marker */}
                      {(() => {
                        const pos = latLngToXY(currentLocation.lat, currentLocation.lng);
                        return (
                          <div
                            className="absolute z-30"
                            style={{
                              left: `${pos.x}%`,
                              top: `${pos.y}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <div className="relative">
                              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
                              <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
                            </div>
                          </div>
                        );
                      })()}

                      {/* Navigation route */}
                      {navigatingTo && (() => {
                        const startPos = latLngToXY(currentLocation.lat, currentLocation.lng);
                        const destBuilding = buildings.find(b => b.code === navigatingTo.building);
                        if (!destBuilding) return null;
                        const endPos = latLngToXY(destBuilding.lat, destBuilding.lng);
                        
                        // Calculate waypoints for more realistic routing
                        const waypoint1 = { x: startPos.x, y: (startPos.y + endPos.y) / 2 };
                        const waypoint2 = { x: endPos.x, y: (startPos.y + endPos.y) / 2 };
                        
                        return (
                          <>
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
                              <defs>
                                <marker
                                  id="arrowhead"
                                  markerWidth="10"
                                  markerHeight="10"
                                  refX="9"
                                  refY="3"
                                  orient="auto"
                                >
                                  <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                                </marker>
                              </defs>
                              {/* Background route (thicker, darker) */}
                              <path
                                d={`M ${startPos.x}% ${startPos.y}% L ${waypoint1.x}% ${waypoint1.y}% L ${waypoint2.x}% ${waypoint2.y}% L ${endPos.x}% ${endPos.y}%`}
                                stroke="#1e40af"
                                strokeWidth="6"
                                fill="none"
                                opacity="0.4"
                              />
                              {/* Main route */}
                              <path
                                d={`M ${startPos.x}% ${startPos.y}% L ${waypoint1.x}% ${waypoint1.y}% L ${waypoint2.x}% ${waypoint2.y}% L ${endPos.x}% ${endPos.y}%`}
                                stroke="#3b82f6"
                                strokeWidth="4"
                                fill="none"
                                markerEnd="url(#arrowhead)"
                                className="drop-shadow-lg"
                              />
                              {/* Animated route overlay */}
                              <path
                                d={`M ${startPos.x}% ${startPos.y}% L ${waypoint1.x}% ${waypoint1.y}% L ${waypoint2.x}% ${waypoint2.y}% L ${endPos.x}% ${endPos.y}%`}
                                stroke="#60a5fa"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="15,10"
                                className="animate-pulse"
                              />
                            </svg>
                            
                            {/* Waypoint markers */}
                            <div
                              className="absolute z-25"
                              style={{
                                left: `${waypoint1.x}%`,
                                top: `${waypoint1.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg" />
                            </div>
                            <div
                              className="absolute z-25"
                              style={{
                                left: `${waypoint2.x}%`,
                                top: `${waypoint2.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg" />
                            </div>
                            
                            {/* Distance labels on route */}
                            <div
                              className="absolute z-25"
                              style={{
                                left: `${(startPos.x + waypoint1.x) / 2}%`,
                                top: `${(startPos.y + waypoint1.y) / 2}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs shadow-lg">
                                50m
                              </div>
                            </div>
                          </>
                        );
                      })()}

                      {/* Campus labels */}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                        <p className="text-xs text-gray-700">FAU Erlangen-Nürnberg</p>
                      </div>
                    </div>

                    {/* Zoom controls */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-40">
                      <button
                        onClick={handleZoomIn}
                        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <ZoomIn className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={handleZoomOut}
                        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <ZoomOut className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={handleResetZoom}
                        className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Maximize2 className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>

                    {/* Current location button */}
                    <div className="absolute bottom-4 left-4 z-40">
                      <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      </button>
                    </div>
                  </div>

                  {/* Turn-by-turn directions */}
                  {navigatingTo && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <h4 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-600" />
                        Turn-by-turn Directions
                      </h4>
                      <div className="space-y-2">
                        {navigationSteps.map((step, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-white rounded-lg"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              {step.icon === 'straight' && <ArrowUp className="w-4 h-4 text-blue-600" />}
                              {step.icon === 'right' && <ArrowRight className="w-4 h-4 text-blue-600" />}
                              {step.icon === 'left' && <ArrowRight className="w-4 h-4 text-blue-600 transform scale-x-[-1]" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{step.instruction}</p>
                              <p className="text-xs text-gray-500">{step.distance}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Map legend */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span>Your Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded" />
                        <span>Destination</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-600 rounded" />
                        <span>Buildings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-blue-500" />
                        <span>Walking Route</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Floor Plan View */
              <>
                {/* Building and Floor Selection */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Building Dropdown */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Building</label>
                      <div className="relative">
                        <select
                          value={selectedBuilding}
                          onChange={(e) => setSelectedBuilding(e.target.value)}
                          className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {buildings.map((building) => (
                            <option key={building.id} value={building.code}>
                              {building.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Floor Dropdown */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Floor</label>
                      <div className="relative">
                        <select
                          value={selectedFloor}
                          onChange={(e) => setSelectedFloor(Number(e.target.value))}
                          className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {floors.map((floor) => (
                            <option key={floor} value={floor}>
                              Floor {floor}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="px-6 pb-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-gray-900">Floor Plan</h3>
                        <p className="text-sm text-gray-600">
                          {selectedBuilding} - Floor {selectedFloor}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-3 h-3 bg-purple-600 rounded" />
                        <span>Classroom</span>
                      </div>
                    </div>

                    {/* Map Canvas */}
                    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                      {/* Grid lines */}
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>

                      {/* Corridors */}
                      <div className="absolute top-1/2 left-0 right-0 h-12 bg-white/80 transform -translate-y-1/2 border-y-2 border-gray-300" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-12 bg-white/80 transform -translate-x-1/2 border-x-2 border-gray-300" />

                      {/* Entrance marker */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="px-3 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Entrance
                        </div>
                      </div>

                      {/* Stairs/Elevator */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-gray-400 rounded flex items-center justify-center text-white text-xs">
                        Stairs
                      </div>
                      <div className="absolute top-20 right-4 w-12 h-12 bg-gray-500 rounded flex items-center justify-center text-white text-xs">
                        Lift
                      </div>

                      {/* Classrooms */}
                      {filteredClassrooms.map((classroom) => (
                        <button
                          key={classroom.id}
                          onClick={() => handleNavigate(classroom)}
                          className={`absolute w-16 h-16 rounded-lg flex flex-col items-center justify-center text-xs transition-all hover:scale-110 ${
                            navigatingTo?.id === classroom.id
                              ? 'bg-blue-500 text-white ring-4 ring-blue-300 z-10'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                          style={{
                            left: `${classroom.x}%`,
                            top: `${classroom.y}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          title={`${classroom.code} - Capacity: ${classroom.capacity}`}
                        >
                          <Building2 className="w-4 h-4 mb-1" />
                          <span className="font-medium">{classroom.code.split('-')[1]}</span>
                        </button>
                      ))}

                      {/* Navigation Path */}
                      {navigatingTo && (() => {
                        // Calculate path from entrance to classroom
                        const entranceX = 50;
                        const entranceY = 95;
                        const classX = parseFloat(navigatingTo.x.toString());
                        const classY = parseFloat(navigatingTo.y.toString());
                        
                        // Create waypoints through corridors
                        const waypoint1 = { x: 50, y: 50 }; // Center intersection
                        const waypoint2 = { x: classX, y: 50 }; // Along horizontal corridor
                        
                        return (
                          <>
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                              <defs>
                                <marker
                                  id="arrowhead-floor"
                                  markerWidth="8"
                                  markerHeight="8"
                                  refX="7"
                                  refY="3"
                                  orient="auto"
                                >
                                  <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
                                </marker>
                              </defs>
                              
                              {/* Background route shadow */}
                              <path
                                d={`M ${entranceX}% ${entranceY}% L ${waypoint1.x}% ${waypoint1.y}% L ${waypoint2.x}% ${waypoint2.y}% L ${classX}% ${classY}%`}
                                stroke="#1e40af"
                                strokeWidth="5"
                                fill="none"
                                opacity="0.3"
                              />
                              
                              {/* Main route */}
                              <path
                                d={`M ${entranceX}% ${entranceY}% L ${waypoint1.x}% ${waypoint1.y}% L ${waypoint2.x}% ${waypoint2.y}% L ${classX}% ${classY}%`}
                                stroke="#3b82f6"
                                strokeWidth="3"
                                fill="none"
                                markerEnd="url(#arrowhead-floor)"
                              />
                              
                              {/* Animated route overlay */}
                              <path
                                d={`M ${entranceX}% ${entranceY}% L ${waypoint1.x}% ${waypoint1.y}% L ${waypoint2.x}% ${waypoint2.y}% L ${classX}% ${classY}%`}
                                stroke="#60a5fa"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="10,8"
                              >
                                <animate
                                  attributeName="stroke-dashoffset"
                                  from="0"
                                  to="18"
                                  dur="1s"
                                  repeatCount="indefinite"
                                />
                              </path>
                            </svg>
                            
                            {/* Waypoint indicators */}
                            <div
                              className="absolute z-25 pointer-events-none"
                              style={{
                                left: `${waypoint1.x}%`,
                                top: `${waypoint1.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-white shadow-md" />
                            </div>
                            <div
                              className="absolute z-25 pointer-events-none"
                              style={{
                                left: `${waypoint2.x}%`,
                                top: `${waypoint2.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-white shadow-md" />
                            </div>
                            
                            {/* Distance markers */}
                            <div
                              className="absolute z-25 pointer-events-none"
                              style={{
                                left: `${(entranceX + waypoint1.x) / 2}%`,
                                top: `${(entranceY + waypoint1.y) / 2}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs shadow-lg whitespace-nowrap">
                                15m
                              </div>
                            </div>
                            <div
                              className="absolute z-25 pointer-events-none"
                              style={{
                                left: `${(waypoint2.x + classX) / 2}%`,
                                top: `${(waypoint2.y + classY) / 2}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs shadow-lg whitespace-nowrap">
                                8m
                              </div>
                            </div>
                            
                            {/* Navigation instruction overlay */}
                            <div className="absolute top-3 left-3 right-3 z-25 pointer-events-none">
                              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                                <Navigation className="w-4 h-4 animate-pulse" />
                                <div className="text-xs">
                                  <div className="opacity-90">Route to {navigatingTo.code}</div>
                                  <div className="text-blue-100">Follow blue path</div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span>Your Location</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span>Destination</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-0.5 bg-blue-500" />
                          <span>Route</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded" />
                          <span>Facilities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          /* List View */
          <div className="px-6 pb-6">
            <h3 className="mb-4 text-gray-800">
              {searchQuery ? 'Search Results' : 'All Classrooms'}
            </h3>
            <div className="space-y-3">
              {filteredClassrooms.map((classroom) => (
                <div
                  key={classroom.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-gray-900 mb-1">{classroom.code}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {buildings.find(b => b.code === classroom.building)?.name}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          <span>Floor {classroom.floor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{classroom.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{classroom.walkTime}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavigate(classroom)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Compass className="w-4 h-4" />
                      Navigate
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredClassrooms.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No classrooms found on this floor</p>
              </div>
            )}
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
    </div>
  );
}