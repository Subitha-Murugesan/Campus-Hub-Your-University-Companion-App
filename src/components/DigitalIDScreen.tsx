import { useState, useEffect } from 'react';
import { ArrowLeft, Wifi, Smartphone, Shield, CheckCircle, Radio } from 'lucide-react';

interface DigitalIDScreenProps {
  onBack: () => void;
}

export function DigitalIDScreen({ onBack }: DigitalIDScreenProps) {
  const [nfcActive, setNfcActive] = useState(false);
  const [lastAccess, setLastAccess] = useState<string | null>(null);

  const studentData = {
    name: 'Max Mustermann',
    studentId: '12345678',
    program: 'Computer Science',
    semester: 'Winter 2024/25',
    validUntil: 'September 2027',
    email: 'max.mustermann@fau.de',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  };

  const recentAccess = [
    { location: 'Engineering Building - Main Entrance', time: '2 hours ago', status: 'success' },
    { location: 'Library - Study Room 3', time: '5 hours ago', status: 'success' },
    { location: 'Science Complex - Lab Wing', time: 'Yesterday', status: 'success' },
    { location: 'Cafeteria - Staff Area', time: '2 days ago', status: 'denied' },
  ];

  const toggleNFC = () => {
    setNfcActive(!nfcActive);
    if (!nfcActive) {
      // Simulate access after 2 seconds
      setTimeout(() => {
        setLastAccess('Engineering Building - Main Entrance');
        setTimeout(() => {
          setNfcActive(false);
          setLastAccess(null);
        }, 3000);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="mb-1">Digital Student ID</h1>
            <p className="text-white/90 text-sm">FAU Erlangen-Nürnberg</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 -mt-4 pb-6 overflow-y-auto">
        {/* ID Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-6 text-white mb-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Card Content */}
          <div className="relative">
            {/* University Logo */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs opacity-80 mb-1">FRIEDRICH-ALEXANDER</div>
                <div className="text-sm">UNIVERSITÄT</div>
                <div className="text-xs opacity-80">Erlangen-Nürnberg</div>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
            </div>

            {/* Student Info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-24 bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-white/30">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-2xl">{studentData.name.charAt(0)}</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-1">{studentData.name}</h2>
                <div className="space-y-0.5 text-sm opacity-90">
                  <div>ID: {studentData.studentId}</div>
                  <div>{studentData.program}</div>
                  <div>{studentData.semester}</div>
                </div>
              </div>
            </div>

            {/* Validity */}
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <div className="text-xs opacity-70 mb-1">VALID UNTIL</div>
                <div className="text-sm">{studentData.validUntil}</div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs">Active</span>
              </div>
            </div>

            {/* NFC Indicator */}
            <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center">
              <Radio className={`w-6 h-6 ${nfcActive ? 'animate-pulse' : 'opacity-50'}`} />
            </div>
          </div>
        </div>

        {/* NFC Access Control */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Wifi className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">NFC Door Access</h3>
              <p className="text-sm text-gray-600">Tap to activate</p>
            </div>
            <button
              onClick={toggleNFC}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                nfcActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  nfcActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {nfcActive && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 animate-in fade-in slide-in-from-top">
              {lastAccess ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-green-900">Access Granted</div>
                    <div className="text-sm text-green-700">{lastAccess}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-900">NFC Active</div>
                    <div className="text-sm text-blue-700">Hold phone near door reader</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!nfcActive && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    Enable NFC to unlock doors across campus using your phone
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• Building entrances</li>
                    <li>• Study rooms</li>
                    <li>• Lab facilities</li>
                    <li>• Library access gates</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Access History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Recent Access History</h3>
          <div className="space-y-3">
            {recentAccess.map((access, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    access.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{access.location}</div>
                  <div className="text-xs text-gray-500">{access.time}</div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    access.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {access.status === 'success' ? 'Granted' : 'Denied'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-900">
              <p className="mb-1">Security Notice</p>
              <p className="text-xs text-yellow-800">
                Your digital ID is protected by your device security. Never share your login
                credentials or allow unauthorized access to your phone.
              </p>
            </div>
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
