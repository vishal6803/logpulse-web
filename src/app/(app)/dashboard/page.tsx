"use client";

import { Activity, AlertTriangle, Bug, Terminal } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // 🚨 NEW IMPORTS

// --- MOCK DATA ---
const errorTimelineData = [
  { time: "00:00", production: 12, staging: 4 },
  { time: "04:00", production: 8, staging: 2 },
  { time: "08:00", production: 45, staging: 12 },
  { time: "12:00", production: 82, staging: 15 },
  { time: "16:00", production: 54, staging: 8 },
  { time: "20:00", production: 24, staging: 5 },
  { time: "23:59", production: 18, staging: 3 },
];

const recentIssues = [
  {
    id: "ERR-092",
    message: "TypeError: Cannot read properties of null",
    env: "Production",
    time: "2 mins ago",
  },
  {
    id: "ERR-091",
    message: "NetworkError: Failed to fetch /api/users",
    env: "Production",
    time: "15 mins ago",
  },
  {
    id: "ERR-090",
    message: "Unhandled Rejection (ZodError)",
    env: "Staging",
    time: "1 hour ago",
  },
  {
    id: "ERR-089",
    message: "ReactErrorBoundaryCrash - Payment UI",
    env: "Production",
    time: "3 hours ago",
  },
];

const chartConfig = {
  production: { label: "Production", color: "hsl(var(--chart-1))" },
  staging: { label: "Staging", color: "hsl(var(--chart-2))" },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 🚨 UPDATED HEADER WITH TOGGLES 🚨 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">
            Here is what is happening across your applications today.
          </p>
        </div>

        {/* The Context Selectors */}
        <div className="flex items-center gap-2">
          <Select defaultValue="all-projects">
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
              <SelectItem value="proj_1">E-Commerce Frontend</SelectItem>
              <SelectItem value="proj_2">Payment Gateway API</SelectItem>
              <SelectItem value="proj_4">Mobile Client</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="production">
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-envs">All Environments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TOP ROW: METRICS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Errors (24h)
            </CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unresolved Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">18</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Affected Users
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">
              Across selected environments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime API Status</p>
          </CardContent>
        </Card>
      </div>

      {/* MIDDLE ROW: CHARTS & LOGS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* MAIN CHART */}
        <Card className="col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle>Error Frequency</CardTitle>
            <CardDescription>
              Volume of exceptions caught over the last 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={errorTimelineData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--chart-1))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--chart-1))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorStage" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="production"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProd)"
                  />
                  <Area
                    type="monotone"
                    dataKey="staging"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStage)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* RECENT ISSUES FEED */}
        <Card className="col-span-4 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Anomalies</CardTitle>
            <CardDescription>
              Latest unique errors caught by the SDK.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex flex-col border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-red-500 dark:text-red-400 truncate w-[180px]">
                    {issue.message}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {issue.time}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    {issue.env}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {issue.id}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
