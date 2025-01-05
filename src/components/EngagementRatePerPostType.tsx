/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EngagementRateProps {
  engagementByType: Array<{
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
  }>;
}

export function EngagementRate({ engagementByType }: EngagementRateProps) {
  const data = {
    labels: engagementByType.map(item => item.type),
    datasets: [
      {
        label: 'Engagement Rate',
        data: engagementByType.map(item => 
          ((item.avgLikes + item.avgShares * 2 + item.avgComments * 3) / 6).toFixed(2)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Engagement Rate: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Engagement Rate'
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Engagement Rate per Post Type</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}