import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, TrendingUp, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CleaningScheduleScreenProps {
  onBack: () => void;
}

interface ScheduleTask {
  id: string;
  time: string;
  location: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  occupancy: string;
  estimatedDuration: string;
  status: 'completed' | 'in-progress' | 'pending';
  sensorData: {
    currentOccupancy: number;
    predictedOccupancy: number;
    lastCleaned: string;
  };
}

export function CleaningScheduleScreen({ onBack }: CleaningScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState('2024-12-09');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ScheduleTask | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  
  const allTasksByDate: Record<string, ScheduleTask[]> = {
    '2024-12-09': [
      {
        id: '1',
        time: '08:00',
        location: 'Main Building - Floors 1-3',
        type: 'General Cleaning',
        priority: 'high',
        occupancy: 'Low (10%)',
        estimatedDuration: '90 min',
        status: 'completed',
        sensorData: {
          currentOccupancy: 10,
          predictedOccupancy: 45,
          lastCleaned: '24 hours ago',
        },
      },
      {
        id: '2',
        time: '10:00',
        location: 'Main Cafeteria',
        type: 'Deep Clean',
        priority: 'high',
        occupancy: 'Medium (35%)',
        estimatedDuration: '120 min',
        status: 'in-progress',
        sensorData: {
          currentOccupancy: 35,
          predictedOccupancy: 80,
          lastCleaned: '6 hours ago',
        },
      },
      {
        id: '3',
        time: '14:00',
        location: 'CS Building - Computer Labs',
        type: 'Lab Cleaning',
        priority: 'medium',
        occupancy: 'Low (15%)',
        estimatedDuration: '60 min',
        status: 'pending',
        sensorData: {
          currentOccupancy: 15,
          predictedOccupancy: 25,
          lastCleaned: '18 hours ago',
        },
      },
      {
        id: '4',
        time: '16:00',
        location: 'All Buildings - Restrooms',
        type: 'Restroom Supply Check',
        priority: 'high',
        occupancy: 'High (60%)',
        estimatedDuration: '45 min',
        status: 'pending',
        sensorData: {
          currentOccupancy: 60,
          predictedOccupancy: 40,
          lastCleaned: '4 hours ago',
        },
      },
      {
        id: '5',
        time: '18:00',
        location: 'Library - All Floors',
        type: 'End of Day Clean',
        priority: 'medium',
        occupancy: 'Low (20%)',
        estimatedDuration: '75 min',
        status: 'pending',
        sensorData: {
          currentOccupancy: 20,
          predictedOccupancy: 10,
          lastCleaned: '20 hours ago',
        },
      },
    ],
  };

  const handleCompleteTask = (taskId: string) => {
    const tasks = allTasksByDate[selectedDate];
    if (tasks) {
      const updatedTasks = tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed' as const }
          : task
      );
      allTasksByDate[selectedDate] = updatedTasks;
      
      const completedTask = tasks.find(t => t.id === taskId);
      toast.success('Task Completed!', {
        description: `${completedTask?.type} at ${completedTask?.location} has been marked as completed.`,
        duration: 4000,
      });
    }
  };

  const handleStartTask = (taskId: string) => {
    const tasks = allTasksByDate[selectedDate];
    if (tasks) {
      const updatedTasks = tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'in-progress' as const }
          : task
      );
      allTasksByDate[selectedDate] = updatedTasks;
      
      const startedTask = tasks.find(t => t.id === taskId);
      toast.success('Task Started!', {
        description: `${startedTask?.type} at ${startedTask?.location} has been started.`,
        duration: 3000,
      });
    }
  };

  const handleRescheduleTask = (taskId: string) => {
    const task = allTasksByDate[selectedDate]?.find(t => t.id === taskId);
    toast.info('Reschedule Request Sent', {
      description: `Request to reschedule ${task?.type} has been sent to the supervisor.`,
      duration: 3000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
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
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl mb-1">Cleaning Schedule</h1>
            <p className="text-sm text-green-100">AI-optimized based on occupancy sensors</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white flex-1 outline-none"
            />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm mb-1">AI Recommendation</h3>
              <p className="text-xs text-gray-600 mb-2">
                Schedule optimized for low occupancy periods. Cafeteria cleaning scheduled before lunch rush (11:30 AM).
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <span>Energy Savings: 15%</span>
                <span>•</span>
                <span>Efficiency: +23%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl mb-1">5</p>
            <p className="text-xs text-gray-600">Total Tasks</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl mb-1">390</p>
            <p className="text-xs text-gray-600">Est. Minutes</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <p className="text-2xl mb-1">1</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
        </div>

        {/* Schedule Tasks */}
        <h3 className="text-sm text-gray-600 mb-3">Today's Tasks</h3>
        <div className="space-y-3">
          {allTasksByDate[selectedDate]?.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                task.status === 'in-progress' ? 'border-blue-200' : 'border-transparent'
              }`}
            >
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                    {task.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityDot(task.priority)}`} />
                      <h4 className="text-sm">{task.type}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{task.location}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                  {task.status === 'completed' && 'Done'}
                  {task.status === 'in-progress' && 'Active'}
                  {task.status === 'pending' && 'Pending'}
                </span>
              </div>

              {/* Sensor Data */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                  <Users className="w-3 h-3" />
                  <span>Live Occupancy Data</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-lg text-gray-900">{task.sensorData.currentOccupancy}%</p>
                    <p className="text-xs text-gray-500">Current</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-900">{task.sensorData.predictedOccupancy}%</p>
                    <p className="text-xs text-gray-500">Predicted</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-900">{task.estimatedDuration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Last cleaned: {task.sensorData.lastCleaned}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {task.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStartTask(task.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      Start Task
                    </button>
                    <button 
                      onClick={() => handleRescheduleTask(task.id)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Reschedule
                    </button>
                  </>
                )}
                {task.status === 'in-progress' && (
                  <button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4 animate-pulse" />
                    Complete Task
                  </button>
                )}
                {task.status === 'completed' && (
                  <div className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          ))}
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