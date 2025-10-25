import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const handleSendVerificationCode = () => setShowVerification(true)

  const handleGoogleLogin = () => alert('Google login flow here')

  const handleVerifyAndLogin = () => {
    // Get user role from sessionStorage
    const userRole = sessionStorage.getItem('userRole')
    
    // Redirect based on user role
    if (userRole === 'teacher') {
      navigate('/create')
    } else {
      navigate('/browse')
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white border-opacity-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-2 text-center">Login</h2>
          <p className="text-gray-200 text-center mb-6">Welcome back to Scrutinice</p>

          {/* Toggle Login Method */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                loginMethod === 'email' ? 'bg-accent text-white' : 'bg-white bg-opacity-20 text-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                loginMethod === 'phone' ? 'bg-accent text-white' : 'bg-white bg-opacity-20 text-gray-200'
              }`}
            >
              Phone
            </button>
          </div>

          {!showVerification ? (
            <>
              {/* Email or Phone Input */}
              {loginMethod === 'email' ? (
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 mb-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 mb-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              )}

              {/* Password Input - NEW ADDITION */}
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              {/* Send Verification Code Button */}
              <button
                onClick={handleSendVerificationCode}
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition mb-4"
              >
                Send Verification Code
              </button>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </>
          ) : (
            <>
              {/* Verification Code Input */}
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              {/* Verify and Login Button */}
              <button
                onClick={handleVerifyAndLogin}
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Verify and Login
              </button>
            </>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-gray-200 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-accent font-semibold underline hover:text-white transition"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default LoginPage
