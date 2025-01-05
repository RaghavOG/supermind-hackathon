import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EngagementSummaryProps {
  engagementByType: Array<{
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
  }>;
}

export function EngagementSummary({ engagementByType }: EngagementSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr>
              <th>Post Type</th>
              <th>Avg Likes</th>
              <th>Avg Shares</th>
              <th>Avg Comments</th>
            </tr>
          </thead>
          <tbody>
            {engagementByType.map((item) => (
              <tr key={item.type}>
                <td>{item.type}</td>
                <td>{item.avgLikes.toFixed(2)}</td>
                <td>{item.avgShares.toFixed(2)}</td>
                <td>{item.avgComments.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

    