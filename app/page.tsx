'use client'

import { useState, useEffect } from 'react'
import { useMiniKit } from '@coinbase/onchainkit/minikit'
import { WelcomeMessage } from '../components/WelcomeMessage'
import { StressAssessment } from '../components/StressAssessment'
import { MeditationPlayer } from '../components/MeditationPlayer'
import { MeditationLibrary } from '../components/MeditationLibrary'
import { ProgressSummary } from '../components/ProgressSummary'
import { MainMenuButtons } from '../components/MainMenuButtons'

type AppState = 'welcome' | 'menu' | 'stress-assessment' | 'meditation' | 'library' | 'progress'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [selectedMeditation, setSelectedMeditation] = useState<any>(null)
  const [userSessions, setUserSessions] = useState<any[]>([])
  const { context } = useMiniKit()

  useEffect(() => {
    // Load user sessions from localStorage
    const savedSessions = localStorage.getItem('serenepulse-sessions')
    if (savedSessions) {
      setUserSessions(JSON.parse(savedSessions))
    }
  }, [])

  const handleStartStressMeditation = () => {
    setAppState('stress-assessment')
  }

  const handleBrowseMeditations = () => {
    setAppState('library')
  }

  const handleViewProgress = () => {
    setAppState('progress')
  }

  const handleMeditationSelected = (meditation: any) => {
    setSelectedMeditation(meditation)
    setAppState('meditation')
  }

  const handleSessionComplete = (sessionData: any) => {
    const newSession = {
      ...sessionData,
      timestamp: new Date().toISOString(),
      userId: context?.user?.fid || 'anonymous'
    }
    
    const updatedSessions = [...userSessions, newSession]
    setUserSessions(updatedSessions)
    localStorage.setItem('serenepulse-sessions', JSON.stringify(updatedSessions))
    
    setAppState('menu')
  }

  const handleBackToMenu = () => {
    setAppState('menu')
    setSelectedMeditation(null)
  }

  const renderCurrentState = () => {
    switch (appState) {
      case 'welcome':
        return (
          <WelcomeMessage 
            onContinue={() => setAppState('menu')}
            userName={context?.user?.displayName || 'Friend'}
          />
        )
      
      case 'menu':
        return (
          <MainMenuButtons
            onStartStressMeditation={handleStartStressMeditation}
            onBrowseMeditations={handleBrowseMeditations}
            onViewProgress={handleViewProgress}
            sessionCount={userSessions.length}
          />
        )
      
      case 'stress-assessment':
        return (
          <StressAssessment
            onMeditationSelected={handleMeditationSelected}
            onBack={handleBackToMenu}
          />
        )
      
      case 'meditation':
        return (
          <MeditationPlayer
            meditation={selectedMeditation}
            onComplete={handleSessionComplete}
            onBack={handleBackToMenu}
          />
        )
      
      case 'library':
        return (
          <MeditationLibrary
            onMeditationSelected={handleMeditationSelected}
            onBack={handleBackToMenu}
          />
        )
      
      case 'progress':
        return (
          <ProgressSummary
            sessions={userSessions}
            onBack={handleBackToMenu}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {renderCurrentState()}
      </div>
    </main>
  )
}
