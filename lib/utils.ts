import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function calculateMoodImprovement(before: number, after: number): {
  improvement: number
  percentage: number
  label: string
} {
  const improvement = after - before
  const percentage = (improvement / 4) * 100 // 4 is max possible improvement (1->5)
  
  let label = 'No change'
  if (improvement > 1) label = 'Significant improvement'
  else if (improvement > 0) label = 'Positive improvement'
  else if (improvement < -1) label = 'Significant decline'
  else if (improvement < 0) label = 'Slight decline'
  
  return { improvement, percentage, label }
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function getStressBasedMeditation(stressLevel: number) {
  const meditations = {
    1: {
      id: 'gentle-awareness',
      title: 'Gentle Awareness',
      description: 'A light meditation to maintain your current calm state',
      duration: 90
    },
    2: {
      id: 'breathing-reset',
      title: 'Breathing Reset', 
      description: 'Simple breathing exercises to ease mild tension',
      duration: 120
    },
    3: {
      id: 'body-scan-relief',
      title: 'Body Scan Relief',
      description: 'Release tension with guided body awareness',
      duration: 120
    },
    4: {
      id: 'rapid-calm',
      title: 'Rapid Calm',
      description: 'Quick techniques for immediate stress relief',
      duration: 90
    },
    5: {
      id: 'emergency-reset',
      title: 'Emergency Reset',
      description: 'Intensive calming for overwhelming moments',
      duration: 120
    }
  }
  
  return meditations[stressLevel as keyof typeof meditations] || meditations[3]
}

export function saveSessionToStorage(session: any) {
  try {
    const existingSessions = JSON.parse(localStorage.getItem('serenepulse-sessions') || '[]')
    const updatedSessions = [...existingSessions, session]
    localStorage.setItem('serenepulse-sessions', JSON.stringify(updatedSessions))
    return true
  } catch (error) {
    console.error('Failed to save session:', error)
    return false
  }
}

export function getSessionsFromStorage(): any[] {
  try {
    return JSON.parse(localStorage.getItem('serenepulse-sessions') || '[]')
  } catch (error) {
    console.error('Failed to load sessions:', error)
    return []
  }
}
