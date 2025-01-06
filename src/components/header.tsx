'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Home, MessageSquare, BarChart2, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [time, setTime] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Chatbot', href: '/chatbot', icon: MessageSquare },
    { name: 'Charts', href: '/data/charts', icon: BarChart2 },
    { name: 'All Data', href: '/data/complete-data', icon: BarChart2 }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              NeuralNitwits
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href} name={item.name} icon={item.icon} isActive={pathname === item.href} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>

          {/* Time */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-zinc-400"
          >
            {time}
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <MobileNavLink key={item.name} href={item.href} name={item.name} icon={item.icon} isActive={pathname === item.href} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ href, name, icon: Icon, isActive }: { href: string; name: string; icon: React.ElementType; isActive: boolean }) {
  return (
    <Link href={href} passHref>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center px-4 py-2 rounded-full text-lg transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
            : 'text-zinc-300  hover:text-white'
        }`}
      >
        <Icon className={`w-5 h-5 mr-2 ${isActive ? 'animate-pulse' : ''}`} />
        {name}
      </motion.a>
    </Link>
  )
}

function MobileNavLink({ href, name, icon: Icon, isActive }: { href: string; name: string; icon: React.ElementType; isActive: boolean }) {
  return (
    <Link href={href} passHref>
      <motion.a
        whileTap={{ scale: 0.95 }}
        className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
            : 'text-zinc-300 hover:bg-gray-800 hover:text-white'
        }`}
      >
        <div className="flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${isActive ? 'animate-pulse' : ''}`} />
          {name}
        </div>
      </motion.a>
    </Link>
  )
}

