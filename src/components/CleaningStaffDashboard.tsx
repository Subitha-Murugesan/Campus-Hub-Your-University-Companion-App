import { CheckCircle, AlertCircle, Clock, MapPin, Thermometer, CreditCard, Bell, LogOut, Droplet, Wrench, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

type Screen = 'welcome' | 'cleaning-schedule' | 'classroom' | 'temperature' | 'digital-id';

interface CleaningStaffDashboardProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

interface IssueNotification {
  id: string;
  type: 'cleaning' | 'maintenance' | 'restroom';
  title: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  description: string;
}

export function CleaningStaffDashboard({ onNavigate, onLogout }: CleaningStaffDashboardProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueNotification | null>(null);
  
  const [notifications] = useState<IssueNotification[]>([
    {
      id: '1',
      type: 'cleaning',
      title: 'Spill in Cafeteria',
      location: 'Main Cafeteria, Area B',
      priority: 'high',
      time: '5 min ago',
      description: 'Liquid spill reported near table 12',
    },
    {
      id: '2',
      type: 'restroom',
      title: 'Restroom Supplies Low',
      location: 'Building CS, Floor 3',
      priority: 'medium',
      time: '15 min ago',
      description: 'Paper towels and soap need refilling',
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Broken Chair',
      location: 'Lecture Hall A-101',
      priority: 'low',
      time: '1 hour ago',
      description: 'Chair in row 5, seat 8 needs repair',
    },
  ]);

  const todaySchedule = [
    { time: '08:00', task: 'Main Building - Floors 1-3', status: 'completed', occupancy: 'Low' },
    { time: '10:00', task: 'Cafeteria Deep Clean', status: 'in-progress', occupancy: 'Medium' },
    { time: '14:00', task: 'CS Building - Labs', status: 'pending', occupancy: 'Low' },
    { time: '16:00', task: 'Restroom Supply Check', status: 'pending', occupancy: 'High' },
  ];

  const handleAcceptTask = (taskId: string, taskTitle: string) => {
    toast.success('Task Accepted!', {
      description: `You have accepted the task: ${taskTitle}. It has been added to your schedule.`,
      duration: 3000,
    });
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'cleaning':
        return Droplet;
      case 'maintenance':
        return Wrench;
      case 'restroom':
        return Trash2;
      default:
        return AlertCircle;
    }
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-teal-900/80 to-cyan-900/80" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-8 h-8" />
                <h1 className="text-2xl">FAU Facility</h1>
              </div>
              <p className="text-green-100 text-sm">Staff Portal</p>
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
              <span className="text-sm text-green-100">Good morning,</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Staff</span>
            </div>
            <h2 className="text-xl mb-1">Maria Weber</h2>
            <p className="text-sm text-green-100">Cleaning & Maintenance Team</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-12 mb-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-red-600" />
              <p className="text-2xl">{notifications.length}</p>
            </div>
            <p className="text-xs text-gray-600">New Issues</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-2xl mb-1">4</p>
            <p className="text-xs text-gray-600">Tasks Today</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-2xl mb-1">1</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
        </div>
      </div>

      {/* Issue Notifications */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-600">Active Issues</h3>
          <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
            {notifications.filter((n) => n.priority === 'high').length} Urgent
          </span>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getIssueIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl p-4 shadow-sm border ${getPriorityColor(notification.priority)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${notification.priority === 'high' ? 'bg-red-200' : 'bg-orange-200'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{notification.location}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{notification.description}</p>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-green-700 transition-colors"
                        onClick={() => handleAcceptTask(notification.id, notification.title)}
                      >
                        Accept Task
                      </button>
                      <button
                        className="px-3 py-2 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSelectedIssue(notification);
                          setShowDetailsModal(true);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-600">Today's Schedule</h3>
          <button
            onClick={() => onNavigate('cleaning-schedule')}
            className="text-xs text-green-600 hover:underline"
          >
            View Full Schedule
          </button>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          {todaySchedule.map((item, index) => (
            <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`px-2 py-1 rounded text-xs ${
                item.status === 'completed' ? 'bg-green-100 text-green-700' :
                item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {item.time}
              </div>
              <div className="flex-1">
                <p className="text-sm mb-1">{item.task}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Occupancy: {item.occupancy}</span>
                  {item.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-600" />}
                  {item.status === 'in-progress' && <Clock className="w-3 h-3 text-blue-600 animate-pulse" />}
                </div>
              </div>
              {item.status === 'pending' && (
                <button className="text-xs text-green-600 hover:underline">Start</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-24">
        <h3 className="text-sm text-gray-600 mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('classroom')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Navigation</h4>
            <p className="text-xs text-gray-500">Find buildings & rooms</p>
          </button>

          <button
            onClick={() => onNavigate('temperature')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Temperature</h4>
            <p className="text-xs text-gray-500">Vote for comfort</p>
          </button>

          <button
            onClick={() => onNavigate('digital-id')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Staff ID</h4>
            <p className="text-xs text-gray-500">Your digital card</p>
          </button>

          <button
            onClick={() => onNavigate('cleaning-schedule')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm mb-1">Schedule</h4>
            <p className="text-xs text-gray-500">View all tasks</p>
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600">Issue Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{selectedIssue.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{selectedIssue.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{selectedIssue.priority} Priority</p>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">{selectedIssue.description}</p>
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