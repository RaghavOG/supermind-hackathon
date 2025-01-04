'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Brain, Smile, ArrowRight, Send } from 'lucide-react'
import Hero from '@/components/Hero'
import Features from '@/components/features'

const messages = [
  "Hello! I'm not your average chatbot.",
  "I can help with tasks, answer questions, and even tell jokes!",
  "Want to see what makes me different?",
]

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant responses to your queries.',
  },
  {
    icon: Brain,
    title: 'AI-Powered',
    description: 'Leveraging cutting-edge AI for smarter conversations.',
  },
  {
    icon: Smile,
    title: 'Personality Plus',
    description: 'Engage in witty and entertaining dialogues.',
  },
]


export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [isDemo, setIsDemo] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [botResponse, setBotResponse] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBotResponse(`You said: "${userInput}". As a unique chatbot, I'd respond with something witty and engaging here!`)
    setUserInput('')
  }

  return (
   
    <main className="min-h-screen bg-black text-gray-100">
       <Hero/>
       <Features/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-20">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet <span className="text-blue-400">DifferentBot</span>
          </motion.h1>
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-gray-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl text-blue-300 h-24 flex items-center justify-center"
              >
                {messages[messageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-purple-400">
            What Makes Me Different?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-semibold mb-2 text-purple-300">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-purple-400">
            Try Me Out!
          </h2>
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto border border-gray-700">
            {!isDemo ? (
              <motion.button
                onClick={() => setIsDemo(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 mx-auto block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Demo Chat
              </motion.button>
            ) : (
              <div>
                <div className="mb-4 h-40 overflow-y-auto bg-gray-900 p-4 rounded-lg border border-gray-700">
                  {botResponse && <p className="text-blue-300">{botResponse}</p>}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-6 h-6" />
                  </motion.button>
                </form>
              </div>
            )}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-purple-400">
            Ready for the Full Experience?
          </h2>
          <motion.a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Chatting Now
            <ArrowRight className="ml-2" />
          </motion.a>
        </section>
      </div>
    </main>
  )
}

