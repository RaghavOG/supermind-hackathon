/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EngagementGrowthProps {
  dailyEngagement: Record<string, {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
    impressions: number;
    reach: number;
    profileVisits: number;
    engagementRate: number;
  }>;
}

export function EngagementGrowth({ dailyEngagement }: EngagementGrowthProps) {
  const dates = Object.keys(dailyEngagement).sort();
  
  const calculateTotalEngagement = (date: string) => {
    const data = dailyEngagement[date];
    return data.likes + data.shares + data.comments + data.saves;
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Total Engagement',
        data: dates.map(calculateTotalEngagement),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
        pointRadius: 3
      },
      {
        label: 'Reach',
        data: dates.map(date => dailyEngagement[date].reach),
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.4,
        pointRadius: 3
      },
      {
        label: 'Engagement Rate',
        data: dates.map(date => dailyEngagement[date].engagementRate),
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,
        pointRadius: 3,
        yAxisID: 'percentage'
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
            const label = context.dataset.label;
            const value = context.raw;
            if (label === 'Engagement Rate') {
              return `${label}: ${value.toFixed(1)}%`;
            }
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: (value: number) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
            return value;
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
          callback: (value: number) => `${value.toFixed(1)}%`
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Engagement Growth Trends</CardTitle>
        <p className="text-sm text-muted-foreground">
          Daily engagement metrics and reach
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}