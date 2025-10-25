import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const FloatingCircle = ({ size, color, style, duration = 15, delay = 0, initialY = 0, initialX = 0 }: any) => {
  const y = useMotionValue(initialY)
  const x = useMotionValue(initialX)
  const floatY = useTransform(y, [initialY, initialY + 20, initialY], [initialY, initialY + 20, initialY])
  const floatX = useTransform(x, [initialX, initialX + 30, initialX], [initialX, initialX + 30, initialX])

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        position: 'absolute',
        y: floatY,
        x: floatX,
        ...style,
      }}
      animate={{
        y: [initialY, initialY + 20, initialY],
        x: [initialX, initialX + 30, initialX],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleStudentSignUp = () => {
    // Store user role as 'student' in sessionStorage
    sessionStorage.setItem('userRole', 'student')
    navigate('/signup')
  }

  const handleTeacherSignUp = () => {
    // Store user role as 'teacher' in sessionStorage
    sessionStorage.setItem('userRole', 'teacher')
    navigate('/signup')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Animated Background Circles */}
      <FloatingCircle size={300} color="rgba(255, 255, 255, 0.1)" style={{ top: '10%', left: '5%' }} duration={20} />
      <FloatingCircle size={200} color="rgba(255, 255, 255, 0.15)" style={{ bottom: '15%', right: '10%' }} duration={18} delay={2} />
      <FloatingCircle size={150} color="rgba(255, 255, 255, 0.1)" style={{ top: '60%', left: '70%' }} duration={22} delay={4} />
      <FloatingCircle size={100} color="rgba(255, 255, 255, 0.2)" style={{ top: '30%', right: '20%' }} duration={16} delay={1} />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Welcome to <span className="text-yellow-300">Scrutinice</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Challenge your mind and sharpen your knowledge with engaging quizzes. 
          Whether you're a student looking to test yourself or a teacher creating quizzes, we've got you covered!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button
            onClick={handleStudentSignUp}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-300 hover:text-purple-700 transition-all transform hover:scale-105"
          >
            Get Started as a Student
          </button>

          <button
            onClick={handleTeacherSignUp}
            className="bg-yellow-300 text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105"
          >
            Get Started as a Teacher
          </button>
        </motion.div>

        {/* Login Link */}
        <motion.p
          className="mt-8 text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="underline font-semibold hover:text-yellow-300 transition"
          >
            Login
          </button>
        </motion.p>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-6 text-center text-sm opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p>© 2025 Scrutinice. All rights reserved.</p>
      </motion.div>
    </div>
  )
}

export default WelcomePage
