'use client'
import React, { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import dayjs from "dayjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./../../components/ui/chart"

// Chart data
const chartData = [
  {
    id: 34,
    firstName: "Hussain",
    createdAt: "2024-10-01T16:17:37.677Z",
    distance: 50,
  },
  {
    id: 35,
    firstName: "John",
    createdAt: "2024-10-10T12:10:25.677Z",
    distance: 120,
  },
  {
    id: 36,
    firstName: "Sarah",
    createdAt: "2024-09-15T08:10:25.677Z",
    distance: 80,
  },
]



const chartConfig = {
  createdAt: {
    label: "Created At",
    color: "hsl(var(--chart-1))",
  },
  distance: {
    label: "Distance",
    color: "hsl(var(--chart-2))",
  },
}

export const description = "A multiple bar chart for October 2024"

export default function Line_Chart({data}) {
  const [graphData , setGraphData] = useState([]);


  useEffect(()=>{
    if(data){
      const currentMonthData = data.filter((data) =>
        dayjs(data.createdAt).isSame(dayjs().format("YYYY-MM"), "month")
      )
      setGraphData(currentMonthData)
    }else{
      const currentMonthData = chartData.filter((data) =>
        dayjs(data.createdAt).isSame(dayjs().format("YYYY-MM"), "month")
      )
      setGraphData(currentMonthData)
    }
  },[data])
  
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Chart</CardTitle>
        <CardDescription>Showing data Curent month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={graphData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="firstName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* Two bars with different colors */}
            <Bar dataKey={(data) => dayjs(data.createdAt).date()} fill="#FFCC15" name="Created Day" radius={4} />
            <Bar dataKey="distance" fill="#8D9A9B" name="Distance" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing data for Curent month
        </div>
      </CardFooter>
    </Card>
  )
}
