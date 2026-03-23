"use client";

import Link from "next/link";
import { Activity, Plus, Server, Smartphone, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock Data
const projects = [
  {
    id: "proj_1",
    name: "E-Commerce Frontend",
    platform: "Web",
    envs: ["Production", "Staging"],
    errors24h: 142,
    status: "Degraded",
    icon: Globe,
  },
  {
    id: "proj_2",
    name: "Payment Gateway API",
    platform: "Node.js",
    envs: ["Production"],
    errors24h: 3,
    status: "Healthy",
    icon: Server,
  },
  {
    id: "proj_3",
    name: "Admin Dashboard",
    platform: "React",
    envs: ["Internal"],
    errors24h: 0,
    status: "Healthy",
    icon: Globe,
  },
  {
    id: "proj_4",
    name: "Mobile Client",
    platform: "iOS",
    envs: ["Production", "Beta"],
    errors24h: 89,
    status: "Healthy",
    icon: Smartphone,
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your applications and their ingestion keys.
          </p>
        </div>

        {/* 🚨 THE NEW DIALOG POPUP 🚨 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new application to LogPulse to generate a unique ingestion
                API key.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Auth Microservice"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="framework" className="text-right">
                  Framework
                </Label>
                {/* Tailored for your stack! */}
                <Input
                  id="framework"
                  placeholder="e.g., Next.js, React, Express"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              {/* Note: In a real app, this would be a submit button inside a <form> */}
              <Button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white w-full"
              >
                Generate API Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* THE PROJECTS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.id}
            className="transition-transform hover:-translate-y-1"
          >
            <Card className="h-full hover:border-violet-500/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {project.name}
                </CardTitle>
                <project.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <Badge
                    variant={
                      project.status === "Healthy" ? "default" : "destructive"
                    }
                  >
                    {project.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground border px-2 py-0.5 rounded-full">
                    {project.platform}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Errors (24h)</span>
                  <span className="font-bold flex items-center gap-1">
                    <Activity className="h-3 w-3 text-red-500" />
                    {project.errors24h}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
