/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

interface EngagementType {
  type: string
  avgLikes: number
  avgShares: number
  avgComments: number
  avgSaves: number
  avgImpressions: number
  avgReach: number
  avgEngagementRate: number
}

interface EngagementProps {
  engagementByType: EngagementType[]
}

export function EngagementRate({ engagementByType }: EngagementProps) {
  const data = {
    labels: engagementByType.map(item => item.type),
    datasets: [
      {
        label: 'Engagement Rate',
        data: engagementByType.map(item => item.avgEngagementRate.toFixed(2)),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Reach Rate',
        data: engagementByType.map(item => (item.avgReach / item.avgImpressions * 100).toFixed(2)),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetLabel = context.dataset.label
            const value = context.raw
            return `${datasetLabel}: ${value}%`
          }
        }
      },
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rate (%)',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardTitle className="text-2xl font-bold">Engagement & Reach Rates by Post Type</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px]">
            <Bar data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
