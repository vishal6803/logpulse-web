"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Globe,
  Monitor,
  Server,
  Terminal,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Pure UI Mock Data
const issue = {
  id: "ERR-089",
  type: "Error",
  message: "UI Rendering Failure - The payment button is missing!",
  environment: "Production",
  timestamp: "Oct 24, 2026 14:32:01 UTC",
  status: "Unresolved",
  project: "E-Commerce Frontend",
  device: {
    browser: "Chrome 146.0",
    os: "Windows 10",
    url: "https://shop.example.com/checkout",
    ip: "192.168.1.1",
  },
  stackTrace: [
    {
      file: "app/page.tsx",
      method: "triggerCrash",
      line: 6,
      col: 11,
      isAppCode: true,
    },
    { file: "app/page.tsx", method: "Home", line: 13, col: 7, isAppCode: true },
    {
      file: "node_modules/react-dom/cjs/react-dom.development.js",
      method: "react_stack_bottom_frame",
      line: 15037,
      col: 24,
      isAppCode: false,
    },
    {
      file: "node_modules/next/dist/client/app-index.js",
      method: "module evaluation",
      line: 265,
      col: 1,
      isAppCode: false,
    },
  ],
};

export default function IssueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* 1. TOP NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/issues"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Issues Inbox
          </Link>
          <div className="flex items-center gap-3">
            <Badge
              variant="destructive"
              className="px-2 py-1 uppercase tracking-wider text-xs font-bold"
            >
              {issue.type}
            </Badge>
            <span className="text-muted-foreground font-mono text-sm">
              {resolvedParams.id}
            </span>
            <Badge variant="outline" className="bg-background">
              {issue.project}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-red-600 dark:text-red-500 mt-2">
            {issue.message}
          </h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4" /> Last seen: {issue.timestamp}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline">Ignore</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Resolved
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* 2. THE STACK TRACE */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border overflow-hidden shadow-sm">
            <CardHeader className="bg-muted/30 border-b py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Terminal className="w-5 h-5" /> Stack Trace
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-[#0D0D0D] text-zinc-300 font-mono text-sm overflow-x-auto rounded-b-lg">
                {issue.stackTrace.map((frame, index) => (
                  <div
                    key={index}
                    className={`flex items-start px-4 py-3 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors ${frame.isAppCode ? "opacity-100 bg-zinc-900/50" : "opacity-40"}`}
                  >
                    <div className="w-8 text-zinc-600 shrink-0 select-none text-right mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1 break-all">
                      <span
                        className={
                          frame.isAppCode
                            ? "text-blue-400 font-semibold"
                            : "text-zinc-500"
                        }
                      >
                        {frame.method}
                      </span>
                      <span className="text-zinc-500 mx-2">in</span>
                      <span
                        className={
                          frame.isAppCode ? "text-zinc-200" : "text-zinc-500"
                        }
                      >
                        {frame.file}
                      </span>
                      <span className="text-yellow-500/80 ml-2">
                        :{frame.line}:{frame.col}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. METADATA & CONTEXT */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />{" "}
                Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Environment
                </span>
                <Badge
                  variant="outline"
                  className="border-violet-500/30 text-violet-500 bg-violet-500/10"
                >
                  {issue.environment}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Browser:</span>
                  <span className="font-medium ml-auto">
                    {issue.device.browser}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">OS:</span>
                  <span className="font-medium ml-auto">{issue.device.os}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Server className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="font-mono text-xs ml-auto">
                    {issue.device.ip}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
