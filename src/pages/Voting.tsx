
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Calendar, Users, Vote, Settings, BarChart3, Eye } from 'lucide-react';
import VotingSetup from '@/components/voting/VotingSetup';
import VotingBooth from '@/components/voting/VotingBooth';
import VotingResults from '@/components/voting/VotingResults';

const Voting = () => {
  const [activeView, setActiveView] = useState<'list' | 'setup' | 'booth' | 'results'>('list');
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for elections
  const elections = [
    {
      id: 1,
      title: 'Student Guild Executive Elections 2024',
      description: 'Annual elections for student guild executive positions',
      type: 'general',
      status: 'upcoming',
      startDate: '2024-03-20T09:00:00',
      endDate: '2024-03-22T17:00:00',
      totalVoters: 450,
      votedCount: 0,
      positions: [
        { id: 1, title: 'Chairperson', candidates: 3 },
        { id: 2, title: 'Vice-Chairperson', candidates: 2 },
        { id: 3, title: 'Secretary', candidates: 4 },
        { id: 4, title: 'Treasurer', candidates: 2 }
      ]
    },
    {
      id: 2,
      title: 'Department Representatives Election',
      description: 'Elect representatives for each academic department',
      type: 'departmental',
      status: 'active',
      startDate: '2024-03-15T08:00:00',
      endDate: '2024-03-16T20:00:00',
      totalVoters: 280,
      votedCount: 156,
      positions: [
        { id: 1, title: 'Computer Science Rep', candidates: 3 },
        { id: 2, title: 'Business Rep', candidates: 2 }
      ]
    },
    {
      id: 3,
      title: 'Special Committee Elections',
      description: 'Elections for special committee positions',
      type: 'general',
      status: 'completed',
      startDate: '2024-02-10T09:00:00',
      endDate: '2024-02-12T17:00:00',
      totalVoters: 320,
      votedCount: 298,
      positions: [
        { id: 1, title: 'Sports Committee Chair', candidates: 2 },
        { id: 2, title: 'Academic Affairs Chair', candidates: 3 }
      ]
    }
  ];

  const filteredElections = elections.filter(election =>
    election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    election.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const handleVote = (election: any) => {
    setSelectedElection(election);
    setActiveView('booth');
  };

  const handleViewResults = (election: any) => {
    setSelectedElection(election);
    setActiveView('results');
  };

  if (activeView === 'setup') {
    return <VotingSetup onBack={() => setActiveView('list')} />;
  }

  if (activeView === 'booth' && selectedElection) {
    return (
      <VotingBooth 
        election={selectedElection} 
        onBack={() => setActiveView('list')} 
      />
    );
  }

  if (activeView === 'results' && selectedElection) {
    return (
      <VotingResults 
        election={selectedElection} 
        onBack={() => setActiveView('list')} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Elections & Voting</h2>
          <p className="text-gray-600 mt-2">Manage elections and cast your votes</p>
        </div>
        <Button onClick={() => setActiveView('setup')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Election
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search elections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Elections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredElections.map((election) => (
          <Card key={election.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl">{election.title}</CardTitle>
                  <p className="text-gray-600 text-sm mt-1">{election.description}</p>
                </div>
                {getStatusBadge(election.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(election.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {election.votedCount}/{election.totalVoters} voted
                </div>
              </div>

              {election.status === 'active' && (
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-green-800 font-medium text-sm">
                    {getTimeRemaining(election.endDate)}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Positions ({election.positions.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {election.positions.map((position) => (
                    <Badge key={position.id} variant="outline" className="text-xs">
                      {position.title} ({position.candidates})
                    </Badge>
                  ))}
                </div>
              </div>

              {election.status === 'active' && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-800 font-medium text-sm">Voting is now open!</p>
                      <p className="text-blue-600 text-xs">Cast your vote before the deadline</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleVote(election)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Vote className="h-4 w-4 mr-1" />
                      Vote Now
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                {election.status === 'completed' && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleViewResults(election)}
                    className="flex-1"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    View Results
                  </Button>
                )}
                
                {election.status !== 'completed' && (
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                )}
                
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredElections.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No elections found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'No elections have been created yet'}
            </p>
            <Button onClick={() => setActiveView('setup')}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Election
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Voting;
