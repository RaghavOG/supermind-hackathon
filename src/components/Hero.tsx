'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { WavyBackground } from "@/components/ui/wavy-background"

export default function HeroSection() {
  return (
    <WavyBackground className="max-w-full overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6">
              Empower Your Journey
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              Unlock the full potential of your online presence with our cutting-edge solutions. We blend creativity and technology to deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="default">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Hero Graphic"
              width={400}
              height={400}
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}

