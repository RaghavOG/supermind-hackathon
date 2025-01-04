/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DataItem } from "@/types";
import { processData } from "@/utils/processing";
import { EngagementPieChart } from "./_charts/EngagementPieChart";
import { EngagementSummary } from "./_charts/EngagementSummary";
import { TotalEngagement } from "./_charts/TotalEngagement";
import { PostPerformanceGraph } from "./_charts/PostPerformanceGraph";
import { PostTypeComparison } from "./_charts/PostTypeComparison";
import { EngagementGrowth } from "./_charts/EngagementGrowth";
import { PostTypeRadar } from "./_charts/PostTypeComparision";
import { EngagementRate } from "./_charts/EngagementRatePerPostType";
import { EngagementScore } from "./_charts/EngagementScoreBubble";

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [processedData, setProcessedData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("latestData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
        setProcessedData(processData(parsedData));
      } else {
        const response = await fetch("/api/pullData");
        const result = await response.json();
        if (response.ok) {
          localStorage.setItem("latestData", JSON.stringify(result.data));
          setData(result.data);
          setProcessedData(processData(result.data));
        } else {
          console.error(result.error);
        }
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
          saves={processedData.totalSaves}
          profileVisits={processedData.totalProfileVisits}
         

        />
        <TotalEngagement 
          likes={processedData.totalLikes}
          shares={processedData.totalShares}
          comments={processedData.totalComments}
          saves={processedData.totalSaves}
          impressions={processedData.totalImpressions}
          reach={processedData.totalReach}
          profileVisits={processedData.totalProfileVisits}
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
