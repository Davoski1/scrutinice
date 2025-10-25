import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const categories = [
  { name: 'Mathematics', icon: '🔢', color: 'from-blue-500 to-blue-600' },
  { name: 'Physics', icon: '⚛️', color: 'from-purple-500 to-purple-600' },
  { name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-green-600' },
  { name: 'Biology', icon: '🧬', color: 'from-teal-500 to-teal-600' },
  { name: 'Further Maths', icon: '📐', color: 'from-indigo-500 to-indigo-600' },
  { name: 'English', icon: '📚', color: 'from-pink-500 to-pink-600' },
]

const BrowsePage: React.FC = () => {
  const navigate = useNavigate()
  const [quizCode, setQuizCode] = useState('')

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to category-specific page
    navigate(`/browse/${categoryName.toLowerCase().replace(' ', '-')}`)
  }

  const handleJoinPrivateQuiz = () => {
    if (quizCode.trim()) {
      // Navigate to quiz with the code
      navigate(`/quiz/${quizCode}`)
    } else {
      alert('Please enter a valid quiz code')
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8 px-6">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Browse Quizzes
          </motion.h1>
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Choose a category or enter a private quiz code
          </motion.p>
        </div>

        {/* Private Quiz Code Section */}
        <div className="px-6 py-6">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Join Private Quiz
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Have a quiz code from your teacher? Enter it below to access the private quiz.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter quiz code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition"
              />
              <button
                onClick={handleJoinPrivateQuiz}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Join
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quiz Categories */}
        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`bg-gradient-to-br ${category.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold">{category.name}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default BrowsePage
