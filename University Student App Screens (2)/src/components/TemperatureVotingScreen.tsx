import { useState, useEffect } from 'react';
import { ArrowLeft, Thermometer, Users, TrendingUp, TrendingDown, Minus, Check } from 'lucide-react';

interface TemperatureVotingScreenProps {
  onBack: () => void;
}

interface VotingData {
  currentTemp: number;
  targetTemp: number;
  totalVotes: number;
  voteDistribution: { temp: number; votes: number }[];
}

export function TemperatureVotingScreen({ onBack }: TemperatureVotingScreenProps) {
  // Simulated current bookings - in a real app, this would come from the booking system
  const currentBookings = [
    { type: 'Library Seat', location: 'Library - Desk A12', booked: true },
    { type: 'Classroom', location: 'ENG-202', booked: true },
    { type: 'Classroom', location: 'SCI-101', booked: false },
  ];

  const activeBooking = currentBookings.find(b => b.booked);
  
  const [selectedRoom, setSelectedRoom] = useState(activeBooking?.location || '');
  const [myVote, setMyVote] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingData, setVotingData] = useState<VotingData>({
    currentTemp: 22,
    targetTemp: 21,
    totalVotes: 12,
    voteDistribution: [
      { temp: 19, votes: 1 },
      { temp: 20, votes: 3 },
      { temp: 21, votes: 5 },
      { temp: 22, votes: 2 },
      { temp: 23, votes: 1 },
    ],
  });

  const tempRange = [18, 19, 20, 21, 22, 23, 24];

  const handleVote = () => {
    if (myVote !== null) {
      setHasVoted(true);
      // Simulate updating vote distribution
      const newDistribution = [...votingData.voteDistribution];
      const existingVote = newDistribution.find(v => v.temp === myVote);
      if (existingVote) {
        existingVote.votes += 1;
      } else {
        newDistribution.push({ temp: myVote, votes: 1 });
      }
      
      // Calculate new target based on weighted average
      const totalVotes = votingData.totalVotes + 1;
      const weightedSum = newDistribution.reduce((sum, v) => sum + (v.temp * v.votes), 0);
      const newTarget = Math.round(weightedSum / totalVotes);
      
      setVotingData({
        ...votingData,
        totalVotes,
        targetTemp: newTarget,
        voteDistribution: newDistribution,
      });
    }
  };

  const getVotePercentage = (votes: number) => {
    return votingData.totalVotes > 0 ? (votes / votingData.totalVotes) * 100 : 0;
  };

  const getTempStatus = () => {
    const diff = votingData.currentTemp - votingData.targetTemp;
    if (diff > 0.5) return { text: 'Cooling down', icon: TrendingDown, color: 'text-blue-600' };
    if (diff < -0.5) return { text: 'Warming up', icon: TrendingUp, color: 'text-orange-600' };
    return { text: 'Stable', icon: Minus, color: 'text-green-600' };
  };

  const status = getTempStatus();
  const StatusIcon = status.icon;

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
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="mb-1">Temperature Control</h1>
            <p className="text-white/90 text-sm">Smart climate voting system</p>
          </div>
        </div>

        {/* Room Selector */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <label className="block text-white/80 text-xs mb-2">Select Classroom</label>
          <select
            value={selectedRoom}
            onChange={(e) => {
              setSelectedRoom(e.target.value);
              setHasVoted(false);
              setMyVote(null);
            }}
            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            {currentBookings
              .filter(b => b.type === 'Classroom' && b.booked)
              .map((booking) => (
                <option key={booking.location} value={booking.location}>
                  {booking.location}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Voting Restriction Notice */}
        {!activeBooking && (
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <div className="flex items-start gap-2">
              <Thermometer className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-900 mb-1">
                  <strong>Voting Restricted</strong>
                </p>
                <p className="text-xs text-yellow-800">
                  You can only vote for temperature in rooms where you have an active booking (library seat, classroom, or booked room).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeBooking && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-900 mb-1">
                  <strong>Active Booking</strong>
                </p>
                <p className="text-xs text-blue-800">
                  You can vote because you have an active {activeBooking.type.toLowerCase()} at {activeBooking.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Temperature Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Temperature</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl text-gray-900">{votingData.currentTemp}°C</span>
                <div className={`flex items-center gap-1 text-sm ${status.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span>{status.text}</span>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
              <Thermometer className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-700">Target Temperature</p>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{votingData.totalVotes} votes</span>
              </div>
            </div>
            <p className="text-3xl text-gray-900">{votingData.targetTemp}°C</p>
          </div>
        </div>

        {/* Voting Section */}
        {!hasVoted ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 mb-4">Cast Your Vote</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select your preferred temperature for this classroom
            </p>

            {/* Temperature Scale */}
            <div className="space-y-2 mb-6">
              {tempRange.map((temp) => (
                <button
                  key={temp}
                  onClick={() => setMyVote(temp)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    myVote === temp
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        myVote === temp
                          ? 'border-orange-600 bg-orange-600'
                          : 'border-gray-300 bg-white'
                      } flex items-center justify-center`}
                    >
                      {myVote === temp && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-900">{temp}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {temp < 20 && <span className="text-xs text-blue-600">Cool</span>}
                    {temp >= 20 && temp <= 22 && (
                      <span className="text-xs text-green-600">Comfortable</span>
                    )}
                    {temp > 22 && <span className="text-xs text-orange-600">Warm</span>}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleVote}
              disabled={myVote === null}
              className={`w-full py-3 rounded-xl transition-colors ${
                myVote !== null
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Vote
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900">Vote Submitted!</h3>
                <p className="text-sm text-gray-600">Your vote for {myVote}°C has been recorded</p>
              </div>
            </div>
          </div>
        )}

        {/* Vote Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Vote Distribution</h3>
          <div className="space-y-3">
            {tempRange.map((temp) => {
              const voteData = votingData.voteDistribution.find(v => v.temp === temp);
              const votes = voteData?.votes || 0;
              const percentage = getVotePercentage(votes);

              return (
                <div key={temp} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{temp}°C</span>
                    <span className="text-gray-600">
                      {votes} {votes === 1 ? 'vote' : 'votes'} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h4 className="text-gray-900 mb-3 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-blue-600" />
            How It Works
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Vote for your preferred temperature while in the classroom</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>The system calculates the average based on all votes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Smart HVAC automatically adjusts to match the target</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Updates happen every 5 minutes for comfort and energy efficiency</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}