import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EngagementSummaryProps {
  engagementByType: Array<{
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
    avgSaves: number;
    avgImpressions: number;
    avgReach: number;
    avgEngagementRate: number;
  }>;
}

export function EngagementSummary({ engagementByType }: EngagementSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Summary by Post Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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
              {engagementByType.map((item) => (
                <TableRow key={item.type}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell className="text-right">{item.avgLikes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{item.avgComments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{item.avgShares.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{item.avgSaves.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{item.avgReach.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{item.avgImpressions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  <TableCell className="text-right">{item.avgEngagementRate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}