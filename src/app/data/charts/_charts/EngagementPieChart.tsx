/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

ChartJS.register(ArcElement, Tooltip, Legend)

interface EngagementPieChartProps {
  likes: number
  shares: number
  comments: number
  saves: number
  profileVisits: number
}

export function EngagementPieChart({
  likes,
  shares,
  comments,
  saves,
  profileVisits
}: EngagementPieChartProps) {
  
  const [chartData, setChartData] = useState<{
    labels: string[],
    datasets: { data: number[], backgroundColor: string[], hoverBackgroundColor: string[], borderWidth: number, borderColor: string[] }[]
  }>({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [], borderWidth: 1, borderColor: [] }]
  })

  useEffect(() => {
    const data = {
      labels: ['Likes', 'Shares', 'Comments', 'Saves', 'Profile Visits'],
      datasets: [
        {
          data: [likes, shares, comments, saves, profileVisits],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 2,
          borderColor: Array(5).fill('rgba(255, 255, 255, 0.8)')
        }
      ]
    }
    setChartData(data)
  }, [likes, shares, comments, saves, profileVisits])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value.toLocaleString()} (${percentage}%)`
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden bg-black text-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold">Engagement Distribution</CardTitle>
          <p className="text-sm opacity-80">
            Direct engagement metrics comparison
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px] flex items-center justify-center">
            <Pie data={chartData} options={options} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {chartData.labels.map((label, index) => (
              <motion.div
                key={label}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                ></span>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
