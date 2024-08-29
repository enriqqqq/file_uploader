// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AuthProvider from './contexts/authProvider'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OtherPage from './pages/OtherPage'
import RequireAuth from './components/RequireAuth'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected route */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/other" element={<OtherPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>,
)
