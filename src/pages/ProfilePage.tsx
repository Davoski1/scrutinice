import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  UserCircleIcon, 
  PhotographIcon, 
  LogoutIcon, 
  TrashIcon,
  PencilIcon 
} from '@heroicons/react/outline'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  
  // User profile state
  const [username, setUsername] = useState('John Doe')
  const [email] = useState('john.doe@example.com')

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [tempUsername, setTempUsername] = useState(username)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveUsername = () => {
    setUsername(tempUsername)
    setIsEditing(false)
    // TODO: Save to backend
    alert('Username updated successfully!')
  }

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear()
    // TODO: Clear authentication tokens
    alert('Logging out...')
    navigate('/')
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
    if (confirmed) {
      // TODO: Call delete account API
      alert('Account deleted successfully')
      sessionStorage.clear()
      navigate('/')
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-8 px-6">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Profile
          </motion.h1>
          <motion.p
            className="text-lg opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Manage your account settings
          </motion.p>
        </div>

        <div className="px-6 py-6 max-w-2xl mx-auto">
          {/* Profile Picture Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Picture</h2>
            
            <div className="flex flex-col items-center">
              {/* Profile Image Display */}
              <div className="relative mb-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-500"
                  />
                ) : (
                  <UserCircleIcon className="w-32 h-32 text-gray-400" />
                )}
                
                {/* Upload Button Overlay */}
                <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition shadow-lg">
                  <PhotographIcon className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                Click the camera icon to upload a new profile picture
              </p>
            </div>
          </motion.div>

          {/* Username Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Username</h2>
            
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition"
                  placeholder="Enter your username"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveUsername}
                    className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setTempUsername(username)
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{username}</p>
                  <p className="text-sm text-gray-600 mt-1">{email}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-200 transition"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
              </div>
            )}
          </motion.div>

          {/* Stats Section (Optional) */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <p className="text-3xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600 mt-1">Quizzes Taken</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-600">850</p>
                <p className="text-sm text-gray-600 mt-1">Total Points</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                <p className="text-3xl font-bold text-purple-600">5</p>
                <p className="text-sm text-gray-600 mt-1">Day Streak</p>
              </div>
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              <LogoutIcon className="w-6 h-6" />
              Logout
            </button>

            {/* Delete Account Button */}
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              <TrashIcon className="w-6 h-6" />
              Delete Account
            </button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-6 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p>Member since October 2025</p>
          </motion.div>
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default ProfilePage
