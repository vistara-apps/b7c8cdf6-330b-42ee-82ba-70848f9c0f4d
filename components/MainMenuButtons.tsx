'use client'

import { useState, useEffect } from 'react'
import { getUserCredits } from '../lib/utils'

interface MainMenuButtonsProps {
  onStartStressMeditation: () => void
  onBrowseMeditations: () => void
  onViewProgress: () => void
  sessionCount: number
}

export function MainMenuButtons({
  onStartStressMeditation,
  onBrowseMeditations,
  onViewProgress,
  sessionCount
}: MainMenuButtonsProps) {
  const [userCredits, setUserCredits] = useState(10)

  useEffect(() => {
    setUserCredits(getUserCredits())
  }, [])

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">SerenePulse</h1>
        <p className="text-gray-600 mb-4">How can we help you find peace today?</p>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium inline-block">
          {userCredits.toFixed(2)} credits available
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 space-y-4">
        {/* Stress Meditation - Primary CTA */}
        <button
          onClick={onStartStressMeditation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Start Stress Meditation</h3>
              <p className="text-blue-100 text-sm">Get instant relief based on your current stress level</p>
            </div>
          </div>
        </button>

        {/* Browse Meditations */}
        <button
          onClick={onBrowseMeditations}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-200"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">Browse Meditations</h3>
              <p className="text-gray-600 text-sm">Explore meditations by mood and category</p>
            </div>
          </div>
        </button>

        {/* Progress */}
        <button
          onClick={onViewProgress}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-200"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">My Progress</h3>
                {sessionCount > 0 && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {sessionCount} sessions
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">View your meditation history and insights</p>
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 pb-4">
        <p className="text-xs text-gray-500">
          Take a moment to breathe and reset your mind
        </p>
      </div>
    </div>
  )
}
