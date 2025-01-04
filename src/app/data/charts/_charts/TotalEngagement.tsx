import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {  ThumbsUp, Share2, MessageSquare, Bookmark, Eye, Target, UserPlus } from 'lucide-react';

interface TotalEngagementProps {
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  impressions: number;
  reach: number;
  profileVisits: number;
}

export function TotalEngagement({
  likes,
  shares,
  comments,
  saves,
  impressions,
  reach,
  profileVisits,
}: TotalEngagementProps) {
  const metrics = [
    { label: 'Likes', value: likes, icon: ThumbsUp },
    { label: 'Comments', value: comments, icon: MessageSquare },
    { label: 'Shares', value: shares, icon: Share2 },
    { label: 'Saves', value: saves, icon: Bookmark },
    { label: 'Impressions', value: impressions, icon: Eye },
    { label: 'Reach', value: reach, icon: Target },
    { label: 'Profile Visits', value: profileVisits, icon: UserPlus },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center p-2 rounded-lg bg-secondary/10">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
              <p className="text-2xl font-bold">
                {value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}