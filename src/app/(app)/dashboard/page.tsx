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
} from "@/components/ui/select";

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

// NORTHERN LIGHTS CHART COLORS (Emerald and Cyan)
const chartConfig = {
  production: { label: "Production", color: "hsl(142, 71%, 45%)" },
  staging: { label: "Staging", color: "hsl(180, 100%, 40%)" },
};

const glassCardClass =
  "bg-background/50 backdrop-blur-xl border border-border/50 shadow-lg";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen flex flex-col gap-6">
      {/* 🚨 NORTHERN LIGHTS AMBIENT GLOW 🚨 */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-emerald-600/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[60vh] w-[50vw] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-[20%] left-[30%] h-[40vh] w-[40vw] rounded-full bg-teal-400/10 blur-[120px]" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">
            Here is what is happening across your applications today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="all-projects">
            <SelectTrigger className={`w-[200px] ${glassCardClass}`}>
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent className={glassCardClass}>
              <SelectItem value="all-projects">All Projects</SelectItem>
              <SelectItem value="proj_1">E-Commerce Frontend</SelectItem>
              <SelectItem value="proj_2">Payment Gateway API</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="production">
            <SelectTrigger className={`w-[140px] ${glassCardClass}`}>
              <SelectValue placeholder="Environment" />
            </SelectTrigger>
            <SelectContent className={glassCardClass}>
              <SelectItem value="all-envs">All Environments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={glassCardClass}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Errors (24h)
            </CardTitle>
            <Bug className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card className={glassCardClass}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unresolved Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">18</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
        <Card className={glassCardClass}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Affected Users
            </CardTitle>
            <Activity className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">
              Across selected environments
            </p>
          </CardContent>
        </Card>
        <Card className={glassCardClass}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Terminal className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-500">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime API Status</p>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS & FEED ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className={`col-span-4 lg:col-span-5 ${glassCardClass}`}>
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
                        stopColor={chartConfig.production.color}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartConfig.production.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorStage" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={chartConfig.staging.color}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartConfig.staging.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    strokeOpacity={0.4}
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
                    stroke={chartConfig.production.color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProd)"
                  />
                  <Area
                    type="monotone"
                    dataKey="staging"
                    stroke={chartConfig.staging.color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStage)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className={`col-span-4 lg:col-span-2 ${glassCardClass}`}>
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
                className="flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-500 dark:text-emerald-400 truncate w-[180px]">
                    {issue.message}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {issue.time}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-border/50 px-2.5 py-0.5 text-xs font-semibold bg-background/50 backdrop-blur-sm">
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
