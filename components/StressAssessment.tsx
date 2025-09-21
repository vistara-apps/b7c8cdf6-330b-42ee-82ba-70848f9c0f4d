'use client'

import { useState } from 'react'

interface StressAssessmentProps {
  onMeditationSelected: (meditation: any) => void
  onBack: () => void
}

const stressMeditations = [
  {
    id: 'low-stress',
    title: 'Gentle Awareness',
    description: 'A light meditation to maintain your current calm state',
    duration: 90,
    audioUrl: '/audio/gentle-awareness.mp3',
    stressLevel: 1
  },
  {
    id: 'mild-stress',
    title: 'Breathing Reset',
    description: 'Simple breathing exercises to ease mild tension',
    duration: 120,
    audioUrl: '/audio/breathing-reset.mp3',
    stressLevel: 2
  },
  {
    id: 'moderate-stress',
    title: 'Body Scan Relief',
    description: 'Release tension with guided body awareness',
    duration: 120,
    audioUrl: '/audio/body-scan-relief.mp3',
    stressLevel: 3
  },
  {
    id: 'high-stress',
    title: 'Rapid Calm',
    description: 'Quick techniques for immediate stress relief',
    duration: 90,
    audioUrl: '/audio/rapid-calm.mp3',
    stressLevel: 4
  },
  {
    id: 'very-high-stress',
    title: 'Emergency Reset',
    description: 'Intensive calming for overwhelming moments',
    duration: 120,
    audioUrl: '/audio/emergency-reset.mp3',
    stressLevel: 5
  }
]

export function StressAssessment({ onMeditationSelected, onBack }: StressAssessmentProps) {
  const [selectedStressLevel, setSelectedStressLevel] = useState<number | null>(null)
  const [showRecommendation, setShowRecommendation] = useState(false)

  const handleStressLevelSelect = (level: number) => {
    setSelectedStressLevel(level)
    setShowRecommendation(true)
  }

  const getRecommendedMeditation = () => {
    if (!selectedStressLevel) return null
    const meditation = stressMeditations.find(m => m.stressLevel === selectedStressLevel)
    return meditation ? {
      ...meditation,
      isPremium: false,
      costInCredits: 0
    } : null
  }

  const getStressLevelText = (level: number) => {
    const levels = {
      1: 'Very Low',
      2: 'Low',
      3: 'Moderate',
      4: 'High',
      5: 'Very High'
    }
    return levels[level as keyof typeof levels]
  }

  const getStressLevelColor = (level: number) => {
    const colors = {
      1: 'bg-green-500',
      2: 'bg-yellow-400',
      3: 'bg-orange-400',
      4: 'bg-red-400',
      5: 'bg-red-600'
    }
    return colors[level as keyof typeof colors]
  }

  if (showRecommendation) {
    const recommendedMeditation = getRecommendedMeditation()
    
    return (
      <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setShowRecommendation(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Recommended for You</h1>
        </div>

        {/* Stress Level Display */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg">
            <div className={`w-16 h-16 rounded-full ${getStressLevelColor(selectedStressLevel!)} flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">{selectedStressLevel}</span>
            </div>
          </div>
          <p className="text-gray-600">
            Stress Level: <span className="font-semibold">{getStressLevelText(selectedStressLevel!)}</span>
          </p>
        </div>

        {/* Recommended Meditation */}
        {recommendedMeditation && (
          <div className="card mb-8 animate-slide-up">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {recommendedMeditation.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {recommendedMeditation.description}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{Math.floor(recommendedMeditation.duration / 60)}:{(recommendedMeditation.duration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onMeditationSelected(recommendedMeditation)}
              className="btn-primary w-full"
            >
              Start Micro-Meditation
            </button>
          </div>
        )}

        {/* Alternative Options */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Not feeling right? Choose a different stress level:</p>
          <button
            onClick={() => setShowRecommendation(false)}
            className="btn-secondary"
          >
            Reassess Stress Level
          </button>
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
        <h1 className="text-xl font-semibold text-gray-900 ml-4">Stress Level Assessment</h1>
      </div>

      {/* User Avatar */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stress level meditation.</h2>
        <p className="text-gray-600 max-w-sm mx-auto">
          Your bot offers personalized 2-minute meditations based on your stress lunar levels.
        </p>
      </div>

      {/* Stress Level Selector */}
      <div className="mb-8">
        <p className="text-center text-gray-700 mb-6 font-medium">
          How stressed are you feeling right now?
        </p>
        
        {/* Visual Stress Scale */}
        <div className="flex items-center justify-between mb-6 px-4">
          <span className="text-sm text-gray-500">Low</span>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-600 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-500">High</span>
        </div>

        {/* Stress Level Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => handleStressLevelSelect(level)}
              className={`
                aspect-square rounded-full border-2 font-bold text-lg transition-all duration-200
                ${selectedStressLevel === level
                  ? `${getStressLevelColor(level)} border-gray-400 text-white shadow-lg scale-110`
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md'
                }
              `}
            >
              {level}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
          <span>Very Low</span>
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Very High</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => selectedStressLevel && handleStressLevelSelect(selectedStressLevel)}
          disabled={!selectedStressLevel}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
            ${selectedStressLevel
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Start Micro-Meditation
        </button>
      </div>
    </div>
  )
}
