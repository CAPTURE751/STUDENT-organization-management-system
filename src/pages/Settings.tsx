import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Users, 
  Calendar, 
  Bell, 
  Link, 
  FileText, 
  CreditCard, 
  Shield, 
  Smartphone, 
  Zap, 
  History, 
  Crown,
  Upload,
  Save,
  Palette,
  Globe,
  Clock,
  UserCheck,
  Database,
  Mail,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    orgName: "Student Computing Society",
    motto: "Code, Learn, Innovate",
    email: "admin@scs.edu",
    phone: "+254712345678",
    themeColor: "#3b82f6",
    language: "en",
    timezone: "Africa/Nairobi",
    dateFormat: "DD/MM/YYYY",
    academicYear: "2024/2025",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    
    // Module Toggles
    modules: {
      events: true,
      finance: true,
      voting: true,
      certificates: true,
      gallery: true,
      helpDesk: false,
      mobileSync: true
    },
    
    // Security Settings
    twoFactorAuth: false,
    passwordMinLength: 8,
    passwordExpiry: 90,
    gdprCompliance: true,
    dataRetention: 3,
    
    // File Settings
    maxFileSize: 10, // MB
    allowedFormats: ['.pdf', '.jpg', '.png', '.zip'],
    fileVersioning: true,
    defaultPrivacy: 'members-only',
    
    // Payment Settings
    mpesaEnabled: true,
    stripeEnabled: false,
    paypalEnabled: false,
    anonymousDonations: true,
    financialDashboardVisible: true,
    
    // Automation Rules
    paymentReminders: true,
    reminderDays: 3,
    autoCertificates: true,
    autoArchive: true,
    archiveAfterGraduation: true
  });

  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin", permissions: ["all"], color: "destructive" },
    { id: 2, name: "Chairperson", permissions: ["dashboard", "members", "events", "reports"], color: "default" },
    { id: 3, name: "Treasurer", permissions: ["dashboard", "finance", "reports"], color: "secondary" },
    { id: 4, name: "Secretary", permissions: ["dashboard", "events", "reports"], color: "outline" },
    { id: 5, name: "Member", permissions: ["dashboard"], color: "outline" }
  ]);

  const [customFields, setCustomFields] = useState([
    { id: 1, name: "Student ID", type: "text", required: true, module: "registration" },
    { id: 2, name: "Course", type: "dropdown", required: true, module: "registration" },
    { id: 3, name: "Year of Study", type: "number", required: true, module: "registration" }
  ]);

  const [integrations, setIntegrations] = useState([
    { name: "M-PESA", enabled: true, configured: true, status: "Connected" },
    { name: "Stripe", enabled: false, configured: false, status: "Not Configured" },
    { name: "SMS Gateway", enabled: true, configured: true, status: "Connected" },
    { name: "Email SMTP", enabled: true, configured: true, status: "Connected" },
    { name: "School ERP", enabled: false, configured: false, status: "Not Configured" }
  ]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your organization settings have been updated successfully.",
    });
  };

  const toggleModule = (moduleName: string) => {
    setSettings(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: !prev.modules[moduleName as keyof typeof prev.modules]
      }
    }));
  };

  const addCustomField = () => {
    const newField = {
      id: Date.now(),
      name: "New Field",
      type: "text",
      required: false,
      module: "registration"
    };
    setCustomFields([...customFields, newField]);
  };

  const removeCustomField = (id: number) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const settingsTabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "roles", label: "Roles & Permissions", icon: Users },
    { id: "academic", label: "Academic Year", icon: Calendar },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "reports", label: "Reports", icon: Database },
    { id: "finance", label: "Finance", icon: CreditCard },
    { id: "modules", label: "Module Toggles", icon: ToggleLeft },
    { id: "custom-fields", label: "Custom Fields", icon: Plus },
    { id: "security", label: "Security", icon: Shield },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "audit", label: "Audit Logs", icon: History },
    { id: "super-admin", label: "Super Admin", icon: Crown }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization settings, integrations, and preferences
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-8 lg:grid-cols-15 gap-2 h-auto p-2">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col gap-1 h-auto py-2 px-2 text-xs"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic organization information and appearance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={settings.orgName}
                      onChange={(e) => setSettings(prev => ({ ...prev, orgName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="motto">Motto</Label>
                    <Input
                      id="motto"
                      value={settings.motto}
                      onChange={(e) => setSettings(prev => ({ ...prev, motto: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="themeColor">Theme Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="themeColor"
                        type="color"
                        value={settings.themeColor}
                        onChange={(e) => setSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                        className="w-20"
                      />
                      <Input
                        value={settings.themeColor}
                        onChange={(e) => setSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Swahili</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={settings.academicYear}
                      onChange={(e) => setSettings(prev => ({ ...prev, academicYear: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Upload Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Organization Logo</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                    <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Banner Image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                    <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Watermark</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 1MB</p>
                    <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Roles & Permissions
              </CardTitle>
              <CardDescription>
                Manage user roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={role.color as any}>{role.name}</Badge>
                      <div className="flex gap-1">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Year */}
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Academic Year & Term Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentYear">Current Academic Year</Label>
                  <Input id="currentYear" value="2024/2025" />
                </div>
                <div>
                  <Label htmlFor="currentTerm">Current Semester</Label>
                  <Select defaultValue="semester-1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semester-1">Semester 1</SelectItem>
                      <SelectItem value="semester-2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="termStart">Term Start Date</Label>
                  <Input id="termStart" type="date" />
                </div>
                <div>
                  <Label htmlFor="termEnd">Term End Date</Label>
                  <Input id="termEnd" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotif">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotif"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotif">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to mobile app</p>
                  </div>
                  <Switch
                    id="pushNotif"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Integration Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.configured ? "default" : "secondary"}>
                        {integration.configured ? "Configured" : "Not Configured"}
                      </Badge>
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={() => {}}
                      />
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Module Toggles */}
        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ToggleLeft className="h-5 w-5" />
                Module Toggles
              </CardTitle>
              <CardDescription>
                Enable or disable features for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.modules).map(([moduleName, enabled]) => (
                  <div key={moduleName} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="capitalize">{moduleName.replace(/([A-Z])/g, ' $1')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {enabled ? "Module is active" : "Module is disabled"}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={() => toggleModule(moduleName)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Fields */}
        <TabsContent value="custom-fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Custom Field Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customFields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{field.name}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{field.type}</Badge>
                          <Badge variant="outline">{field.module}</Badge>
                          {field.required && <Badge variant="destructive">Required</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" onClick={() => removeCustomField(field.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button onClick={addCustomField} className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gdpr">GDPR/PDPA Compliance</Label>
                    <p className="text-sm text-muted-foreground">Enable data protection features</p>
                  </div>
                  <Switch
                    id="gdpr"
                    checked={settings.gdprCompliance}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, gdprCompliance: checked }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passwordLength">Minimum Password Length</Label>
                  <Input
                    id="passwordLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="dataRetention">Data Retention (Years)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => setSettings(prev => ({ ...prev, dataRetention: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentReminders">Payment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Auto-send payment reminders before due date</p>
                  </div>
                  <Switch
                    id="paymentReminders"
                    checked={settings.paymentReminders}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, paymentReminders: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoCerts">Auto-Generate Certificates</Label>
                    <p className="text-sm text-muted-foreground">Generate certificates after event attendance</p>
                  </div>
                  <Switch
                    id="autoCerts"
                    checked={settings.autoCertificates}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoCertificates: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoArchive">Auto-Archive After Graduation</Label>
                    <p className="text-sm text-muted-foreground">Archive users based on graduation year</p>
                  </div>
                  <Switch
                    id="autoArchive"
                    checked={settings.archiveAfterGraduation}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, archiveAfterGraduation: checked }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="reminderDays">Payment Reminder Days</Label>
                <Input
                  id="reminderDays"
                  type="number"
                  value={settings.reminderDays}
                  onChange={(e) => setSettings(prev => ({ ...prev, reminderDays: parseInt(e.target.value) }))}
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground mt-1">Days before due date to send reminders</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Audit Logs
              </CardTitle>
              <CardDescription>
                View system activity and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search logs..." className="flex-1" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="settings">Settings Changes</SelectItem>
                      <SelectItem value="users">User Actions</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <div className="border rounded-lg">
                  <div className="space-y-0">
                    {[
                      { action: "Settings Updated", user: "Admin", time: "2 minutes ago", type: "settings" },
                      { action: "User Role Changed", user: "John Doe", time: "1 hour ago", type: "users" },
                      { action: "Payment Received", user: "Jane Smith", time: "3 hours ago", type: "finance" },
                      { action: "Module Enabled", user: "Admin", time: "1 day ago", type: "settings" }
                    ].map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{log.type}</Badge>
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-muted-foreground">by {log.user}</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Super Admin */}
        <TabsContent value="super-admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Super Admin Panel
              </CardTitle>
              <CardDescription>
                System-wide administration and monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">47</div>
                    <p className="text-sm text-muted-foreground">Active Organizations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-sm text-muted-foreground">System Health</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Send System-Wide Announcement
                </Button>
                <Button className="w-full" variant="outline">
                  Download System Backup
                </Button>
                <Button className="w-full" variant="outline">
                  View Global Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}