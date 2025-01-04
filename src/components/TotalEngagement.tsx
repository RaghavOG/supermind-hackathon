import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TotalEngagementProps {
  likes: number;
  shares: number;
  comments: number;
}

export function TotalEngagement({ likes, shares, comments }: TotalEngagementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold">{likes}</p>
            <p>Likes</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{shares}</p>
            <p>Shares</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{comments}</p>
            <p>Comments</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

