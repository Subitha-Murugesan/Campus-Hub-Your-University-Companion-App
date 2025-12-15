import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap, User, ArrowLeft, BookOpen, Users, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { UserType } from './LoginScreen';

interface SignupScreenProps {
  onSignup: (userType: UserType) => void;
  onBackToLogin: () => void;
}

export function SignupScreen({ onSignup, onBackToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [userType, setUserType] = useState<UserType>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userTypes = [
    { type: 'student' as UserType, icon: GraduationCap, label: 'Student' },
    { type: 'lecturer' as UserType, icon: BookOpen, label: 'Lecturer' },
    { type: 'cleaning' as UserType, icon: Users, label: 'Staff' },
    { type: 'admin' as UserType, icon: Settings, label: 'Admin' },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.studentId || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.endsWith('@fau.de')) {
      setError('Please use your FAU email address');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignup(userType);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1667273704095-66c1e361cfdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NjUwMzYyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="University"
          className="w-full h-full object-cover opacity-30"
        />
        <button
          onClick={onBackToLogin}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
            <GraduationCap className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-white text-center">Create Account</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
          <h2 className="text-gray-900 mb-2 text-center">Join Campus Hub</h2>
          <p className="text-gray-600 text-center mb-6">Sign up with your FAU credentials</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="John"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Doe"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Student/Staff ID</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  placeholder="Your ID"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">I am a</label>
              <div className="grid grid-cols-4 gap-2">
                {userTypes.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`py-2 rounded-lg transition-colors flex flex-col items-center justify-center gap-1 text-xs ${
                      userType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">University Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@fau.de"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={onBackToLogin} className="text-blue-600 hover:text-blue-700">
              Sign in
            </button>
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <p className="text-white/80 text-sm">
            Need help? Contact{' '}
            <a href="mailto:support@fau.de" className="text-white underline">
              IT Support
            </a>
          </p>
          <div className="border-t border-white/30 pt-3 space-y-2">
            <p className="text-white/70 text-xs">
              Fully developed by <span className="font-semibold">SUBITHA MURUGESAN</span>
            </p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">
                subithaa10@gmail.com
              </a>
              <span className="text-white/50">•</span>
              <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
