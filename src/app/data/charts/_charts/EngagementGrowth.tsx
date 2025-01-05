/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface EngagementGrowthProps {
  dailyEngagement: Record<string, {
    likes: number
    shares: number
    comments: number
    saves: number
    impressions: number
    reach: number
    profileVisits: number
    engagementRate: number
  }>
}

export function EngagementGrowth({ dailyEngagement }: EngagementGrowthProps) {
  const dates = Object.keys(dailyEngagement).sort()
  
  const calculateTotalEngagement = (date: string) => {
    const data = dailyEngagement[date]
    return data.likes + data.shares + data.comments + data.saves
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Total Engagement',
        data: dates.map(calculateTotalEngagement),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.4,
        pointRadius: 3
      },
      {
        label: 'Reach',
        data: dates.map(date => dailyEngagement[date].reach),
        fill: true,
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: 'rgba(249, 115, 22, 1)',
        tension: 0.4,
        pointRadius: 3
      },
      {
        label: 'Engagement Rate',
        data: dates.map(date => dailyEngagement[date].engagementRate),
        fill: false,
        borderColor: 'rgba(139, 92, 246, 1)',
        tension: 0.4,
        pointRadius: 3,
        yAxisID: 'percentage'
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
            const label = context.dataset.label
            const value = context.raw
            if (label === 'Engagement Rate') {
              return `${label}: ${value.toFixed(1)}%`
            }
            return `${label}: ${value.toLocaleString()}`
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
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          callback: function (tickValue: string | number) {
            const value = Number(tickValue);
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
            return value
          }
        }
      },
      percentage: {
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          callback: function (tickValue: string | number) {
            const value = Number(tickValue);
            return `${value.toFixed(1)}%`;
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
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold">Engagement Growth Trends</CardTitle>
          <p className="text-sm opacity-80">
            Daily engagement metrics and reach
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px]">
            <Line data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

