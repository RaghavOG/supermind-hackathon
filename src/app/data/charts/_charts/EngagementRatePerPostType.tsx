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
import { Bar } from 'react-chartjs-2';
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

export function EngagementRate({ engagementByType }: EngagementProps) {
  const data = {
    labels: engagementByType.map(item => item.type),
    datasets: [
      {
        label: 'Engagement Rate',
        data: engagementByType.map(item => item.avgEngagementRate.toFixed(2)),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Reach Rate',
        data: engagementByType.map(item => (item.avgReach / item.avgImpressions * 100).toFixed(2)),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
          label: (context: any) => {
            const datasetLabel = context.dataset.label;
            const value = context.raw;
            return `${datasetLabel}: ${value}%`;
          }
        }
      },
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rate (%)'
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Engagement & Reach Rates by Post Type</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

