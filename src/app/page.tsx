/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Brain, Smile, ArrowRight, Send } from 'lucide-react'
import Image from 'next/image'
import Hero from '@/components/Hero'
import Features from '@/components/features'
import TechStack from "@/components/tech-stack"
import About from "@/components/About"

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
       <TechStack/>
       <About/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">





        <section className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-8xl  mb-8 ">
            Ready for the Full Experience?
          </h2>
          <motion.a
            href="#"
            className="bg-[#e100b8] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
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

