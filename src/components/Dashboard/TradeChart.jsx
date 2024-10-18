'use client'
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./../../components/ui/chart"

// Sample data for testing (you can replace this with your actual data)
const chartData = [
  { id: 1, leadUsed: 0, remaningLeads: 3, trade: "Plumbing", type: "Free", createdAt: "2024-10-01T16:17:37.677Z" },
  { id: 2, leadUsed: 1, remaningLeads: 5, trade: "Electrician", type: "Bronze", createdAt: "2024-10-02T10:12:25.677Z" },
  { id: 3, leadUsed: 2, remaningLeads: 8, trade: "Carpentry", type: "Silver", createdAt: "2024-10-03T08:15:10.677Z" },
  { id: 4, leadUsed: 3, remaningLeads: 2, trade: "Painting", type: "Gold", createdAt: "2024-10-04T12:10:45.677Z" },
  { id: 5, leadUsed: 0, remaningLeads: 5, trade: "Plumbing", type: "Free", createdAt: "2024-10-05T09:17:37.677Z" },
  { id: 6, leadUsed: 4, remaningLeads: 3, trade: "Plumbing", type: "Gold", createdAt: "2024-10-06T11:20:25.677Z" },
  { id: 7, leadUsed: 1, remaningLeads: 6, trade: "Electrician", type: "Bronze", createdAt: "2024-10-07T14:30:50.677Z" },
  { id: 8, leadUsed: 2, remaningLeads: 7, trade: "Carpentry", type: "Silver", createdAt: "2024-10-08T08:40:25.677Z" },
  { id: 9, leadUsed: 5, remaningLeads: 1, trade: "Painting", type: "Gold", createdAt: "2024-10-09T10:50:25.677Z" }
]

// Function to validate the entries in the data objects
const isValidEntry = (entry) => {
  return entry &&
    typeof entry.id !== "undefined" && entry.id !== null &&
    typeof entry.leadUsed !== "undefined" && entry.leadUsed !== null &&
    typeof entry.remaningLeads !== "undefined" && entry.remaningLeads !== null &&
    typeof entry.trade !== "undefined" && entry.trade !== null &&
    typeof entry.type !== "undefined" && entry.type !== null &&
    typeof entry.createdAt !== "undefined" && entry.createdAt !== null;
}
const subscriptionColors = {
  Free: "#c0c0c0",   // Yellow
  Bronze: "#51595a", // Bronze
  Silver: "#ffce00", // Silver
  Gold: "#ffd700",   // Gold
  Deactivate: "#8d9a9b"    // Gold
}
// Aggregating subscription data
const aggregateSubscriptionData = (data) => {
  const subscriptionCounts = data.reduce((acc, curr) => {
    const { type } = curr
    acc[type] = acc[type] || { name: type, value: 0, fill: subscriptionColors[type] }
    acc[type].value += 1
    return acc
  }, {})

  return Object.values(subscriptionCounts)
}

export const description = "A donut chart showing subscription types"

export default function TradeChart({ data }) {
  const [graphData, setGraphData] = React.useState([])

  React.useEffect(() => {
    let currentMonthData = data || chartData
    // currentMonthData = currentMonthData.filter((d) =>
    //   dayjs(d.createdAt).isSame(dayjs().format("YYYY-MM"), "month") && isValidEntry(d)
    // )

    const subscriptionData = aggregateSubscriptionData(currentMonthData)
 
    setGraphData(subscriptionData)
  }, [data])

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  }

  return (
    <Card className="flex flex-col shadow-md">
      <CardHeader className="items-left pb-0">
        <CardTitle>Subscription Chart</CardTitle>
        <CardDescription>Showing all data </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={graphData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
              fill="#8884d8" // Default color for pie segments
            >
              {/* {graphData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 4 === 0 ? "#ffce00" : index % 4 === 1 ? "#cd7f32" : index % 4 === 2 ? "#c0c0c0" : "#ffd700"} />
              ))} */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {graphData.reduce((acc, curr) => acc + curr.value, 0) || 0}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Subscriptions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing all data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

