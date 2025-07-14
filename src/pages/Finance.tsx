import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Download, 
  Plus, 
  CreditCard, 
  Phone, 
  Receipt, 
  Target,
  PieChart,
  BarChart3,
  FileText,
  Calendar,
  DollarSign
} from "lucide-react";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Sample data
  const financialStats = {
    totalIncome: 45000,
    totalExpenses: 12000,
    netWorth: 33000,
    pendingPayments: 15,
    activeCampaigns: 3
  };

  const recentTransactions = [
    { id: 1, member: "John Doe", type: "Membership Dues", amount: 500, status: "completed", date: "2024-01-15", method: "M-PESA" },
    { id: 2, member: "Jane Smith", type: "Event Fee", amount: 200, status: "pending", date: "2024-01-14", method: "Manual" },
    { id: 3, member: "Mike Johnson", type: "Welfare", amount: 100, status: "completed", date: "2024-01-13", method: "M-PESA" },
  ];

  const activeCampaigns = [
    { id: 1, title: "Emergency Fund", target: 10000, raised: 7500, donors: 25, deadline: "2024-02-28" },
    { id: 2, title: "Annual Trip", target: 25000, raised: 18000, donors: 45, deadline: "2024-03-15" },
    { id: 3, title: "Equipment Purchase", target: 5000, raised: 2800, donors: 12, deadline: "2024-02-10" },
  ];

  const contributionTypes = [
    { id: 1, name: "Registration Fee", amount: 1000, frequency: "one-time", mandatory: true },
    { id: 2, name: "Membership Dues", amount: 500, frequency: "monthly", mandatory: true },
    { id: 3, name: "Welfare Fund", amount: 200, frequency: "monthly", mandatory: false },
    { id: 4, name: "Event Fee", amount: 300, frequency: "per-event", mandatory: false },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Finance Management</h1>
          <p className="text-muted-foreground">Manage payments, donations, and financial reports</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Fundraising Campaign</DialogTitle>
                <DialogDescription>Set up a new voluntary donation campaign</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-title">Campaign Title</Label>
                  <Input id="campaign-title" placeholder="e.g., Emergency Fund" />
                </div>
                <div>
                  <Label htmlFor="campaign-target">Target Amount (KES)</Label>
                  <Input id="campaign-target" type="number" placeholder="10000" />
                </div>
                <div>
                  <Label htmlFor="campaign-deadline">Deadline</Label>
                  <Input id="campaign-deadline" type="date" />
                </div>
                <div>
                  <Label htmlFor="campaign-description">Description</Label>
                  <Textarea id="campaign-description" placeholder="Campaign details..." />
                </div>
                <Button className="w-full">Create Campaign</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">KES {financialStats.totalIncome.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">KES {financialStats.totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">-8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KES {financialStats.netWorth.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{financialStats.pendingPayments}</div>
                <p className="text-xs text-muted-foreground">Members with dues</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {transaction.method === "M-PESA" ? (
                          <Phone className="h-5 w-5 text-primary" />
                        ) : (
                          <Receipt className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.member}</p>
                        <p className="text-sm text-muted-foreground">{transaction.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">KES {transaction.amount}</p>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Active Fundraising Campaigns</CardTitle>
              <CardDescription>Ongoing voluntary donation drives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{campaign.title}</h4>
                      <Badge variant="outline">{campaign.donors} donors</Badge>
                    </div>
                    <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>KES {campaign.raised.toLocaleString()} / KES {campaign.target.toLocaleString()}</span>
                      <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Collection */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Collect Payment</CardTitle>
                <CardDescription>Process member payments and contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="member-select">Member</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="jane">Jane Smith</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contribution-type">Contribution Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contributionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name} - KES {type.amount}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input id="amount" type="number" placeholder="500" />
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button 
                      variant={selectedPaymentMethod === "mpesa" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("mpesa")}
                      className="h-20 flex-col"
                    >
                      <Phone className="h-6 w-6 mb-1" />
                      M-PESA
                    </Button>
                    <Button 
                      variant={selectedPaymentMethod === "manual" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("manual")}
                      className="h-20 flex-col"
                    >
                      <Receipt className="h-6 w-6 mb-1" />
                      Manual
                    </Button>
                    <Button 
                      variant={selectedPaymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setSelectedPaymentMethod("card")}
                      className="h-20 flex-col"
                    >
                      <CreditCard className="h-6 w-6 mb-1" />
                      Card
                    </Button>
                  </div>
                </div>

                {selectedPaymentMethod === "mpesa" && (
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">M-PESA STK Push</h4>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="254700000000" />
                    </div>
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Send STK Push
                    </Button>
                  </div>
                )}

                {selectedPaymentMethod === "manual" && (
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium">Manual Payment Verification</h4>
                    <div>
                      <Label htmlFor="transaction-code">Transaction Code</Label>
                      <Input id="transaction-code" placeholder="ABC123XYZ" />
                    </div>
                    <div>
                      <Label htmlFor="receipt-upload">Upload Receipt (Optional)</Label>
                      <Input id="receipt-upload" type="file" accept="image/*" />
                    </div>
                    <Button className="w-full">Verify Payment</Button>
                  </div>
                )}

                <Button className="w-full" size="lg">
                  <Receipt className="h-4 w-4 mr-2" />
                  Process Payment & Generate Receipt
                </Button>
              </CardContent>
            </Card>

            {/* Contribution Types */}
            <Card>
              <CardHeader>
                <CardTitle>Contribution Types</CardTitle>
                <CardDescription>Manage payment categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributionTypes.map((type) => (
                    <div key={type.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{type.name}</h4>
                        <Badge variant={type.mandatory ? "default" : "secondary"}>
                          {type.mandatory ? "Required" : "Optional"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">KES {type.amount}</p>
                      <p className="text-xs text-muted-foreground">{type.frequency}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Type
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{campaign.title}</CardTitle>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <CardDescription>
                    {campaign.donors} donors • Ends {new Date(campaign.deadline).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">
                        {Math.round((campaign.raised / campaign.target) * 100)}%
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.target) * 100} />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>KES {campaign.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">KES {campaign.target.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Users className="h-4 w-4 mr-1" />
                      Donors
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Target className="h-4 w-4 mr-1" />
                      Donate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Export financial data and analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income Summary</SelectItem>
                      <SelectItem value="payments">Payment History</SelectItem>
                      <SelectItem value="campaigns">Campaign Reports</SelectItem>
                      <SelectItem value="member">Member Contributions</SelectItem>
                      <SelectItem value="financial">Financial Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Financial overview for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PieChart className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Total Income</span>
                    </div>
                    <span className="font-medium">KES 15,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Total Expenses</span>
                    </div>
                    <span className="font-medium">KES 8,000</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Net Profit</span>
                    </div>
                    <span className="font-medium text-green-600">KES 7,000</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Paid Members</span>
                    </div>
                    <span className="font-medium">45/60</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Active Campaigns</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>M-PESA Configuration</CardTitle>
                <CardDescription>Configure M-PESA payment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="paybill">Paybill Number</Label>
                  <Input id="paybill" placeholder="123456" />
                </div>
                <div>
                  <Label htmlFor="shortcode">Shortcode</Label>
                  <Input id="shortcode" placeholder="174379" />
                </div>
                <div>
                  <Label htmlFor="consumer-key">Consumer Key</Label>
                  <Input id="consumer-key" type="password" placeholder="Your consumer key" />
                </div>
                <div>
                  <Label htmlFor="consumer-secret">Consumer Secret</Label>
                  <Input id="consumer-secret" type="password" placeholder="Your consumer secret" />
                </div>
                <Button>Save M-PESA Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization Branding</CardTitle>
                <CardDescription>Customize receipts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" placeholder="Student Organization" />
                </div>
                <div>
                  <Label htmlFor="org-logo">Logo Upload</Label>
                  <Input id="org-logo" type="file" accept="image/*" />
                </div>
                <div>
                  <Label htmlFor="receipt-footer">Receipt Footer Text</Label>
                  <Textarea id="receipt-footer" placeholder="Thank you for your contribution!" />
                </div>
                <div>
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kes">KES - Kenyan Shilling</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Branding Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;