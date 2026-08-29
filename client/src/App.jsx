import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './state/AuthContext'
import { ThemeProvider } from './state/ThemeContext'
import MainLayout from './layouts/MainLayout'
import PageTransition from './layouts/PageTransition'
import Login from './pages/Login'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import { useAuth } from './hooks/useAuth'

function ProtectedApp() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <MainLayout>
      <PageTransition>
        <Routes>
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/discover" replace />} />
        </Routes>
      </PageTransition>
    </MainLayout>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProtectedApp />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
