import { DataItem } from '../types';

export function processData(data: DataItem[]) {
  const totalLikes = data.reduce((sum, item) => sum + parseInt(item.likes), 0);
  const totalShares = data.reduce((sum, item) => sum + parseInt(item.shares), 0);
  const totalComments = data.reduce((sum, item) => sum + parseInt(item.comments), 0);

  const postTypes = Array.from(new Set(data.map(item => item.post_type)));

  const engagementByType = postTypes.map(type => {
    const postsOfType = data.filter(item => item.post_type === type);
    const avgLikes = postsOfType.reduce((sum, item) => sum + parseInt(item.likes), 0) / postsOfType.length;
    const avgShares = postsOfType.reduce((sum, item) => sum + parseInt(item.shares), 0) / postsOfType.length;
    const avgComments = postsOfType.reduce((sum, item) => sum + parseInt(item.comments), 0) / postsOfType.length;
    return { type, avgLikes, avgShares, avgComments };
  });

  const dailyEngagement = data.reduce((acc, item) => {
    const date = item.created_at.split(' ')[0];
    if (!acc[date]) {
      acc[date] = { likes: 0, shares: 0, comments: 0 };
    }
    acc[date].likes += parseInt(item.likes);
    acc[date].shares += parseInt(item.shares);
    acc[date].comments += parseInt(item.comments);
    return acc;
  }, {} as Record<string, { likes: number, shares: number, comments: number }>);

  return {
    totalLikes,
    totalShares,
    totalComments,
    engagementByType,
    dailyEngagement
  };
}

