"use client";

import Link from "next/link";
import {
  Search,
  Clock,
  CheckCircle2,
  CircleDashed,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Pure UI Mock Data
const issuesList = [
  {
    id: "ERR-092",
    project: "E-Commerce Frontend",
    message: "TypeError: Cannot read properties of null",
    env: "Production",
    events: 1402,
    users: 342,
    status: "Unresolved",
    time: "2 mins ago",
  },
  {
    id: "ERR-091",
    project: "Payment API",
    message: "NetworkError: Failed to fetch /api/users",
    env: "Production",
    events: 89,
    users: 12,
    status: "Unresolved",
    time: "15 mins ago",
  },
  {
    id: "ERR-090",
    project: "E-Commerce Frontend",
    message: "Unhandled Rejection (ZodError)",
    env: "Staging",
    events: 4,
    users: 1,
    status: "Unresolved",
    time: "1 hour ago",
  },
  {
    id: "ERR-089",
    project: "E-Commerce Frontend",
    message: "ReactErrorBoundaryCrash - Payment UI",
    env: "Production",
    events: 24,
    users: 24,
    status: "Resolved",
    time: "3 hours ago",
  },
];

export default function IssuesPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Issues Inbox</h1>
          <p className="text-muted-foreground">
            Triage and resolve application errors.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search error messages..."
              className="pl-8 bg-background"
            />
          </div>
          <Select defaultValue="unresolved">
            <SelectTrigger className="w-[130px] bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unresolved">Unresolved</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="all">All Issues</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* THE DATA TABLE */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[400px]">Error</TableHead>
                <TableHead>Project & Env</TableHead>
                <TableHead className="text-right">Events</TableHead>
                <TableHead className="text-right">Users</TableHead>
                <TableHead className="text-right">Last Seen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issuesList.map((issue) => (
                <TableRow
                  key={issue.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  {/* Error Message & ID */}
                  <TableCell className="font-medium">
                    <Link href={`/issues/${issue.id}`} className="block">
                      <div className="flex flex-col gap-1">
                        <span className="text-red-500 dark:text-red-400 font-semibold truncate max-w-[350px] group-hover:underline">
                          {issue.message}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-mono uppercase">
                            {issue.id}
                          </span>
                          {issue.status === "Unresolved" ? (
                            <span className="flex items-center text-amber-500">
                              <CircleDashed className="w-3 h-3 mr-1" />{" "}
                              Unresolved
                            </span>
                          ) : (
                            <span className="flex items-center text-emerald-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Resolved
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </TableCell>

                  {/* Project & Environment */}
                  <TableCell>
                    <Link href={`/issues/${issue.id}`} className="block">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="text-sm font-medium">
                          {issue.project}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs bg-background"
                        >
                          {issue.env}
                        </Badge>
                      </div>
                    </Link>
                  </TableCell>

                  {/* Event Count */}
                  <TableCell className="text-right">
                    <Link href={`/issues/${issue.id}`} className="block">
                      <span className="flex items-center justify-end gap-1 text-sm font-mono">
                        <Activity className="w-3 h-3 text-muted-foreground" />
                        {issue.events.toLocaleString()}
                      </span>
                    </Link>
                  </TableCell>

                  {/* User Count */}
                  <TableCell className="text-right font-mono text-sm">
                    <Link href={`/issues/${issue.id}`} className="block">
                      {issue.users.toLocaleString()}
                    </Link>
                  </TableCell>

                  {/* Time */}
                  <TableCell className="text-right text-muted-foreground">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="block text-sm flex items-center justify-end gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      {issue.time}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
