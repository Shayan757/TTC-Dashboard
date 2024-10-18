'use client'
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { getUserDetails } from "../../actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./../../components/ui/chart";

// Chart data for 6 months (sample)
const chartData = [
  {
    month: "January",
    totalJobsCount: 2,
    completedJobsCount: 0,
    incompleteJobsCount: 2,
  },
  {
    month: "February",
    totalJobsCount: 15,
    completedJobsCount: 3,
    incompleteJobsCount: 2,
  },
  {
    month: "March",
    totalJobsCount: 4,
    completedJobsCount: 2,
    incompleteJobsCount: 10,
  },
  {
    month: "April",
    totalJobsCount: 3,
    completedJobsCount: 1,
    incompleteJobsCount: 8,
  },
  {
    month: "May",
    totalJobsCount: 7,
    completedJobsCount: 5,
    incompleteJobsCount: 2,
  },
  {
    month: "June",
    totalJobsCount: 16,
    completedJobsCount: 14,
    incompleteJobsCount: 2,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tab: {
    label: "Tab",
    color: "hsl(var(--chart-2))",
  },
}


export default function JobChart() {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const user = await getUserDetails();
    const effectiveUserId = user?.id;
    if (!effectiveUserId) {
      throw new Error("No valid user ID");
    }


    try {
      const response = await fetch("/api/get-jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.data) {
        setGraphData(data.data.data);
      }
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);




  return (
    <Card>
      <CardHeader>
        <CardTitle>Job's Chart</CardTitle>
        <CardDescription>Showing data for 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto w-full aspect-square max-h-[250px]">
          <LineChart
            data={graphData || chartData}
            margin={{
              left: 0,
              right: 0,
              top: 28,
              bottom: 28,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month" // Using "month" for the X-axis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Show short month names
            />
            
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="totalJobsCount"
              type="linear"
              stroke="#a3a3a3"
              strokeWidth={1}
              dot={false}
              name="Total Jobs"
            />
            <Line
              dataKey="completedJobsCount"
              type="linear"
              stroke="#ffce00"
              strokeWidth={1}
              dot={false}
              name="Completed Jobs"
            />
            <Line
              dataKey="incompleteJobsCount"
              type="linear"
              stroke="#0c0a09"
              strokeWidth={1}
              dot={false}
              name="Incomplete Jobs"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing job data from January to June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
