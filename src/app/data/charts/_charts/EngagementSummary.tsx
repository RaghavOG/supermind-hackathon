'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface EngagementSummaryProps {
  engagementByType: Array<{
    type: string
    avgLikes: number
    avgShares: number
    avgComments: number
    avgSaves: number
    avgImpressions: number
    avgReach: number
    avgEngagementRate: number
  }>
}

export function EngagementSummary({ engagementByType }: EngagementSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold">Engagement Summary by Post Type</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Post Type</TableHead>
                  <TableHead className="text-right">Avg Likes</TableHead>
                  <TableHead className="text-right">Avg Comments</TableHead>
                  <TableHead className="text-right">Avg Shares</TableHead>
                  <TableHead className="text-right">Avg Saves</TableHead>
                  <TableHead className="text-right">Avg Reach</TableHead>
                  <TableHead className="text-right">Avg Impressions</TableHead>
                  <TableHead className="text-right">Engagement Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engagementByType.map((item, index) => (
                  <motion.tr
                    key={item.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell className="text-right">{item.avgLikes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">{item.avgComments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">{item.avgShares.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">{item.avgSaves.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">{item.avgReach.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">{item.avgImpressions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className="text-right">{item.avgEngagementRate.toFixed(1)}%</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
