'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThumbsUp, Share2, MessageSquare, Bookmark, Eye, Target, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

interface TotalEngagementProps {
  likes: number
  shares: number
  comments: number
  saves: number
  impressions: number
  reach: number
  profileVisits: number
}

export function TotalEngagement({
  likes,
  shares,
  comments,
  saves,
  impressions,
  reach,
  profileVisits,
}: TotalEngagementProps) {
  const metrics = [
    { label: 'Likes', value: likes, icon: ThumbsUp },
    { label: 'Comments', value: comments, icon: MessageSquare },
    { label: 'Shares', value: shares, icon: Share2 },
    { label: 'Saves', value: saves, icon: Bookmark },
    { label: 'Impressions', value: impressions, icon: Eye },
    { label: 'Reach', value: reach, icon: Target },
    { label: 'Profile Visits', value: profileVisits, icon: UserPlus },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden ">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <CardTitle className="text-2xl font-bold">Total Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {metrics.map(({ label, value, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 + 0.2 }}
                >
                  {value.toLocaleString()}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

