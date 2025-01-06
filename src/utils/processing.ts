export interface DataItem {
    _id: string
    post_id: string
    post_type: string
    likes: string
    shares: string
    comments: string
    saves: string
    impressions: string
    reach: string
    profile_visits: string
    follower_count: string
    date_posted: string
    'engagement-rate': string
  }
  
export interface ProcessedData {
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  totalSaves: number;
  totalImpressions: number;
  totalReach: number;
  totalProfileVisits: number;
  averageEngagementRate: number;
  engagementByType: {
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
    avgSaves: number;
    avgImpressions: number;
    avgReach: number;
    avgEngagementRate: number;
  }[];
  dailyEngagement: Record<string, {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
    impressions: number;
    reach: number;
    profileVisits: number;
    engagementRate: number;
    followerCount: number;
  }>;
}

export function processData(data: DataItem[]): ProcessedData {
  // Calculate totals
  const totalLikes = data.reduce((sum, item) => sum + parseInt(item.likes), 0);
  const totalShares = data.reduce((sum, item) => sum + parseInt(item.shares), 0);
  const totalComments = data.reduce((sum, item) => sum + parseInt(item.comments), 0);
  const totalSaves = data.reduce((sum, item) => sum + parseInt(item.saves), 0);
  const totalImpressions = data.reduce((sum, item) => sum + parseInt(item.impressions), 0);
  const totalReach = data.reduce((sum, item) => sum + parseInt(item.reach), 0);
  const totalProfileVisits = data.reduce((sum, item) => sum + parseInt(item.profile_visits), 0);
  

  // Calculate average engagement rate
  const averageEngagementRate = data.reduce((sum, item) => 
    sum + parseFloat(item['engagement-rate']), 0) / data.length;

  // Process engagement by post type
  const postTypes = Array.from(new Set(data.map(item => item.post_type)));
  const engagementByType = postTypes.map(type => {
    const postsOfType = data.filter(item => item.post_type === type);
    const avgLikes = postsOfType.reduce((sum, item) => sum + parseInt(item.likes), 0) / postsOfType.length;
    const avgShares = postsOfType.reduce((sum, item) => sum + parseInt(item.shares), 0) / postsOfType.length;
    const avgComments = postsOfType.reduce((sum, item) => sum + parseInt(item.comments), 0) / postsOfType.length;
    const avgSaves = postsOfType.reduce((sum, item) => sum + parseInt(item.saves), 0) / postsOfType.length;
    const avgImpressions = postsOfType.reduce((sum, item) => sum + parseInt(item.impressions), 0) / postsOfType.length;
    const avgReach = postsOfType.reduce((sum, item) => sum + parseInt(item.reach), 0) / postsOfType.length;
    const avgEngagementRate = postsOfType.reduce((sum, item) => 
      sum + parseFloat(item['engagement-rate']), 0) / postsOfType.length;

    return {
      type,
      avgLikes,
      avgShares,
      avgComments,
      avgSaves,
      avgImpressions,
      avgReach,
      avgEngagementRate
    };
  });

  // Process daily engagement
  const dailyEngagement = data.reduce((acc, item) => {
    const date = item.date_posted.split('T')[0]; // Assuming ISO date format
    if (!acc[date]) {
      acc[date] = {
        likes: 0,
        shares: 0,
        comments: 0,
        saves: 0,
        impressions: 0,
        reach: 0,
        profileVisits: 0,
        engagementRate: 0,
        followerCount: parseInt(item.follower_count)
      };
    }
    
    acc[date].likes += parseInt(item.likes);
    acc[date].shares += parseInt(item.shares);
    acc[date].comments += parseInt(item.comments);
    acc[date].saves += parseInt(item.saves);
    acc[date].impressions += parseInt(item.impressions);
    acc[date].reach += parseInt(item.reach);
    acc[date].profileVisits += parseInt(item.profile_visits);
    acc[date].engagementRate = parseFloat(item['engagement-rate']);
    
    return acc;
  }, {} as ProcessedData['dailyEngagement']);

  return {
    totalLikes,
    totalShares,
    totalComments,
    totalSaves,
    totalImpressions,
    totalReach,
    totalProfileVisits,
    averageEngagementRate,
    engagementByType,
    dailyEngagement
  };
}