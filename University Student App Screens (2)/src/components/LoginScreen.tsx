import { useState } from 'react';
import { Mail, Lock, LogIn, UserCircle, GraduationCap, BookOpen, Users, Settings, Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export type UserType = 'student' | 'lecturer' | 'cleaning' | 'admin';

interface LoginScreenProps {
  onLogin: (userType: UserType) => void;
  onNavigateToSignup: () => void;
}

export function LoginScreen({ onLogin, onNavigateToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userTypes = [
    { type: 'student' as UserType, icon: GraduationCap, label: 'Student', color: 'blue' },
    { type: 'lecturer' as UserType, icon: BookOpen, label: 'Lecturer', color: 'purple' },
    { type: 'cleaning' as UserType, icon: Users, label: 'Staff', color: 'green' },
    { type: 'admin' as UserType, icon: Settings, label: 'Admin', color: 'orange' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.endsWith('@fau.de')) {
      setError('Please use your FAU email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(userType);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header with University Building Image */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684710087097-4b87480ad8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1MjcxMzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="University Building"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-white text-center mb-2">Campus Hub</h1>
          <p className="text-white/90 text-center">Your University Companion</p>
          <div className="text-white/80 text-center text-sm mt-4 space-y-2">
            <p>Concept, design, and implementation of this prototype were fully developed by <span className="font-bold">Subitha Murugesan</span></p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/90 underline">
                subithaa10@gmail.com
              </a>
              <span className="text-white/60">•</span>
              <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/90 underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
          <h2 className="text-gray-900 mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-6">Sign in to access your campus services</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                University Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@fau.de"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-2">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = type.type === userType;
                  return (
                    <button
                      key={type.type}
                      type="button"
                      onClick={() => setUserType(type.type)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <button className="text-blue-600 hover:text-blue-700" onClick={onNavigateToSignup}>
              Sign up
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-white/80 text-sm">
            Need help? Contact{' '}
            <a href="mailto:support@fau.de" className="text-white underline">
              IT Support
            </a>
          </p>
          
          {/* Developer Credit */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2 max-w-md mx-auto">
            <p className="text-white/80 text-xs">
              Fully developed by <span className="font-semibold text-white">SUBITHA MURUGESAN</span>
            </p>
            <div className="flex items-center justify-center gap-3 text-xs">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=subithaa10@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/90 underline">
                subithaa10@gmail.com
              </a>
              <span className="text-white/60">•</span>
              <a href="https://www.linkedin.com/in/subitha-murugesan/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/90 underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}