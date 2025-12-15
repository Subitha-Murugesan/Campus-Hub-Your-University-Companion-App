import { useState, useRef } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle, Clock, Wrench, Lightbulb, Droplet, Trash2, Camera, Send, ChevronDown, Upload, X } from 'lucide-react';

interface IssueReportingScreenProps {
  onBack: () => void;
}

interface Issue {
  id: string;
  category: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  timestamp: string;
  reportedBy: string;
}

type IssueCategory = 'Equipment' | 'Cleanliness' | 'Lighting' | 'Plumbing' | 'Other';

export function IssueReportingScreen({ onBack }: IssueReportingScreenProps) {
  const [activeTab, setActiveTab] = useState<'report' | 'myreports'>('report');
  const [category, setCategory] = useState<IssueCategory>('Equipment');
  const [location, setLocation] = useState('ENG-202');
  const [description, setDescription] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string>('');
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { name: 'Equipment' as IssueCategory, icon: Wrench, color: 'bg-purple-500', examples: 'Projector, Computer, Whiteboard' },
    { name: 'Cleanliness' as IssueCategory, icon: Trash2, color: 'bg-green-500', examples: 'Full bin, Spill, Dirty desk' },
    { name: 'Lighting' as IssueCategory, icon: Lightbulb, color: 'bg-yellow-500', examples: 'Broken bulb, Flickering light' },
    { name: 'Plumbing' as IssueCategory, icon: Droplet, color: 'bg-blue-500', examples: 'Empty soap, Leaky faucet' },
    { name: 'Other' as IssueCategory, icon: AlertCircle, color: 'bg-gray-500', examples: 'Any other issue' },
  ];

  const myIssues: Issue[] = [
    {
      id: '1',
      category: 'Equipment',
      description: 'Projector not turning on in ENG-202',
      location: 'ENG-202',
      status: 'in-progress',
      timestamp: '2 hours ago',
      reportedBy: 'You',
    },
    {
      id: '2',
      category: 'Cleanliness',
      description: 'Bathroom soap dispenser empty',
      location: 'ENG Building - 2nd Floor',
      status: 'resolved',
      timestamp: 'Yesterday',
      reportedBy: 'You',
    },
    {
      id: '3',
      category: 'Plumbing',
      description: 'Water fountain not working',
      location: 'SCI-101',
      status: 'pending',
      timestamp: '3 days ago',
      reportedBy: 'You',
    },
  ];

  const buildings = ['ENG-202', 'ENG-301', 'SCI-101', 'AH-150', 'BUS-320', 'Library', 'Cafeteria'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setPhotoUploaded(true);
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (description.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        setActiveTab('myreports');
      }, 2000);
    }
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'in-progress':
        return Wrench;
      case 'resolved':
        return CheckCircle;
    }
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
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="mb-1">Report Issues</h1>
            <p className="text-white/90 text-sm">Help maintain our campus facilities</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'report'
                ? 'bg-white text-red-600'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Report Issue
          </button>
          <button
            onClick={() => setActiveTab('myreports')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'myreports'
                ? 'bg-white text-red-600'
                : 'text-white hover:bg-white/10'
            }`}
          >
            My Reports
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'report' ? (
          <div className="space-y-6">
            {submitted && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 animate-in fade-in slide-in-from-top">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Report Submitted!</h3>
                    <p className="text-sm text-gray-600">
                      Facilities team has been notified
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Category Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Issue Category</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        category === cat.name
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-300 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`${cat.color} p-3 rounded-full`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm text-gray-900">{cat.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  Examples: {categories.find(c => c.name === category)?.examples}
                </p>
              </div>
            </div>

            {/* Location Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Location</h3>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {buildings.map((building) => (
                    <option key={building} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Description</h3>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-2">
                {description.length}/500 characters
              </p>
            </div>

            {/* Photo Upload (Mandatory) */}
            <div className={`bg-white rounded-2xl p-6 shadow-sm border ${!photoUploaded ? 'border-red-200' : 'border-gray-100'}`}>
              <h3 className="text-gray-900 mb-4">
                Add Photo <span className="text-sm text-red-600">*Required</span>
              </h3>
              
              {uploadedPhoto ? (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden border-2 border-green-400">
                    <img src={uploadedPhoto} alt="Uploaded issue" className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Uploaded
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowPhotoModal(true);
                      setUploadedPhoto('');
                      setPhotoUploaded(false);
                    }}
                    className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowPhotoModal(true)}
                  className="w-full flex items-center justify-center gap-3 p-6 border-2 border-dashed rounded-xl transition-colors border-red-300 hover:border-red-400 hover:bg-red-50"
                >
                  <Camera className="w-6 h-6 text-gray-400" />
                  <span className="text-gray-600">Take or upload photo</span>
                </button>
              )}
              
              {/* AI Recognition Notice */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-blue-900 mb-2">
                      <strong>AI Image Recognition:</strong>
                    </p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Our AI software automatically analyzes uploaded photos to validate if the reported damage matches the location and room properties. This prevents misuse of the reporting system. Based on the analysis, the AI categorizes the issue by urgency and routes it to the appropriate staff (administrators and cleaning crew).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!description.trim() || !photoUploaded}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl transition-colors ${
                description.trim() && photoUploaded
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              Submit Report
            </button>
          </div>
        ) : (
          /* My Reports Tab */
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Your Reported Issues</h3>
              <span className="text-sm text-gray-600">{myIssues.length} reports</span>
            </div>

            {myIssues.map((issue) => {
              const StatusIcon = getStatusIcon(issue.status);
              const categoryData = categories.find(c => c.name === issue.category);
              const CategoryIcon = categoryData?.icon || AlertCircle;

              return (
                <div
                  key={issue.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`${categoryData?.color || 'bg-gray-500'} p-2.5 rounded-lg`}>
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-gray-900 mb-1">{issue.description}</h4>
                          <p className="text-sm text-gray-600">{issue.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${getStatusColor(
                            issue.status
                          )}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {issue.status === 'pending' && 'Pending'}
                          {issue.status === 'in-progress' && 'In Progress'}
                          {issue.status === 'resolved' && 'Resolved'}
                        </span>
                        <span className="text-xs text-gray-500">{issue.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {myIssues.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No issues reported yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Add Photo</h3>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">Choose how to add your photo:</p>
            
            <div className="space-y-3">
              <button
                onClick={handleCameraClick}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-colors"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Take Photo</p>
                  <p className="text-xs text-gray-500">Use device camera</p>
                </div>
              </button>
              
              <button
                onClick={handleFileClick}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-900">Upload from Files</p>
                  <p className="text-xs text-gray-500">Choose from gallery</p>
                </div>
              </button>
            </div>
            
            {/* Hidden Input for Camera */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            
            {/* Hidden Input for File Upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
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