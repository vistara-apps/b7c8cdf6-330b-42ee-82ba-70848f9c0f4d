'use client'

import { useState, useEffect, useRef } from 'react'

interface MeditationPlayerProps {
  meditation: {
    id: string
    title: string
    description: string
    duration: number
    audioUrl: string
  }
  onComplete: (sessionData: any) => void
  onBack: () => void
}

export function MeditationPlayer({ meditation, onComplete, onBack }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [moodBefore, setMoodBefore] = useState<number | null>(null)
  const [moodAfter, setMoodAfter] = useState<number | null>(null)
  const [showMoodCheck, setShowMoodCheck] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Ask for mood before starting
    if (!showMoodCheck && moodBefore === null) {
      setShowMoodCheck(true)
    }
  }, [])

  useEffect(() => {
    if (isPlaying && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= meditation.duration) {
            setIsPlaying(false)
            setIsCompleted(true)
            return meditation.duration
          }
          return newTime
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isCompleted, meditation.duration])

  const handlePlayPause = () => {
    if (moodBefore === null) {
      setShowMoodCheck(true)
      return
    }
    setIsPlaying(!isPlaying)
  }

  const handleMoodBeforeSubmit = (mood: number) => {
    setMoodBefore(mood)
    setShowMoodCheck(false)
  }

  const handleComplete = () => {
    if (moodAfter !== null) {
      const sessionData = {
        meditationId: meditation.id,
        meditationType: 'stress_based',
        duration: meditation.duration,
        moodBefore,
        moodAfter,
        completed: true
      }
      onComplete(sessionData)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / meditation.duration) * 100

  // Mood Check Modal
  if (showMoodCheck) {
    return (
      <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="card max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              How are you feeling right now?
            </h3>
            <p className="text-gray-600 mb-6">
              Rate your current mood before we begin
            </p>
            
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodBeforeSubmit(mood)}
                  className="aspect-square rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-lg transition-all duration-200 hover:scale-110"
                >
                  {mood}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Great</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Completion Screen
  if (isCompleted && moodAfter === null) {
    return (
      <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-green-50 to-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="card max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Meditation Complete!
            </h3>
            <p className="text-gray-600 mb-6">
              How are you feeling now?
            </p>
            
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setMoodAfter(mood)}
                  className={`
                    aspect-square rounded-full font-bold text-lg transition-all duration-200
                    ${moodAfter === mood
                      ? 'bg-green-600 text-white scale-110'
                      : 'bg-green-100 hover:bg-green-200 text-green-800 hover:scale-110'
                    }
                  `}
                >
                  {mood}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mb-6">
              <span>Poor</span>
              <span>Great</span>
            </div>

            <button
              onClick={handleComplete}
              disabled={moodAfter === null}
              className={`
                w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200
                ${moodAfter !== null
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Complete Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-blue-50 to-white">
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
        <h1 className="text-xl font-semibold text-gray-900 ml-4">Meditation Session</h1>
      </div>

      {/* Meditation Info */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {meditation.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {meditation.description}
        </p>
      </div>

      {/* Progress Circle */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="relative w-64 h-64">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="text-blue-600 transition-all duration-300"
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-gray-500">
              of {formatTime(meditation.duration)}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="text-center space-y-4">
        <button
          onClick={handlePlayPause}
          className="w-20 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 mx-auto"
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
        
        <p className="text-gray-600 text-sm">
          {isPlaying ? 'Tap to pause' : 'Tap to start'}
        </p>
      </div>

      {/* Breathing Guide */}
      {isPlaying && (
        <div className="text-center mt-8 animate-pulse-slow">
          <div className="w-4 h-4 bg-blue-600 rounded-full mx-auto mb-2"></div>
          <p className="text-blue-600 text-sm font-medium">
            Breathe deeply and relax
          </p>
        </div>
      )}
    </div>
  )
}
