import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { ChartBarIcon, StarIcon } from '@heroicons/react/outline'

interface LeaderboardEntry {
  rank: number
  studentName: string
  points: number
  completionTime: string
  avatar?: string
}

interface QuizResult {
  quizId: string
  quizTitle: string
  category: string
  completedDate: string
  leaderboard: LeaderboardEntry[]
}

// Mock data - replace with API call
const mockResults: QuizResult[] = [
  {
    quizId: 'quiz-1',
    quizTitle: 'Algebra Basics',
    category: 'Mathematics',
    completedDate: '2025-10-20',
    leaderboard: [
      { rank: 1, studentName: 'Sarah Johnson', points: 98, completionTime: '25:30', avatar: '👩' },
      { rank: 2, studentName: 'Michael Chen', points: 95, completionTime: '27:15', avatar: '👨' },
      { rank: 3, studentName: 'Emily Davis', points: 92, completionTime: '28:45', avatar: '👧' },
      { rank: 4, studentName: 'David Wilson', points: 88, completionTime: '29:00', avatar: '👦' },
      { rank: 5, studentName: 'Jessica Brown', points: 85, completionTime: '29:30', avatar: '👩' },
    ],
  },
  {
    quizId: 'quiz-2',
    quizTitle: 'Chemical Reactions',
    category: 'Chemistry',
    completedDate: '2025-10-18',
    leaderboard: [
      { rank: 1, studentName: 'Alex Thompson', points: 100, completionTime: '20:00', avatar: '👨' },
      { rank: 2, studentName: 'Sophia Martinez', points: 96, completionTime: '22:30', avatar: '👩' },
      { rank: 3, studentName: 'Liam Anderson', points: 90, completionTime: '24:15', avatar: '👦' },
    ],
  },
]

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([])
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Fetch quiz results from API
    setResults(mockResults)
  }, [])

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600'
      case 2:
        return 'from-gray-300 to-gray-500'
      case 3:
        return 'from-orange-400 to-orange-600'
      default:
        return 'from-blue-400 to-blue-600'
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-6">
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChartBarIcon className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Results & Leaderboards</h1>
          </motion.div>
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            View leaderboards for completed quizzes
          </motion.p>
        </div>

        <div className="px-6 py-6 max-w-6xl mx-auto">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No quiz results available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Complete some quizzes to see results here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quiz List - Left Side */}
              <div className="lg:col-span-1 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Completed Quizzes</h2>
                {results.map((result, index) => (
                  <motion.button
                    key={result.quizId}
                    onClick={() => setSelectedQuiz(result.quizId)}
                    className={`w-full text-left bg-white rounded-xl p-4 shadow-md border-2 transition-all ${
                      selectedQuiz === result.quizId
                        ? 'border-indigo-500 shadow-lg'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <h3 className="font-bold text-gray-800 mb-1">{result.quizTitle}</h3>
                    <p className="text-sm text-gray-600 mb-2">{result.category}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>📅 {result.completedDate}</span>
                      <span>•</span>
                      <span>👥 {result.leaderboard.length} students</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Leaderboard - Right Side */}
              <div className="lg:col-span-2">
                {selectedQuiz ? (
                  (() => {
                    const quiz = results.find((r) => r.quizId === selectedQuiz)
                    return quiz ? (
                      <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800">{quiz.quizTitle}</h2>
                            <p className="text-gray-600">{quiz.category}</p>
                          </div>
                          <ChartBarIcon className="w-12 h-12 text-indigo-500" />
                        </div>

                        {/* Leaderboard Entries */}
                        <div className="space-y-3">
                          {quiz.leaderboard.map((entry, index) => (
                            <motion.div
                              key={index}
                              className={`flex items-center gap-4 p-4 rounded-xl ${
                                entry.rank <= 3
                                  ? `bg-gradient-to-r ${getRankColor(entry.rank)} text-white`
                                  : 'bg-gray-50 border border-gray-200'
                              }`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                              {/* Rank */}
                              <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                                  entry.rank <= 3 ? 'bg-white bg-opacity-30' : 'bg-indigo-100 text-indigo-700'
                                }`}
                              >
                                {getRankBadge(entry.rank)}
                              </div>

                              {/* Avatar */}
                              <div className="text-3xl">{entry.avatar || '👤'}</div>

                              {/* Student Info */}
                              <div className="flex-1">
                                <h3
                                  className={`font-bold ${
                                    entry.rank <= 3 ? 'text-white' : 'text-gray-800'
                                  }`}
                                >
                                  {entry.studentName}
                                </h3>
                                <p
                                  className={`text-sm ${
                                    entry.rank <= 3 ? 'text-white text-opacity-90' : 'text-gray-600'
                                  }`}
                                >
                                  ⏱️ {entry.completionTime}
                                </p>
                              </div>

                              {/* Points */}
                              <div className="text-right">
                                <div className="flex items-center gap-1">
                                  <StarIcon
                                    className={`w-5 h-5 ${
                                      entry.rank <= 3 ? 'text-white' : 'text-yellow-500'
                                    }`}
                                  />
                                  <span
                                    className={`text-2xl font-bold ${
                                      entry.rank <= 3 ? 'text-white' : 'text-indigo-600'
                                    }`}
                                  >
                                    {entry.points}
                                  </span>
                                </div>
                                <p
                                  className={`text-xs ${
                                    entry.rank <= 3 ? 'text-white text-opacity-80' : 'text-gray-500'
                                  }`}
                                >
                                  points
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null
                  })()
                ) : (
                  <div className="flex items-center justify-center h-full bg-white rounded-2xl shadow-lg border border-indigo-100 p-12">
                    <div className="text-center">
                      <ChartBarIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">Select a quiz to view its leaderboard</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default ResultsPage
