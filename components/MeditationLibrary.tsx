'use client'

import { useState } from 'react'

interface MeditationLibraryProps {
  onMeditationSelected: (meditation: any) => void
  onBack: () => void
}

const meditationCategories = [
  {
    id: 'calm',
    name: 'Calm',
    icon: '🧘‍♀️',
    color: 'bg-blue-100 text-blue-800',
    meditations: [
      {
        id: 'deep-calm',
        title: 'Deep Calm',
        description: 'Sink into profound tranquility',
        duration: 120,
        isPremium: false
      },
      {
        id: 'ocean-waves',
        title: 'Ocean Waves',
        description: 'Let the rhythm of waves soothe you',
        duration: 90,
        isPremium: true
      }
    ]
  },
  {
    id: 'focus',
    name: 'Focus',
    icon: '🎯',
    color: 'bg-purple-100 text-purple-800',
    meditations: [
      {
        id: 'laser-focus',
        title: 'Laser Focus',
        description: 'Sharpen your concentration',
        duration: 90,
        isPremium: false
      },
      {
        id: 'mental-clarity',
        title: 'Mental Clarity',
        description: 'Clear the mental fog',
        duration: 120,
        isPremium: true
      }
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    meditations: [
      {
        id: 'morning-boost',
        title: 'Morning Boost',
        description: 'Start your day with vitality',
        duration: 90,
        isPremium: false
      },
      {
        id: 'power-breath',
        title: 'Power Breath',
        description: 'Energizing breathing techniques',
        duration: 60,
        isPremium: false
      }
    ]
  },
  {
    id: 'sleep',
    name: 'Sleep',
    icon: '🌙',
    color: 'bg-indigo-100 text-indigo-800',
    meditations: [
      {
        id: 'bedtime-calm',
        title: 'Bedtime Calm',
        description: 'Prepare for restful sleep',
        duration: 120,
        isPremium: false
      },
      {
        id: 'dream-journey',
        title: 'Dream Journey',
        description: 'Drift into peaceful dreams',
        duration: 150,
        isPremium: true
      }
    ]
  }
]

export function MeditationLibrary({ onMeditationSelected, onBack }: MeditationLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleMeditationSelect = (meditation: any, category: any) => {
    const fullMeditation = {
      ...meditation,
      audioUrl: `/audio/${meditation.id}.mp3`,
      category: category.name
    }
    onMeditationSelected(fullMeditation)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Category View
  if (!selectedCategory) {
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Meditation Library</h1>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">Choose a category that matches your current mood:</p>
          
          {meditationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="w-full bg-white hover:bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {category.meditations.length} meditation{category.meditations.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                  {category.meditations.filter(m => !m.isPremium).length} free
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 text-center">
          <p className="text-xs text-gray-500">
            Premium meditations require credits • Free meditations always available
          </p>
        </div>
      </div>
    )
  }

  // Meditation List View
  const category = meditationCategories.find(c => c.id === selectedCategory)!
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="ml-4 flex items-center space-x-3">
          <span className="text-2xl">{category.icon}</span>
          <h1 className="text-xl font-semibold text-gray-900">{category.name}</h1>
        </div>
      </div>

      {/* Meditations */}
      <div className="space-y-4">
        {category.meditations.map((meditation) => (
          <div
            key={meditation.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {meditation.title}
                    </h3>
                    {meditation.isPremium && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {meditation.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatDuration(meditation.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleMeditationSelect(meditation, category)}
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200
                  ${meditation.isPremium
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                `}
              >
                {meditation.isPremium ? 'Start Premium Session' : 'Start Free Session'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Info */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Premium Meditations</h4>
            <p className="text-yellow-700 text-sm">
              Premium sessions cost 0.10-0.50 credits each and offer advanced techniques and longer durations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
