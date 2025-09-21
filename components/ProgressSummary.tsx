'use client'

interface ProgressSummaryProps {
  sessions: any[]
  onBack: () => void
}

export function ProgressSummary({ sessions, onBack }: ProgressSummaryProps) {
  const totalSessions = sessions.length
  const totalMinutes = Math.round(sessions.reduce((acc, session) => acc + (session.duration || 0), 0) / 60)
  
  // Calculate mood improvement
  const sessionsWithMood = sessions.filter(s => s.moodBefore && s.moodAfter)
  const avgMoodImprovement = sessionsWithMood.length > 0
    ? sessionsWithMood.reduce((acc, s) => acc + (s.moodAfter - s.moodBefore), 0) / sessionsWithMood.length
    : 0

  // Recent sessions (last 7 days)
  const recentSessions = sessions.filter(session => {
    const sessionDate = new Date(session.timestamp)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return sessionDate >= weekAgo
  })

  // Streak calculation (consecutive days with sessions)
  const getStreak = () => {
    if (sessions.length === 0) return 0
    
    const today = new Date()
    let streak = 0
    let currentDate = new Date(today)
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const dateStr = currentDate.toDateString()
      const hasSession = sessions.some(session => 
        new Date(session.timestamp).toDateString() === dateStr
      )
      
      if (hasSession) {
        streak++
      } else if (streak > 0) {
        break
      }
      
      currentDate.setDate(currentDate.getDate() - 1)
    }
    
    return streak
  }

  const currentStreak = getStreak()

  const getMoodColor = (improvement: number) => {
    if (improvement > 1) return 'text-green-600'
    if (improvement > 0) return 'text-blue-600'
    if (improvement < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getMoodText = (improvement: number) => {
    if (improvement > 1) return 'Significant improvement'
    if (improvement > 0) return 'Positive improvement'
    if (improvement < 0) return 'Needs attention'
    return 'Stable mood'
  }

  if (totalSessions === 0) {
    return (
      <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">My Progress</h1>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Start Your Journey
              </h2>
              <p className="text-gray-600 max-w-sm mx-auto">
                Complete your first meditation session to see your progress and insights here.
              </p>
            </div>
            <button
              onClick={onBack}
              className="btn-primary"
            >
              Start First Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-900 ml-4">My Progress</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {totalSessions}
          </div>
          <div className="text-sm text-gray-600">
            Total Sessions
          </div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {totalMinutes}
          </div>
          <div className="text-sm text-gray-600">
            Minutes Meditated
          </div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-600">
            Day Streak
          </div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {recentSessions.length}
          </div>
          <div className="text-sm text-gray-600">
            This Week
          </div>
        </div>
      </div>

      {/* Mood Insights */}
      {sessionsWithMood.length > 0 && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Insights</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-2xl font-bold mb-1 ${getMoodColor(avgMoodImprovement)}`}>
                {avgMoodImprovement > 0 ? '+' : ''}{avgMoodImprovement.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">
                Average mood improvement
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${getMoodColor(avgMoodImprovement)}`}>
                {getMoodText(avgMoodImprovement)}
              </div>
              <div className="text-xs text-gray-500">
                Based on {sessionsWithMood.length} sessions
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          {sessions.slice(-5).reverse().map((session, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {session.meditationType === 'stress_based' ? 'Stress Meditation' : 'Mood Meditation'}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(session.timestamp).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {Math.round((session.duration || 0) / 60)}m
                </div>
                {session.moodBefore && session.moodAfter && (
                  <div className={`text-xs ${getMoodColor(session.moodAfter - session.moodBefore)}`}>
                    {session.moodBefore} → {session.moodAfter}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <h4 className="font-medium text-blue-900 mb-2">
            {currentStreak > 0 ? `Great job on your ${currentStreak}-day streak! 🎉` : 'Keep going! 💪'}
          </h4>
          <p className="text-blue-700 text-sm">
            {totalSessions < 5 
              ? 'Complete a few more sessions to unlock detailed insights.'
              : 'You\'re building a healthy meditation habit. Keep it up!'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
