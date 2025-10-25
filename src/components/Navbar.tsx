import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon, SearchIcon, ChartBarIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/outline'

const navItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: SearchIcon, label: 'Browse', path: '/browse' },
  { icon: ChartBarIcon, label: 'Results', path: '/results' },
  { icon: PlusCircleIcon, label: 'Create', path: '/create' },
  { icon: UserCircleIcon, label: 'Profile', path: '/profile' },
]

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 max-w-screen-lg mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center text-gray-700 hover:text-accent transition ${
              location.pathname === path ? 'text-accent font-semibold' : ''
            }`}
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
