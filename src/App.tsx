import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import BrowsePage from './pages/BrowsePage'
import CategoryQuizzesPage from './pages/CategoryQuizzesPage'
import CreateQuizPage from './pages/CreateQuizPage'
import ResultsPage from './pages/ResultsPage'
import ProfilePage from './pages/ProfilePage'
import QuizTakingPage from './pages/QuizTakingPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Routes */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/:category" element={<CategoryQuizzesPage />} />
        <Route path="/quiz/:quizId" element={<QuizTakingPage />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
