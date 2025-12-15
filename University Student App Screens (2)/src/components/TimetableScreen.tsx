import { ArrowLeft, Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

interface TimetableScreenProps {
  onBack: () => void;
}

interface ClassSession {
  id: string;
  subject: string;
  type: 'Lecture' | 'Tutorial' | 'Lab' | 'Seminar';
  time: string;
  endTime: string;
  room: string;
  instructor: string;
  color: string;
}

interface DaySchedule {
  day: string;
  date: string;
  classes: ClassSession[];
}

export function TimetableScreen({ onBack }: TimetableScreenProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  const weekSchedule: DaySchedule[] = [
    {
      day: 'Monday',
      date: 'Dec 8',
      classes: [
        {
          id: '1',
          subject: 'Data Structures',
          type: 'Lecture',
          time: '08:30',
          endTime: '10:00',
          room: 'H11',
          instructor: 'Prof. Schmidt',
          color: 'bg-blue-500',
        },
        {
          id: '2',
          subject: 'Software Engineering',
          type: 'Tutorial',
          time: '10:15',
          endTime: '11:45',
          room: 'S23',
          instructor: 'Dr. Weber',
          color: 'bg-green-500',
        },
        {
          id: '3',
          subject: 'Database Systems',
          type: 'Lecture',
          time: '14:00',
          endTime: '15:30',
          room: 'H8',
          instructor: 'Prof. Müller',
          color: 'bg-purple-500',
        },
      ],
    },
    {
      day: 'Tuesday',
      date: 'Dec 9',
      classes: [
        {
          id: '4',
          subject: 'Algorithms',
          type: 'Lecture',
          time: '09:00',
          endTime: '10:30',
          room: 'H12',
          instructor: 'Prof. Fischer',
          color: 'bg-orange-500',
        },
        {
          id: '5',
          subject: 'Computer Networks',
          type: 'Lab',
          time: '12:00',
          endTime: '14:00',
          room: 'Lab 3',
          instructor: 'Dr. Klein',
          color: 'bg-red-500',
        },
      ],
    },
    {
      day: 'Wednesday',
      date: 'Dec 10',
      classes: [
        {
          id: '6',
          subject: 'Data Structures',
          type: 'Tutorial',
          time: '08:30',
          endTime: '10:00',
          room: 'S15',
          instructor: 'M.Sc. Wagner',
          color: 'bg-blue-500',
        },
        {
          id: '7',
          subject: 'Operating Systems',
          type: 'Lecture',
          time: '10:15',
          endTime: '11:45',
          room: 'H9',
          instructor: 'Prof. Becker',
          color: 'bg-indigo-500',
        },
        {
          id: '8',
          subject: 'Algorithms',
          type: 'Tutorial',
          time: '14:00',
          endTime: '15:30',
          room: 'S18',
          instructor: 'M.Sc. Hoffmann',
          color: 'bg-orange-500',
        },
      ],
    },
    {
      day: 'Thursday',
      date: 'Dec 11',
      classes: [
        {
          id: '9',
          subject: 'Software Engineering',
          type: 'Lecture',
          time: '08:30',
          endTime: '10:00',
          room: 'H11',
          instructor: 'Dr. Weber',
          color: 'bg-green-500',
        },
        {
          id: '10',
          subject: 'Database Systems',
          type: 'Lab',
          time: '12:00',
          endTime: '14:00',
          room: 'Lab 2',
          instructor: 'M.Sc. Schulz',
          color: 'bg-purple-500',
        },
      ],
    },
    {
      day: 'Friday',
      date: 'Dec 12',
      classes: [
        {
          id: '11',
          subject: 'Operating Systems',
          type: 'Tutorial',
          time: '09:00',
          endTime: '10:30',
          room: 'S20',
          instructor: 'M.Sc. Koch',
          color: 'bg-indigo-500',
        },
        {
          id: '12',
          subject: 'Seminar: AI Ethics',
          type: 'Seminar',
          time: '13:00',
          endTime: '14:30',
          room: 'S5',
          instructor: 'Prof. Zimmermann',
          color: 'bg-pink-500',
        },
      ],
    },
  ];

  const currentDaySchedule = weekSchedule[selectedDay];

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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="mb-1">My Timetable</h1>
            <p className="text-white/90">Winter Semester 2024/25</p>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {weekSchedule.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
                selectedDay === index
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <div className="text-xs opacity-80">{day.date}</div>
              <div className="font-medium">{day.day.substring(0, 3)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Classes List */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {currentDaySchedule.classes.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No classes scheduled for this day</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentDaySchedule.classes.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`h-1.5 ${classItem.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{classItem.subject}</h3>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {classItem.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {classItem.time} - {classItem.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Room {classItem.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{classItem.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Summary */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-gray-500 text-xs mb-1">Total Classes</div>
            <div className="text-gray-900">
              {weekSchedule.reduce((acc, day) => acc + day.classes.length, 0)}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">This Week</div>
            <div className="text-gray-900">15 Hours</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Next Class</div>
            <div className="text-gray-900 text-sm">Mon 08:30</div>
          </div>
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
