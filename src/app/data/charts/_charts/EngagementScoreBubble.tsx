'use client'

import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

ChartJS.register(
  LinearScale,
  PointElement,
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

export function EngagementScore({ engagementByType }: EngagementProps) {
  const data = {
    datasets: engagementByType.map((item, index) => ({
      label: item.type,
      data: [{
        x: item.avgLikes,
        y: item.avgImpressions,
        r: Math.sqrt(item.avgEngagementRate * 5) // Scale bubble size based on engagement rate
      }],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ][index % 5]
    }))
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Average Likes',
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
      },
      y: {
        title: {
          display: true,
          text: 'Average Impressions',
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
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = context.raw
            const engagementType = engagementByType.find(
              item => item.type === context.dataset.label
            )
            return [
              `Type: ${context.dataset.label}`,
              `Likes: ${dataPoint.x.toFixed(1)}`,
              `Impressions: ${dataPoint.y.toFixed(1)}`,
              `Engagement Rate: ${(engagementType?.avgEngagementRate || 0).toFixed(2)}%`,
              `Saves: ${(engagementType?.avgSaves || 0).toFixed(1)}`,
              `Comments: ${(engagementType?.avgComments || 0).toFixed(1)}`
            ]
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
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      <DotPattern className={cn("absolute inset-0 bg-black opacity-10")} />
      <Card className="w-full relative z-10 bg-white bg-opacity-90">
        <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
          <CardTitle className="text-2xl font-bold">Engagement Distribution by Post Type</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px]">
            <Bubble data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

