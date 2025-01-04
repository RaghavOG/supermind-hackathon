'use client'
/***
 * API ROUTE /api/pullData
 * 
 * this is fetching from New Data Provided by Abhishek
 * 
 * 
 * 
 * 
 */
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

export default function Page() {
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
    <div className="p-4 min-h-screen bg-black text-gray-100 ">
      <h1 className="text-2xl font-bold mb-4">Engagement Metrics</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-md border border-gray-700 ">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700">
                  <TableHead className="text-gray-300">Post ID</TableHead>
                  <TableHead className="text-gray-300">Post Type</TableHead>
                  <TableHead className="text-gray-300">Likes</TableHead>
                  <TableHead className="text-gray-300">Shares</TableHead>
                  <TableHead className="text-gray-300">Comments</TableHead>
                  <TableHead className="text-gray-300">Saves</TableHead>
                  <TableHead className="text-gray-300">Impressions</TableHead>
                  <TableHead className="text-gray-300">Reach</TableHead>
                  <TableHead className="text-gray-300">Profile Visits</TableHead>
                  <TableHead className="text-gray-300">Follower Count</TableHead>
                  <TableHead className="text-gray-300">Date Posted</TableHead>
                  <TableHead className="text-gray-300">Engagement Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPageData().map((item) => (
                  <TableRow key={item.post_id} className="border-b border-gray-800">
                    <TableCell className="font-medium">{item.post_id}</TableCell>
                    <TableCell>{item.post_type}</TableCell>
                    <TableCell>{item.likes}</TableCell>
                    <TableCell>{item.shares}</TableCell>
                    <TableCell>{item.comments}</TableCell>
                    <TableCell>{item.saves}</TableCell>
                    <TableCell>{item.impressions}</TableCell>
                    <TableCell>{item.reach}</TableCell>
                    <TableCell>{item.profile_visits}</TableCell>
                    <TableCell>{item.follower_count}</TableCell>
                    <TableCell>{item.date_posted}</TableCell>
                    <TableCell>{item['engagement-rate']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between mt-4">
            <Button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="bg-gray-800 text-gray-100 hover:bg-gray-700"
            >
              Previous
            </Button>
            <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
            <Button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="bg-gray-800 text-gray-100 hover:bg-gray-700"
            >
              Next
            </Button>
          </div>
          </div>
        </>
      )}
    </div>
  )
}

