import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const [signUpMethod, setSignUpMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const handleSendVerificationCode = () => setShowVerification(true)
  const handleGoogleSignUp = () => alert('Google Sign Up flow here')
  const handleVerifyAndLogin = () => navigate('/login')

  return (
    <>
      <Navbar />
      <motion.div className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex justify-center items-center px-6 pt-20 text-white font-sans overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6"
        >
          <h2 className="text-4xl font-bold text-center">Sign Up</h2>
          <p className="text-center text-sm text-gray-200">Create your Scrutinice account</p>

          <div className="flex space-x-2">
            <button
              onClick={() => setSignUpMethod('email')}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                signUpMethod === 'email' ? 'bg-accent text-white' : 'bg-white bg-opacity-20 text-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setSignUpMethod('phone')}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                signUpMethod === 'phone' ? 'bg-accent text-white' : 'bg-white bg-opacity-20 text-gray-200'
              }`}
            >
              Phone
            </button>
          </div>

          {signUpMethod === 'email' ? (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          ) : (
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          )}

          {/* Password inputs */}
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {/* Buttons */}
          {!showVerification ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendVerificationCode}
              className="w-full py-3 rounded-lg bg-accent text-white font-semibold shadow-lg hover:bg-pink-600 transition"
            >
              Send Verification Code
            </motion.button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent mb-4"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVerifyAndLogin}
                className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
              >
                Verify & Continue to Login
              </motion.button>
            </>
          )}

          <div className="flex items-center space-x-2 my-4">
            <div className="flex-1 h-px bg-white bg-opacity-30"></div>
            <span className="text-sm text-gray-300">OR</span>
            <div className="flex-1 h-px bg-white bg-opacity-30"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignUp}
            className="w-full py-3 rounded-lg bg-white text-primary font-semibold shadow-lg hover:bg-gray-100 transition flex items-center justify-center space-x-2"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span>Sign up with Google</span>
          </motion.button>

          <p className="text-center text-sm text-gray-200 mt-4">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-accent font-semibold underline">
              Login
            </button>
          </p>
        </motion.div>
      </motion.div>
    </>
  )
}

export default SignUpPage
