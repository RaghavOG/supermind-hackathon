"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DataItem {
  id: string;
  post_type: string;
  likes: number;
  shares: number;
  comments: number;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

export default function Page() {
  const [allData, setAllData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('engagementData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setAllData(parsedData);
        setTotalPages(Math.ceil(parsedData.length / ITEMS_PER_PAGE));
      } else {
        const response = await fetch('/api/getData');
        const result = await response.json();
        if (response.ok) {
          setAllData(result.data);
          setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE));
          localStorage.setItem('engagementData', JSON.stringify(result.data));
        } else {
          console.error(result.error);
        }
      }
    };

    fetchData();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allData.slice(startIndex, endIndex);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Engagement Metrics</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post ID</TableHead>
            <TableHead>Post Type</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.post_type}</TableCell>
              <TableCell>{item.likes}</TableCell>
              <TableCell>{item.shares}</TableCell>
              <TableCell>{item.comments}</TableCell>
              <TableCell>{item.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

