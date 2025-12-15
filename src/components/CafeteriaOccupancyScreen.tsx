import { useState, useEffect } from 'react';
import { ArrowLeft, Users, TrendingUp, TrendingDown, Clock, Coffee } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CafeteriaOccupancyScreenProps {
  onBack: () => void;
}

interface CafeteriaData {
  name: string;
  currentOccupancy: number;
  capacity: number;
  waitTime: string;
  trend: 'up' | 'down' | 'stable';
}

export function CafeteriaOccupancyScreen({ onBack }: CafeteriaOccupancyScreenProps) {
  const [cafeterias, setCafeterias] = useState<CafeteriaData[]>([
    {
      name: 'Main Dining Hall',
      currentOccupancy: 245,
      capacity: 400,
      waitTime: '5 min',
      trend: 'up',
    },
    {
      name: 'Student Union Café',
      currentOccupancy: 67,
      capacity: 150,
      waitTime: '2 min',
      trend: 'down',
    },
    {
      name: 'Science Building Café',
      currentOccupancy: 32,
      capacity: 80,
      waitTime: '< 1 min',
      trend: 'stable',
    },
    {
      name: 'Library Coffee Shop',
      currentOccupancy: 89,
      capacity: 100,
      waitTime: '8 min',
      trend: 'up',
    },
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate real-time updates
      setCafeterias((prev) =>
        prev.map((cafe) => ({
          ...cafe,
          currentOccupancy: Math.max(
            0,
            Math.min(
              cafe.capacity,
              cafe.currentOccupancy + Math.floor(Math.random() * 10 - 5)
            )
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getOccupancyLevel = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage < 40) return { label: 'Low', color: 'bg-green-500', textColor: 'text-green-700' };
    if (percentage < 70) return { label: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { label: 'High', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
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
      <div className="relative h-32 bg-green-600 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1685879226944-30c32b186aa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FmZXRlcmlhfGVufDF8fHx8MTc2NDM0NDA2OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cafeteria"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 p-6 flex items-center">
          <button onClick={onBack} className="mr-4 text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">Cafeteria Occupancy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Status Banner */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-700">Live Updates</span>
            </div>
            <span className="text-sm text-gray-500">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Peak Hours Info */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 border border-orange-100">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-gray-900 mb-1">Peak Hours</h3>
              <p className="text-sm text-gray-600">
                Most cafeterias are busiest between 12:00 PM - 1:30 PM
              </p>
            </div>
          </div>
        </div>

        {/* Cafeteria List */}
        <div className="space-y-4">
          <h3 className="text-gray-800">All Locations</h3>
          {cafeterias.map((cafe, index) => {
            const level = getOccupancyLevel(cafe.currentOccupancy, cafe.capacity);
            const percentage = getOccupancyPercentage(cafe.currentOccupancy, cafe.capacity);

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Coffee className="w-5 h-5 text-gray-400" />
                      <h3 className="text-gray-900">{cafe.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-2 py-1 rounded ${level.color} bg-opacity-20 ${level.textColor}`}>
                        {level.label}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        {cafe.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                        {cafe.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                        {cafe.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-400" />}
                        <span className="capitalize">{cafe.trend}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900">{percentage}%</div>
                    <div className="text-sm text-gray-500">Full</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${level.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {cafe.currentOccupancy} / {cafe.capacity} people
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Wait: {cafe.waitTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h3 className="text-gray-900 mb-2">💡 Tip</h3>
          <p className="text-sm text-gray-600">
            Visit cafeterias during off-peak hours (10:00 AM - 11:30 AM or 2:00 PM - 4:00 PM) for shorter wait times.
          </p>
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
