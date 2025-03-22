import { useState } from 'react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import WheelPage from './pages/WheelPage'
import SettingsPage from './pages/SettingsPage'
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

function App() {
  const [currentPage, setCurrentPage] = useState<'wheel' | 'settings'>('wheel')
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('teamMembers')
    return saved ? JSON.parse(saved) : []
  })

  const handleSaveTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members)
    localStorage.setItem('teamMembers', JSON.stringify(members))
    setCurrentPage('wheel')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'wheel' ? (
        <WheelPage
          teamMembers={teamMembers}
          onSettingsClick={() => setCurrentPage('settings')}
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
