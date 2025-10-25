import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { PlusIcon, TrashIcon, PhotographIcon } from '@heroicons/react/outline'

interface MCQQuestion {
  type: 'mcq'
  questionImage: File | null
  questionImagePreview: string
  correctAnswer: 'A' | 'B' | 'C' | 'D' | null
}

interface FillInBlankQuestion {
  type: 'fill-in-blank'
  questionImage: File | null
  questionImagePreview: string
  correctAnswer: string
}

type Question = MCQQuestion | FillInBlankQuestion

const CreateQuizPage: React.FC = () => {
  // Quiz details state
  const [category, setCategory] = useState('')
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public')
  const [quizName, setQuizName] = useState('')
  const [timeLimit, setTimeLimit] = useState('')
  const [quizType, setQuizType] = useState<'mcq' | 'fill-in-blank'>('mcq')
  const [pointsPerQuestion, setPointsPerQuestion] = useState('')
  const [totalPoints, setTotalPoints] = useState('')

  // Questions state
  const [questions, setQuestions] = useState<Question[]>([])
  const [generatedCode, setGeneratedCode] = useState('')

  const categories = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Further Maths', 'English']

  const addQuestion = () => {
    if (quizType === 'mcq') {
      setQuestions([
        ...questions,
        {
          type: 'mcq',
          questionImage: null,
          questionImagePreview: '',
          correctAnswer: null,
        },
      ])
    } else {
      setQuestions([
        ...questions,
        {
          type: 'fill-in-blank',
          questionImage: null,
          questionImagePreview: '',
          correctAnswer: '',
        },
      ])
    }
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleImageUpload = (index: number, file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedQuestions = [...questions]
        updatedQuestions[index].questionImage = file
        updatedQuestions[index].questionImagePreview = reader.result as string
        setQuestions(updatedQuestions)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateMCQAnswer = (index: number, answer: 'A' | 'B' | 'C' | 'D') => {
    const updatedQuestions = [...questions]
    if (updatedQuestions[index].type === 'mcq') {
      updatedQuestions[index].correctAnswer = answer
      setQuestions(updatedQuestions)
    }
  }

  const updateFillInBlankAnswer = (index: number, answer: string) => {
    const updatedQuestions = [...questions]
    if (updatedQuestions[index].type === 'fill-in-blank') {
      updatedQuestions[index].correctAnswer = answer
      setQuestions(updatedQuestions)
    }
  }

  const generateQuizCode = () => {
    // Generate random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setGeneratedCode(code)
  }

  const handleSubmit = () => {
    // TODO: Submit quiz to backend
    console.log({
      category,
      privacy,
      quizName,
      timeLimit,
      quizType,
      pointsPerQuestion,
      totalPoints,
      questions,
    })
    alert('Quiz created successfully!')
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Quiz
          </motion.h1>
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Design your quiz with custom questions and settings
          </motion.p>
        </div>

        <div className="px-6 py-6 max-w-4xl mx-auto">
          {/* Quiz Details Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Quiz Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                >
                  <option value="">Choose category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Privacy */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Quiz Privacy
                </label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as 'public' | 'private')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              {/* Quiz Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Input Quiz Name
                </label>
                <input
                  type="text"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  placeholder="e.g., Algebra Basics"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                />
              </div>

              {/* Time Limit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Set Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  placeholder="e.g., 30"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                />
              </div>

              {/* Quiz Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Quiz Type
                </label>
                <select
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value as 'mcq' | 'fill-in-blank')}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                >
                  <option value="mcq">Multiple Choice (MCQ)</option>
                  <option value="fill-in-blank">Fill in the Blank</option>
                </select>
              </div>

              {/* Points Per Question */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Points Per Question
                </label>
                <input
                  type="number"
                  value={pointsPerQuestion}
                  onChange={(e) => setPointsPerQuestion(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                />
              </div>

              {/* Total Points */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Points for Quiz
                </label>
                <input
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(e.target.value)}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                />
              </div>
            </div>
          </motion.div>

          {/* Questions Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Quiz Questions</h2>
              <button
                onClick={addQuestion}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <PlusIcon className="w-5 h-5" />
                Add Question
              </button>
            </div>

            {/* Horizontal Scrollable Questions Container */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-4 border-2 border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-gray-800">Question {index + 1}</h3>
                      <button
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Question Image
                      </label>
                      <div className="relative">
                        {question.questionImagePreview ? (
                          <div className="relative">
                            <img
                              src={question.questionImagePreview}
                              alt="Question preview"
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => handleImageUpload(index, null)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
                            <PhotographIcon className="w-10 h-10 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, e.target.files?.[0] || null)}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Answer Input Based on Type */}
                    {question.type === 'mcq' ? (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Correct Answer
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {(['A', 'B', 'C', 'D'] as const).map((option) => (
                            <button
                              key={option}
                              onClick={() => updateMCQAnswer(index, option)}
                              className={`py-2 rounded-lg font-bold transition ${
                                question.correctAnswer === option
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Correct Answer
                        </label>
                        <input
                          type="text"
                          value={question.correctAnswer}
                          onChange={(e) => updateFillInBlankAnswer(index, e.target.value)}
                          placeholder="Type the correct answer"
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {questions.length === 0 && (
                  <div className="text-center text-gray-500 py-8 w-full">
                    No questions added yet. Click "Add Question" to start.
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Generate Code & Submit Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Code & Submission</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <button
                onClick={generateQuizCode}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Generate Quiz Code
              </button>

              {generatedCode && (
                <div className="flex-1 bg-purple-100 border-2 border-purple-300 rounded-lg px-6 py-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-700">{generatedCode}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition"
            >
              Create Quiz
            </button>
          </motion.div>
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default CreateQuizPage
