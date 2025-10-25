import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, ClockIcon, StarIcon } from '@heroicons/react/outline'

interface Quiz {
  id: string
  title: string
  description: string
  duration: number // in minutes
  questions: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  points: number
  creator: string
}

// Mock data - replace with API call
const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Algebra Basics',
    description: 'Test your understanding of algebraic expressions and equations',
    duration: 30,
    questions: 20,
    difficulty: 'Easy',
    points: 100,
    creator: 'Mr. Johnson',
  },
  {
    id: 'quiz-2',
    title: 'Advanced Calculus',
    description: 'Challenge yourself with derivatives and integrals',
    duration: 45,
    questions: 25,
    difficulty: 'Hard',
    points: 250,
    creator: 'Dr. Smith',
  },
]

const CategoryQuizzesPage: React.FC = () => {
  const navigate = useNavigate()
  const { category } = useParams<{ category: string }>()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    // TODO: Fetch quizzes for this category from API
    // For now, use mock data
    setQuizzes(mockQuizzes)
  }, [category])

  const handleQuizClick = (quizId: string) => {
    navigate(`/quiz/${quizId}`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'Hard':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const categoryDisplay = category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8 px-6">
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center text-white mb-4 hover:opacity-80 transition"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to Categories
          </button>
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categoryDisplay}
          </motion.h1>
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {quizzes.length} public quizzes available
          </motion.p>
        </div>

        {/* Quiz List */}
        <div className="px-6 py-6">
          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No quizzes available in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => handleQuizClick(quiz.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                        quiz.difficulty
                      )}`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{quiz.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{quiz.duration} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">📝</span>
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span>{quiz.points} points</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Created by <span className="font-semibold text-purple-600">{quiz.creator}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default CategoryQuizzesPage
