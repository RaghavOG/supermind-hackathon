/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Home, MessageCircle, Menu, X } from 'lucide-react'

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

//   const navItems = [
//     { href: '/', label: 'Home', icon: Home },
//     { href: '/chatbot', label: 'Chat', icon: MessageCircle },
//   ]

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link href="/" className="text-xl font-bold">MyApp</Link>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-4">
//             {navItems.map((item) => (
//               <Link key={item.href} href={item.href}>
//                 <Button variant="ghost" className="text-white hover:text-gray-300">
//                   <item.icon className="w-4 h-4 mr-2" />
//                   {item.label}
//                 </Button>
//               </Link>
//             ))}
//           </nav>

//           <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
//             {isMenuOpen ? <X /> : <Menu />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden pb-4">
//             {navItems.map((item) => (
//               <Link key={item.href} href={item.href}>
//                 <Button variant="ghost" className="w-full text-left text-white hover:text-gray-300 py-2">
//                   <item.icon className="w-4 h-4 mr-2 inline" />
//                   {item.label}
//                 </Button>
//               </Link>
//             ))}
//           </nav>
//         )}
//       </div>
//     </header>
//   )
// }

// 'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Home, User, Briefcase, BookOpen, Image } from 'lucide-react'

export default function Navbar() {
  const [time, setTime] = useState<string>('')
  const [location] = useState('logo')

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Location */}
          <div className="text-sm text-zinc-400">{location}</div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 backdrop-blur-md bg-black/30 rounded-full p-2 border">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-zinc-300 hover:bg-white/10 transition-colors"
            >
              {/* <Home className="w-4 h-4" /> */}
              Home
            </Link>

            <Link
              href="/chatbot"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-zinc-300 hover:bg-white/10 transition-colors"
            >
              {/* <Briefcase className="w-4 h-4" /> */}
              Chat
            </Link>
            <Link
              href="/data/charts"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-zinc-300 hover:bg-white/10 transition-colors"
            >
              {/* <BookOpen className="w-4 h-4" /> */}
              Charts
            </Link>
           
          </nav>

          {/* Time */}
          <div className="text-sm text-zinc-400">{time}</div>
        </div>
      </div>
    </header>
  )
}

