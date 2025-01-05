/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DataItem } from "@/types";
import { processData } from "@/utils/processing";
import { EngagementPieChart } from "./_charts/EngagementPieChart";
import { EngagementSummary } from "./_charts/EngagementSummary";
import { TotalEngagement } from "./_charts/TotalEngagement";
import { PostPerformanceGraph } from "./_charts/PostPerformanceGraph";
import { PostTypeComparison } from "./_charts/PostTypeComparison";
import { EngagementGrowth } from "./_charts/EngagementGrowth";
import { PostTypeRadar } from "./_charts/PostTypeComparision";
import { EngagementRate } from "./_charts/EngagementRatePerPostType";
import { EngagementScore } from "./_charts/EngagementScoreBubble";
import { motion } from "framer-motion"

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>([])
  const [processedData, setProcessedData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("latestData")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        setProcessedData(processData(parsedData))
      } else {
        const response = await fetch("/api/pullData")
        const result = await response.json()
        if (response.ok) {
          localStorage.setItem("latestData", JSON.stringify(result.data))
          setData(result.data)
          setProcessedData(processData(result.data))
        } else {
          console.error(result.error)
        }
      }
    }

    fetchData()
  }, [])

  if (!processedData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Engagement Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EngagementPieChart
          likes={processedData.totalLikes}
          shares={processedData.totalShares}
          comments={processedData.totalComments}
          saves={processedData.totalSaves}
          profileVisits={processedData.totalProfileVisits}
        />
        <TotalEngagement 
          likes={processedData.totalLikes}
          shares={processedData.totalShares}
          comments={processedData.totalComments}
          saves={processedData.totalSaves}
          impressions={processedData.totalImpressions}
          reach={processedData.totalReach}
          profileVisits={processedData.totalProfileVisits}
        />
      </div>
      <EngagementSummary engagementByType={processedData.engagementByType} />
      <PostPerformanceGraph dailyEngagement={processedData.dailyEngagement} />
      <PostTypeComparison engagementByType={processedData.engagementByType} />
        <EngagementGrowth dailyEngagement={processedData.dailyEngagement} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PostTypeRadar engagementByType={processedData.engagementByType} />
        <EngagementRate engagementByType={processedData.engagementByType} />
        <EngagementScore engagementByType={processedData.engagementByType} />
      </div>
    </motion.div>
  )
}

