
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Vote, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Members',
      value: '1,234',
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Upcoming Events',
      value: '5',
      icon: Calendar,
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Active Elections',
      value: '2',
      icon: Vote,
      change: 'New',
      changeType: 'neutral'
    },
    {
      title: 'Total Collections',
      value: 'KSh 45,600',
      icon: DollarSign,
      change: '+8%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'member',
      message: 'New member John Doe registered',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'event',
      message: 'Annual General Meeting scheduled',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Welfare contribution received from Mary Jane',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'election',
      message: 'Voting opened for Secretary position',
      time: '1 day ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your organization.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Member</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Create Event</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Vote className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">New Election</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Record Payment</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
