import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ClockIcon, XIcon, CheckIcon } from '@heroicons/react/outline'

interface Question {
  id: string
  type: 'mcq' | 'fill-in-blank'
  questionImage: string
  options?: string[] // For MCQ
  correctAnswer: string
}

interface Quiz {
  id: string
  title: string
  category: string
  timeLimit: number // in minutes
  questions: Question[]
  pointsPerQuestion: number
}

// Mock quiz data - replace with API call
const mockQuiz: Quiz = {
  id: 'quiz-1',
  title: 'Algebra Basics',
  category: 'Mathematics',
  timeLimit: 30,
  pointsPerQuestion: 5,
  questions: [
    {
      id: 'q1',
      type: 'mcq',
      questionImage: 'https://via.placeholder.com/600x300?text=Question+1+Image',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'B',
    },
    {
      id: 'q2',
      type: 'mcq',
      questionImage: 'https://via.placeholder.com/600x300?text=Question+2+Image',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
    },
    {
      id: 'q3',
      type: 'fill-in-blank',
      questionImage: 'https://via.placeholder.com/600x300?text=Question+3+Image',
      correctAnswer: 'answer',
    },
  ],
}

const QuizTakingPage: React.FC = () => {
  const navigate = useNavigate()
  const { quizId } = useParams<{ quizId: string }>()
  
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // TODO: Fetch quiz data from API using quizId
    setQuiz(mockQuiz)
    setTimeRemaining(mockQuiz.timeLimit * 60) // Convert to seconds
  }, [quizId])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmitQuiz()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answer: string) => {
    if (!quiz) return
    const currentQuestion = quiz.questions[currentQuestionIndex]
    setAnswers({ ...answers, [currentQuestion.id]: answer })
  }

  const handleNextQuestion = () => {
    if (!quiz) return
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setIsSubmitting(true)
    
    // Calculate score
    if (!quiz) return
    let score = 0
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id]?.toLowerCase().trim()
      const correctAnswer = question.correctAnswer.toLowerCase().trim()
      if (userAnswer === correctAnswer) {
        score += quiz.pointsPerQuestion
      }
    })

    // TODO: Submit to backend
    setTimeout(() => {
      alert(`Quiz completed! Your score: ${score}/${quiz.questions.length * quiz.pointsPerQuestion}`)
      navigate('/results')
    }, 1000)
  }

  const handleQuitQuiz = () => {
    const confirmed = window.confirm('Are you sure you want to quit? Your progress will be lost.')
    if (confirmed) {
      navigate('/browse')
    }
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <p className="text-xl text-gray-600">Loading quiz...</p>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Header with Timer and Progress */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
              <p className="text-sm text-gray-600">{quiz.category}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <ClockIcon className="w-5 h-5" />
                <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
              </div>

              {/* Quit Button */}
              <button
                onClick={handleQuitQuiz}
                className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                title="Quit Quiz"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          key={currentQuestionIndex}
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Question Image */}
          <div className="mb-6">
            <img
              src={currentQuestion.questionImage}
              alt={`Question ${currentQuestionIndex + 1}`}
              className="w-full rounded-xl shadow-md"
            />
          </div>

          {/* Answer Options */}
          {currentQuestion.type === 'mcq' && currentQuestion.options ? (
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  className={`py-4 px-6 rounded-xl font-bold text-xl transition-all ${
                    answers[currentQuestion.id] === option
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type your answer:
              </label>
              <input
                type="text"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder="Enter your answer here"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition text-lg"
              />
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
            }`}
          >
            ← Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition shadow-lg"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <CheckIcon className="w-5 h-5" />
                  Submit Quiz
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition shadow-lg"
            >
              Next →
            </button>
          )}
        </div>

        {/* Question Navigator */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Question Navigator:</p>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-lg font-bold transition ${
                  index === currentQuestionIndex
                    ? 'bg-purple-600 text-white'
                    : answers[quiz.questions[index].id]
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizTakingPage
