import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PostTypeRadarProps {
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

export function PostTypeRadar({ engagementByType }: PostTypeRadarProps) {
  // Normalize values for better radar visualization
  const normalizeValues = (values: number[]) => {
    const max = Math.max(...values);
    return values.map(v => (v / max) * 100);
  };

  const data = {
    labels: engagementByType.map(item => item.type),
    datasets: [
      {
        label: 'Engagement Rate',
        data: engagementByType.map(item => item.avgEngagementRate),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Reach',
        data: normalizeValues(engagementByType.map(item => item.avgReach)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Saves',
        data: normalizeValues(engagementByType.map(item => item.avgSaves)),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value.toFixed(0)}%`
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label;
            const value = context.raw;
            const originalValue = engagementByType[context.dataIndex][
              `avg${label.replace(' ', '')}` as keyof typeof engagementByType[0]
            ];
            
            if (label === 'Engagement Rate') {
              return `${label}: ${value.toFixed(1)}%`;
            }
            return `${label}: ${originalValue.toLocaleString()} (${value.toFixed(1)}%)`;
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Post Type Performance Radar</CardTitle>
        <p className="text-sm text-muted-foreground">
          Relative performance across different metrics
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px]">
          <Radar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}