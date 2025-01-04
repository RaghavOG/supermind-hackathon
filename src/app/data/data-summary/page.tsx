/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { EngagementPieChart } from '@/components/EngagementPieChart';
import { EngagementSummary } from '@/components/EngagementSummary';
import { TotalEngagement } from '@/components/TotalEngagement';
import { PostPerformanceGraph } from '@/components/PostPerformanceGraph';
import { PostTypeComparison } from '@/components/PostTypeComparison';
import { processData } from '@/utils/dataProcessing';
import { DataItem } from '@/types';
import { EngagementGrowth } from '@/components/EngagementGrowth';
import { PostTypeRadar } from '@/components/PostTypeComparision';
import { EngagementRate } from '@/components/EngagementRatePerPostType';
import { EngagementScore } from '@/components/EngagementScoreBubble';

export default function Dashboard() {
    const [data, setData] = useState<DataItem[]>([]);
    const [processedData, setProcessedData] = useState<any>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/getData');
        const result = await response.json();
        if (response.ok) {
          setData(result.data);
          setProcessedData(processData(result.data));
        } else {
          console.error(result.error);
        }
      };
  
      fetchData();
    }, []);
  
    if (!processedData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Engagement Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EngagementPieChart 
  likes={processedData.totalLikes} 
  shares={processedData.totalShares} 
  comments={processedData.totalComments} 
/>
          <TotalEngagement 
            likes={processedData.totalLikes} 
            shares={processedData.totalShares} 
            comments={processedData.totalComments} 
          />
        </div>
        <EngagementSummary engagementByType={processedData.engagementByType} />
        <PostPerformanceGraph dailyEngagement={processedData.dailyEngagement} />
        <PostTypeComparison engagementByType={processedData.engagementByType} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <EngagementGrowth dailyEngagement={processedData.dailyEngagement} />
  <PostTypeRadar engagementByType={processedData.engagementByType} />
  <EngagementRate engagementByType={processedData.engagementByType} />
  <EngagementScore engagementByType={processedData.engagementByType} />
</div>
      </div>
    );
  }
  
