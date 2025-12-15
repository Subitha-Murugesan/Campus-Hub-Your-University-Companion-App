import { BarChart3, TrendingUp, Zap, Wind, AlertTriangle, Settings, LogOut, Activity, ThermometerSun } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Screen = 'welcome' | 'admin-analytics' | 'digital-id' | 'sensors';

interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const alerts = [
    { id: 1, type: 'warning', message: 'HVAC System efficiency dropped 12% in Building CS', priority: 'high' },
    { id: 2, type: 'info', message: 'Predicted maintenance due for Library AC in 2 weeks', priority: 'medium' },
    { id: 3, type: 'success', message: 'Energy consumption reduced by 8% this month', priority: 'low' },
  ];

  const buildingStatus = [
    { name: 'Main', energy: 85, temp: 21.5, co2: 410, occupancy: 72, status: 'optimal' },
    { name: 'Science', energy: 88, temp: 21.8, co2: 450, occupancy: 68, status: 'optimal' },
    { name: 'Engineering', energy: 92, temp: 22.1, co2: 580, occupancy: 45, status: 'warning' },
    { name: 'Business', energy: 82, temp: 21.2, co2: 420, occupancy: 58, status: 'optimal' },
    { name: 'Cafeteria', energy: 95, temp: 23.2, co2: 650, occupancy: 65, status: 'alert' },
    { name: 'Arts & Humanities', energy: 80, temp: 21.0, co2: 400, occupancy: 52, status: 'optimal' },
    { name: 'Library', energy: 78, temp: 20.8, co2: 390, occupancy: 88, status: 'optimal' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'alert':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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

      {/* Header with University Building Image */}
      <div className="relative text-white px-6 pt-12 pb-20">
        {/* Background Image */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684710087097-4b87480ad8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1MjcxMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="University Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-violet-900/80" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-8 h-8" />
                <h1 className="text-2xl">FAU Admin</h1>
              </div>
              <p className="text-indigo-100 text-sm">System Analytics & Control</p>
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
              <span className="text-sm text-indigo-100">System Administrator</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Admin</span>
            </div>
            <h2 className="text-xl mb-1">Dr. Thomas Müller</h2>
            <p className="text-sm text-indigo-100">Facility Management Department</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="px-6 -mt-12 mb-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-white">System Alerts</h3>
          <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            {alerts.filter((a) => a.priority === 'high').length} High Priority
          </span>
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-xl p-3 shadow-sm border-l-4 ${
                alert.priority === 'high' ? 'border-red-500' :
                alert.priority === 'medium' ? 'border-orange-500' :
                'border-green-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                  alert.priority === 'high' ? 'text-red-600' :
                  alert.priority === 'medium' ? 'text-orange-600' :
                  'text-green-600'
                }`} />
                <p className="text-xs text-gray-700 flex-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Building Status */}
      <div className="px-6 mb-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-600">Building Performance</h3>
          <button
            onClick={() => onNavigate('admin-analytics')}
            className="text-xs text-indigo-600 hover:underline"
          >
            View Analytics
          </button>
        </div>
        <div className="space-y-3">
          {buildingStatus.map((building, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm">{building.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(building.status)}`}>
                  {building.status}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Energy</p>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          building.energy > 90 ? 'bg-red-500' :
                          building.energy > 80 ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${building.energy}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{building.energy}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Temp</p>
                  <p className="text-sm">{building.temp}°C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">CO₂</p>
                  <p className={`text-sm ${
                    building.co2 > 600 ? 'text-red-600' :
                    building.co2 > 500 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {building.co2}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Occ.</p>
                  <p className="text-sm">{building.occupancy}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-24 relative z-10">
        <h3 className="text-sm text-gray-600 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('admin-analytics')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Analytics</h4>
            <p className="text-xs text-gray-500">Detailed insights & trends</p>
          </button>

          <button
            onClick={() => onNavigate('sensors')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-3">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Sensor Network</h4>
            <p className="text-xs text-gray-500">Monitor infrastructure</p>
          </button>

          <button
            onClick={() => onNavigate('digital-id')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Admin ID</h4>
            <p className="text-xs text-gray-500">Access credentials</p>
          </button>
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