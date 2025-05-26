import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Database, User, Bell, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "Admin Dashboard",
    siteDescription: "Schema-Driven CRUD Interface",
    defaultPageSize: "25",
    enableNotifications: true,
    autoSave: true,
    darkMode: false,
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout>
      <div className="flex-1 p-6 space-y-6">
        <div className="bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
          <p className="text-sm text-slate-500">
            Configure your admin dashboard preferences and system settings
          </p>
        </div>

        <div className="grid gap-6">
          {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>
              Basic configuration for your admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultPageSize">Default Page Size</Label>
                <Input
                  id="defaultPageSize"
                  value={settings.defaultPageSize}
                  onChange={(e) => handleInputChange("defaultPageSize", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Preferences</CardTitle>
            </div>
            <CardDescription>
              Customize your dashboard experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Notifications</Label>
                <p className="text-sm text-slate-500">
                  Receive notifications for important events
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleInputChange("enableNotifications", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Save</Label>
                <p className="text-sm text-slate-500">
                  Automatically save form changes
                </p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleInputChange("autoSave", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-slate-500">
                  Use dark theme for the dashboard
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleInputChange("darkMode", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>Database Settings</CardTitle>
            </div>
            <CardDescription>
              Configure database connection and performance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-800">Connection Status</h4>
                  <p className="text-sm text-slate-600">In-Memory Storage (Active)</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Query Timeout (ms)</Label>
                <Input defaultValue="5000" disabled />
              </div>
              <div className="space-y-2">
                <Label>Max Connections</Label>
                <Input defaultValue="100" disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Manage security and access control settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Security features are currently in development. 
                This demo uses in-memory storage without authentication.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}