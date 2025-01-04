/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {  Bubble } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface EngagementType {
  type: string;
  avgLikes: number;
  avgShares: number;
  avgComments: number;
  avgSaves: number;
  avgImpressions: number;
  avgReach: number;
  avgEngagementRate: number;
}

interface EngagementProps {
  engagementByType: EngagementType[];
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
          text: 'Average Impressions'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = context.raw;
            const engagementType = engagementByType.find(
              item => item.type === context.dataset.label
            );
            return [
              `Type: ${context.dataset.label}`,
              `Likes: ${dataPoint.x.toFixed(1)}`,
              `Impressions: ${dataPoint.y.toFixed(1)}`,
              `Engagement Rate: ${(engagementType?.avgEngagementRate || 0).toFixed(2)}%`,
              `Saves: ${(engagementType?.avgSaves || 0).toFixed(1)}`,
              `Comments: ${(engagementType?.avgComments || 0).toFixed(1)}`
            ];
          }
        }
      },
      legend: {
        position: 'top' as const,
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Engagement Distribution by Post Type</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Bubble data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

