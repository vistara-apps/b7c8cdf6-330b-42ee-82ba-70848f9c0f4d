export interface User {
  userId: string
  createdAt: string
  lastActiveAt: string
  credits: number
  totalSessions: number
  premiumSessions: number
}

export interface Session {
  sessionId: string
  userId: string
  meditationType: 'stress_based' | 'mood_specific'
  meditationId?: string
  startTimestamp: string
  endTimestamp?: string
  moodBefore?: number
  moodAfter?: number
  costInCredits?: number
  completed: boolean
}

export interface Meditation {
  meditationId: string
  title: string
  description: string
  audioUrl: string
  durationSeconds: number
  tags: string[]
  isPremium: boolean
  category?: string
}

export interface MoodRating {
  rating: number
  timestamp: string
  sessionId: string
}

export interface StressLevel {
  level: number // 1-5 scale
  timestamp: string
  sessionId: string
}
