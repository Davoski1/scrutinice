import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

const HeroSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary text-white px-6 pt-20"
  >
    <h1 className="text-6xl font-extrabold mb-6 drop-shadow">
      Welcome to <span className="text-accent">Scrutinice</span>
    </h1>
    <p className="text-xl mb-10 max-w-xl text-center">
      Challenge your mind and sharpen your knowledge with engaging quizzes across various topics.
    </p>
  </motion.div>
)

const Homepage: React.FC = () => (
  <>
    <Navbar />
    <HeroSection />
  </>
)

export default Homepage
