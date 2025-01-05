'use client'

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export interface DataItem {
  _id: string
  post_id: string
  post_type: string
  likes: string
  shares: string
  comments: string
  saves: string
  impressions: string
  reach: string
  profile_visits: string
  follower_count: string
  date_posted: string
  'engagement-rate': string
}

const ITEMS_PER_PAGE = 10

export default function EnhancedEngagementMetrics() {
  const [allData, setAllData] = useState<DataItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const storedData = localStorage.getItem('latestData')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setAllData(parsedData)
        setTotalPages(Math.ceil(parsedData.length / ITEMS_PER_PAGE))
      } else {
        try {
          const response = await fetch('/api/pullData')
          const result = await response.json()
          if (response.ok) {
            setAllData(result.data)
            setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE))
            localStorage.setItem('latestData', JSON.stringify(result.data))
          } else {
            console.error(result.error)
          }
        } catch (error) {
          console.error("Failed to fetch data:", error)
        }
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return allData.slice(startIndex, endIndex)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 min-h-screen bg-black text-gray-100"
    >
      <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
        Engagement Metrics
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        </div>
      ) : (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="rounded-lg border border-blue-500 shadow-lg shadow-blue-500/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-900 border-b border-blue-500">
                  <TableHead className="text-blue-300 text-lg">Post ID</TableHead>
                  <TableHead className="text-blue-300 text-lg">Post Type</TableHead>
                  <TableHead className="text-blue-300 text-lg">Likes</TableHead>
                  <TableHead className="text-blue-300 text-lg">Shares</TableHead>
                  <TableHead className="text-blue-300 text-lg">Comments</TableHead>
                  <TableHead className="text-blue-300 text-lg">Saves</TableHead>
                  <TableHead className="text-blue-300 text-lg">Impressions</TableHead>
                  <TableHead className="text-blue-300 text-lg">Reach</TableHead>
                  <TableHead className="text-blue-300 text-lg">Profile Visits</TableHead>
                  <TableHead className="text-blue-300 text-lg">Follower Count</TableHead>
                  <TableHead className="text-blue-300 text-lg">Date Posted</TableHead>
                  <TableHead className="text-blue-300 text-lg">Engagement Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {getCurrentPageData().map((item, index) => (
                    <motion.tr
                      key={item.post_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-purple-300 text-lg">{item.post_id}</TableCell>
                      <TableCell className="text-lg">{item.post_type}</TableCell>
                      <TableCell className="text-lg">{item.likes}</TableCell>
                      <TableCell className="text-lg">{item.shares}</TableCell>
                      <TableCell className="text-lg">{item.comments}</TableCell>
                      <TableCell className="text-lg">{item.saves}</TableCell>
                      <TableCell className="text-lg">{item.impressions}</TableCell>
                      <TableCell className="text-lg">{item.reach}</TableCell>
                      <TableCell className="text-lg">{item.profile_visits}</TableCell>
                      <TableCell className="text-lg">{item.follower_count}</TableCell>
                      <TableCell className="text-lg">{item.date_posted}</TableCell>
                      <TableCell className="text-lg">{item['engagement-rate']}</TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          <motion.div
            className="flex justify-between mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="bg-blue-500 text-white hover:bg-blue-600 border-blue-300 shadow-md shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              Previous
            </Button>
            <span className="text-blue-300 text-2xl font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="bg-blue-500 text-white hover:bg-blue-600 border-blue-300 shadow-md shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              Next
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
