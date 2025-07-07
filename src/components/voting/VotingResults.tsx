
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Download, BarChart3, Users, Trophy, FileText } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface VotingResultsProps {
  election: any;
  onBack: () => void;
}

const VotingResults: React.FC<VotingResultsProps> = ({ election, onBack }) => {
  const [viewType, setViewType] = useState<'summary' | 'detailed' | 'analytics'>('summary');

  // Mock results data
  const mockResults = {
    1: { // Chairperson
      candidates: [
        { id: 1, name: 'John Doe', votes: 156, percentage: 52.3 },
        { id: 2, name: 'Jane Smith', votes: 98, percentage: 32.9 },
        { id: 3, name: 'Mike Johnson', votes: 44, percentage: 14.8 }
      ],
      totalVotes: 298,
      winner: { id: 1, name: 'John Doe' }
    },
    2: { // Vice-Chairperson
      candidates: [
        { id: 4, name: 'Sarah Wilson', votes: 189, percentage: 63.4 },
        { id: 5, name: 'David Brown', votes: 109, percentage: 36.6 }
      ],
      totalVotes: 298,
      winner: { id: 4, name: 'Sarah Wilson' }
    }
  };

  const chartConfig = {
    votes: {
      label: "Votes",
      color: "#3b82f6",
    },
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getChartData = (positionId: number) => {
    const results = mockResults[positionId];
    if (!results) return [];
    
    return results.candidates.map((candidate, index) => ({
      name: candidate.name,
      votes: candidate.votes,
      percentage: candidate.percentage,
      fill: COLORS[index % COLORS.length]
    }));
  };

  const renderSummary = () => (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{election.votedCount}</p>
                <p className="text-sm text-gray-600">Total Votes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{((election.votedCount / election.totalVoters) * 100).toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Turnout</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{election.positions.length}</p>
                <p className="text-sm text-gray-600">Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Candidates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Winners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span>Election Winners</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(mockResults).map(([positionId, result]) => {
              const position = election.positions.find(p => p.id === parseInt(positionId));
              return (
                <div key={positionId} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {result.winner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-green-900">{result.winner.name}</p>
                      <p className="text-sm text-green-700">{position?.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-900">
                      {result.candidates.find(c => c.id === result.winner.id)?.votes} votes
                    </p>
                    <p className="text-sm text-green-700">
                      {result.candidates.find(c => c.id === result.winner.id)?.percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetailed = () => (
    <div className="space-y-6">
      {Object.entries(mockResults).map(([positionId, result]) => {
        const position = election.positions.find(p => p.id === parseInt(positionId));
        const chartData = getChartData(parseInt(positionId));
        
        return (
          <Card key={positionId}>
            <CardHeader>
              <CardTitle>{position?.title}</CardTitle>
              <p className="text-sm text-gray-600">{result.totalVotes} total votes cast</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div>
                  <h4 className="font-medium mb-4">Vote Distribution</h4>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="votes" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                {/* Pie Chart */}
                <div>
                  <h4 className="font-medium mb-4">Vote Percentage</h4>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="votes"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Detailed Results</h4>
                <div className="space-y-2">
                  {result.candidates.map((candidate, index) => (
                    <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={index === 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {index === 0 ? "Winner" : `#${index + 1}`}
                        </Badge>
                        <span className="font-medium">{candidate.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{candidate.votes} votes</p>
                        <p className="text-sm text-gray-600">{candidate.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Election Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Voter Turnout by Hour</h4>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart showing hourly voting patterns</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Votes by Department</h4>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart showing department-wise participation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-800">Encryption Status</span>
              <Badge className="bg-green-100 text-green-800">Secure</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-800">Duplicate Vote Check</span>
              <Badge className="bg-green-100 text-green-800">Passed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-800">Vote Integrity</span>
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Election Results</h2>
            <p className="text-gray-600">{election.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Audit Report
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2">
        <Button 
          variant={viewType === 'summary' ? 'default' : 'outline'}
          onClick={() => setViewType('summary')}
          size="sm"
        >
          Summary
        </Button>
        <Button 
          variant={viewType === 'detailed' ? 'default' : 'outline'}
          onClick={() => setViewType('detailed')}
          size="sm"
        >
          Detailed
        </Button>
        <Button 
          variant={viewType === 'analytics' ? 'default' : 'outline'}
          onClick={() => setViewType('analytics')}
          size="sm"
        >
          Analytics
        </Button>
      </div>

      {/* Content */}
      {viewType === 'summary' && renderSummary()}
      {viewType === 'detailed' && renderDetailed()}
      {viewType === 'analytics' && renderAnalytics()}
    </div>
  );
};

export default VotingResults;
