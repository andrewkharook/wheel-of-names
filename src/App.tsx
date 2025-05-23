import { useState } from 'react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import WheelPage from './pages/WheelPage'
import SettingsPage from './pages/SettingsPage'
import { takeScreenshot } from './utils/screenshot'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

export interface TeamMember {
  id: string
  name: string
  color: string
}

export interface SpinStats {
  count: number
  lastSpinTime: string | null
}

const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Наташа', color: 'hsl(20, 70%, 80%)' },
  { id: '2', name: 'Аліса', color: 'hsl(36, 70%, 80%)' },
  { id: '3', name: 'Андрій', color: 'hsl(72, 70%, 80%)' },
  { id: '4', name: 'Тарас', color: 'hsl(108, 70%, 80%)' },
  { id: '5', name: 'Костя', color: 'hsl(144, 70%, 80%)' },
  { id: '6', name: 'Сергій', color: 'hsl(180, 70%, 80%)' },
  { id: '7', name: 'Женя', color: 'hsl(216, 70%, 80%)' },
  { id: '8', name: 'Вітя', color: 'hsl(252, 70%, 80%)' },
  { id: '9', name: 'Антон', color: 'hsl(288, 70%, 80%)' },
  { id: '10', name: 'Ед', color: 'hsl(324, 70%, 80%)' },
  { id: '11', name: 'Влад', color: 'hsl(0, 70%, 80%)' },
]

function App() {
  const [currentPage, setCurrentPage] = useState<'wheel' | 'settings'>('wheel')
  const [spinStats, setSpinStats] = useState<SpinStats>({ count: 0, lastSpinTime: null })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('teamMembers')
    return saved ? JSON.parse(saved) : defaultTeamMembers
  })

  const handleSaveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members)
    localStorage.setItem('teamMembers', JSON.stringify(members))
    setCurrentPage('wheel')
  }

  const handleSpinComplete = () => {
    const newStats = {
      count: spinStats.count + 1,
      lastSpinTime: new Date().toLocaleString('uk-UA')
    }
    setSpinStats(newStats)
    localStorage.setItem('spinStats', JSON.stringify(newStats))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'wheel' ? (
        <WheelPage
          teamMembers={teamMembers}
          spinStats={spinStats}
          onSettingsClick={() => setCurrentPage('settings')}
          onSpinComplete={handleSpinComplete}
          onScreenshot={takeScreenshot}
        />
      ) : (
        <SettingsPage
          teamMembers={teamMembers}
          onSave={handleSaveTeamMembers}
        />
      )}
    </ThemeProvider>
  )
}

export default App
