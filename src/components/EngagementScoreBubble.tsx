/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface EngagementScoreProps {
  engagementByType: Array<{
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
  }>;
}

export function EngagementScore({ engagementByType }: EngagementScoreProps) {
  const data = {
    datasets: engagementByType.map((item, index) => ({
      label: item.type,
      data: [{
        x: item.avgLikes,
        y: item.avgShares,
        r: Math.sqrt(item.avgComments) * 2 // Scale bubble size based on comments
      }],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ][index % 4]
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Average Likes'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Average Shares'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = context.raw;
            return [
              `Type: ${context.dataset.label}`,
              `Likes: ${dataPoint.x.toFixed(1)}`,
              `Shares: ${dataPoint.y.toFixed(1)}`,
              `Comments: ${(Math.pow(dataPoint.r/2, 2)).toFixed(1)}`
            ];
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Engagement Score Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Bubble data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}