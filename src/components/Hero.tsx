'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { WavyBackground } from "@/components/ui/wavy-background"

export default function HeroSection() {
  return (
    <WavyBackground className="w-full min-h-screen flex items-center">
      <div className="w-full px-[5%] lg:px-[10%]"> {/* Adjusted padding for better mobile view */}
        <div className="w-full max-w-8xl mx-auto py-16 sm:py-20 lg:py-32"> {/* Adjusted padding for mobile */}
          <div className="flex flex-col lg:flex-row items-center justify-around gap-12">
            <div className="w-full lg:w-1/2 lg:pr-8">

              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 lg:mb-6 font-akira bg-gradient-to-br from-zinc-100  to-zinc-300 bg-clip-text text-transparent">
                Social Media Analytics
              </h1>
              <h3 className="text-2xl sm:text-3xl lg:text-3xl text-zinc-200 mb-4 lg:mb-6 font-sans font-semibold">
                with Langflow and DataStax
              </h3>
              <p className="text-lg sm:text-lg lg:text-2xl font-sans text-zinc-200 mb-8 leading-snug">
                We leverage Langflow and DataStax Astra DB to analyze engagement data and generate actionable insights, helping optimize content strategies with ease.
              </p>
              <div className=" group flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" variant="default" className="w-full sm:w-auto bg-purple-700 hover:bg-white text-white hover:text-purple-700 font-semibold transition-colors duration-300">
                  <Link href="/chatbot">
                    Chatbot
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="default" className="w-full sm:w-auto bg-white hover:bg-purple-700 text-purple-700 hover:text-white font-semibold transition-colors duration-300">
                  <Link href="/data/charts">
                    Charts
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <Image
                src="/heroAnimate2.gif"
                alt="Hero Graphic"
                width={500}
                height={500}
                className="rounded-lg max-w-full h-auto hidden lg:block" // Hidden on mobile, visible on large screens
              />
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}
