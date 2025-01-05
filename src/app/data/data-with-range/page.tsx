'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { addDays } from 'date-fns';
import { EngagementPieChart } from '@/components/EngagementPieChart';
import { EngagementSummary } from '@/components/EngagementSummary';
import { TotalEngagement } from '@/components/TotalEngagement';
import { PostPerformanceGraph } from '@/components/PostPerformanceGraph';
import { PostTypeComparison } from '@/components/PostTypeComparison';
import { processData } from '@/utils/dataProcessing';
import { EngagementGrowth } from '@/components/EngagementGrowth';
import { PostTypeRadar } from '@/components/PostTypeComparision';
import { EngagementRate } from '@/components/EngagementRatePerPostType';
import { EngagementScore } from '@/components/EngagementScoreBubble';
import { DataItem } from '../types';
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";


interface ProcessedData {
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  engagementByType: {
    type: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
  }[];
  dailyEngagement: Record<string, { likes: number; shares: number; comments: number }>;
}

const Dashboard = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [selectedPostType, setSelectedPostType] = useState('all');
  const [postTypes, setPostTypes] = useState<string[]>(['all']);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('engagementData');
      if (storedData) {
        const parsedData = JSON.parse(storedData) as DataItem[];
        setData(parsedData);
        const types = ['all', ...new Set(parsedData.map(item => item.post_type))];
        setPostTypes(types);
        const filteredData = filterData(parsedData, dateRange, selectedPostType);
        setProcessedData(processData(filteredData));
      } else {
        const response = await fetch('/api/getData');
        const result = await response.json();
        if (response.ok) {
          localStorage.setItem('engagementData', JSON.stringify(result.data));
          setData(result.data);
          const types = ['all', ...new Set(result.data.map(item => item.post_type))];
          setPostTypes(types);
          const filteredData = filterData(result.data, dateRange, selectedPostType);
          setProcessedData(processData(filteredData));
        }
      }
    };

    fetchData();
  }, []);

  const filterData = (data: DataItem[], dateRange: { from: Date; to: Date }, postType: string) => {
    return data.filter(item => {
      const itemDate = new Date(item.created_at);
      const dateMatch = (!dateRange.from || itemDate >= dateRange.from) &&
                       (!dateRange.to || itemDate <= dateRange.to);
      const typeMatch = postType === 'all' || item.post_type === postType;
      return dateMatch && typeMatch;
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = filterData(data, dateRange, selectedPostType);
      setProcessedData(processData(filteredData));
    }
  }, [dateRange, selectedPostType, data]);

  if (!processedData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Engagement Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedPostType}
              onValueChange={setSelectedPostType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <EngagementSummary data={processedData} /> */}
        <TotalEngagement data={processedData} />
        <EngagementPieChart data={processedData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <PostPerformanceGraph data={processedData} /> */}
        {/* <PostTypeComparison data={processedData} /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <EngagementGrowth data={processedData} /> */}
        {/* <PostTypeRadar data={processedData} /> */}
        {/* <EngagementRate data={processedData} /> */}
      </div>

      <div className="w-full">
        {/* <EngagementScore data={processedData} /> */}
      </div>
    </div>
          // <DotPattern className={cn("bg-black -z-10")} />
    
  );
};

export default Dashboard;
