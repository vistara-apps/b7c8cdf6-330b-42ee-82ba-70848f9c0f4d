export const STRESS_LEVELS = {
  1: { label: 'Very Low', color: 'green' },
  2: { label: 'Low', color: 'yellow' },
  3: { label: 'Moderate', color: 'orange' },
  4: { label: 'High', color: 'red' },
  5: { label: 'Very High', color: 'red' }
} as const

export const MEDITATION_CATEGORIES = [
  'calm',
  'focus', 
  'energy',
  'sleep'
] as const

export const MOOD_SCALE = {
  1: 'Poor',
  2: 'Fair', 
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
} as const

export const PRICING = {
  PREMIUM_SESSION_MIN: 0.10,
  PREMIUM_SESSION_MAX: 0.50,
  MONTHLY_SUBSCRIPTION: 5.00
} as const

export const SESSION_DURATION = {
  MIN: 60, // 1 minute
  MAX: 150, // 2.5 minutes
  DEFAULT: 120 // 2 minutes
} as const
