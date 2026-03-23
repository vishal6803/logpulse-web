"use client";

import { use } from "react";
import {
  Copy,
  Key,
  Settings,
  TerminalSquare,
  Trash2,
  Bell,
  Shield,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const project = {
    name: "E-Commerce Frontend",
    apiKey: "lp_proj_0dd5e38c90544ddaaaf75f33cf22d2ba",
    framework: "Next.js",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(project.apiKey);
    alert("API Key copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground text-sm font-mono mt-1">
            ID: {resolvedParams.id}
          </p>
        </div>
        <Badge
          variant="outline"
          className="px-3 py-1 text-sm bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
        >
          Receiving Events
        </Badge>
      </div>

      <Tabs defaultValue="environments" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="installation">Install</TabsTrigger>
          <TabsTrigger value="environments">Environments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-violet-500" />
                Client Ingestion Key
              </CardTitle>
              <CardDescription>
                Use this key to initialize the LogPulse SDK in your application.
                Safe to expose in frontend code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 lg:w-1/2">
                <Input
                  readOnly
                  value={project.apiKey}
                  className="font-mono text-muted-foreground"
                />
                <Button
                  variant="secondary"
                  className="shrink-0"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INSTALLATION TAB */}
        <TabsContent value="installation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TerminalSquare className="h-5 w-5" /> Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md font-mono text-sm">
                npm install @vishal6803/logpulse-browser
              </div>
              <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md font-mono text-sm whitespace-pre">
                {`import { LogPulse } from "@vishal6803/logpulse-browser";

LogPulse.init({
  apiKey: "${project.apiKey}",
  environment: "Production",
});`}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🚨 ENVIRONMENTS TAB 🚨 */}
        <TabsContent value="environments" className="mt-4 space-y-4">
          {/* PRODUCTION ENVIRONMENT */}
          <Card className="border-violet-500/20 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    Production <Badge className="bg-violet-600">Active</Badge>
                  </CardTitle>
                  <CardDescription>
                    Rules applied to events originating from production.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send an email when a new error occurs.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Rate Limiting (Events / Minute)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Drop events that exceed this threshold to save DB space.
                  </p>
                </div>
                <Input
                  type="number"
                  defaultValue="500"
                  className="w-[100px] text-right"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 py-3 border-t flex justify-end">
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* LOCAL/DEV ENVIRONMENT */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-muted-foreground">
                Local / Development
              </CardTitle>
              <CardDescription>
                Rules applied to local testing environments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-muted-foreground">
                    Email Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send an email when a new error occurs.
                  </p>
                </div>
                {/* Turned off by default for local! */}
                <Switch checked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🚨 SETTINGS & DANGER ZONE TAB 🚨 */}
        <TabsContent value="settings" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Update your project details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 lg:w-1/2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" defaultValue={project.name} />
              </div>
            </CardContent>
            <CardFooter className="border-t py-4">
              <Button>Save Details</Button>
            </CardFooter>
          </Card>

          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-500 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions for this project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-red-200 dark:border-red-900/50 p-4 rounded-lg bg-background">
                <div>
                  <h4 className="font-semibold text-sm">Delete this project</h4>
                  <p className="text-sm text-muted-foreground">
                    Once you delete a project, there is no going back. All error
                    logs and API keys will be wiped.
                  </p>
                </div>
                <Button variant="destructive" className="shrink-0">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
