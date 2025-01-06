/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Smile, ArrowRight, Send } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/features";
import TechStack from "@/components/tech-stack";
import About from "@/components/About";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-100 font-sans">
      <Hero />

      <Features />
      <TechStack />
      <VelocityScroll className="py-16">
        {" "}
        Growth Reach Performance Engagement{" "}
      </VelocityScroll>

      <About />

      <div
        className="bg-center md:bg-auto min-h-screen"
        style={{
          backgroundImage: "url('/last-background.jpg')",
          backgroundSize: "cover", // Ensures the background image covers the entire screen
          backgroundPosition: "center", // Centers the image
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-svh flex justify-center items-center">
          <section className="text-center">
            <h2 className="text-4xl md:text-6xl lg:text-8xl  mb-8 font-bold ">
              Ready for the Full Experience?
            </h2>
            <motion.div
              className="bg-[#e100b8] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/chatbot">Start Chatting Now</Link>

              <ArrowRight className="ml-2" />
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
