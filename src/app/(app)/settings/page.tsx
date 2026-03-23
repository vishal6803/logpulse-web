"use client";

import { CreditCard, Users, UserCircle, Bell, Shield, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock Data
const teamMembers = [
  { name: "Vishal", email: "vishal@example.com", role: "Owner", avatar: "V" },
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Admin",
    avatar: "SC",
  },
  {
    name: "Alex Kumar",
    email: "alex@example.com",
    role: "Developer",
    avatar: "AK",
  },
];

export default function GlobalSettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Organization Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, team, and billing preferences.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing & Usage</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* 1. ACCOUNT TAB */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details and public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>VI</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Vishal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    defaultValue="vishal@example.com"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact support to change your email.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t py-4">
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 2. TEAM TAB */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Invite your colleagues to collaborate on this workspace.
                </CardDescription>
              </div>
              <Button variant="outline" className="shrink-0">
                <Users className="w-4 h-4 mr-2" /> Invite Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg bg-background"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          member.role === "Owner" ? "default" : "secondary"
                        }
                      >
                        {member.role}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                        disabled={member.role === "Owner"}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. BILLING & USAGE TAB */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-violet-500/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Zap className="w-32 h-32 text-violet-500" />
            </div>
            <CardHeader>
              <CardTitle>Current Plan: Developer Pro</CardTitle>
              <CardDescription>
                You are on the Pro tier. Your billing cycle resets on Nov 1st.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Monthly Error Events</span>
                  <span className="text-muted-foreground">
                    342,019 / 500,000 limits
                  </span>
                </div>
                {/* 68% calculated from mock data */}
                <Progress
                  value={68}
                  className="h-2 bg-muted [&>div]:bg-violet-600"
                />
                <p className="text-xs text-muted-foreground pt-1">
                  You have used 68% of your monthly quota.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t py-4 gap-4">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                Upgrade to Enterprise
              </Button>
              <Button variant="outline">Manage Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 4. NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Alerts</CardTitle>
              <CardDescription>
                Choose how you want to be notified about issues across all
                projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a summary of your workspace's health every Monday.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Issue Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get an email instantly when a new, unseen error occurs.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Route error alerts directly to your team's Slack channels.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Connect Slack
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
