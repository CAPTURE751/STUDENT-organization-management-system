
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Calendar, Users, Vote, Settings, BarChart3, Eye, AlertTriangle, Clock, FileText } from 'lucide-react';
import VotingSetup from '@/components/voting/VotingSetup';
import VotingBooth from '@/components/voting/VotingBooth';
import VotingResults from '@/components/voting/VotingResults';
import ImpeachmentPetition from '@/components/voting/ImpeachmentPetition';
import ImpeachmentVote from '@/components/voting/ImpeachmentVote';

const Voting = () => {
  const [activeView, setActiveView] = useState<'list' | 'setup' | 'booth' | 'results' | 'impeachment' | 'impeach-vote'>('list');
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [selectedPetition, setSelectedPetition] = useState<any>(null);
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

  // Mock data for impeachment petitions
  const impeachmentPetitions = [
    {
      id: 1,
      accusedLeader: 'John Doe - Chairperson',
      accusedRole: 'Chairperson',
      constitutionalViolation: 'Article 5.2: Failure to convene mandatory monthly meetings',
      misconductDescription: 'The chairperson has failed to convene mandatory monthly meetings for the past 3 months, violating constitutional requirements and hindering organizational governance.',
      evidenceFile: { name: 'meeting_attendance_records.pdf' },
      supportCount: 32,
      status: 'collecting', // collecting, verified, voting, completed
      createdDate: '2024-03-10T10:00:00',
      requiredSignatures: 30,
      type: 'impeachment'
    },
    {
      id: 2,
      accusedLeader: 'Sarah Wilson - Treasurer',
      accusedRole: 'Treasurer',
      constitutionalViolation: 'Article 7.1: Misappropriation of organizational funds',
      misconductDescription: 'Unauthorized expenditure of $2,500 from organization funds without proper approval or documentation.',
      evidenceFile: { name: 'financial_discrepancies.pdf' },
      supportCount: 45,
      status: 'voting',
      createdDate: '2024-03-05T14:30:00',
      requiredSignatures: 30,
      type: 'impeachment'
    }
  ];

  const allItems = [...elections, ...impeachmentPetitions];
  const filteredElections = allItems.filter(item =>
    ('title' in item && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ('description' in item && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ('accusedLeader' in item && item.accusedLeader.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const handleImpeachmentVote = (petition: any) => {
    setSelectedPetition(petition);
    setActiveView('impeach-vote');
  };

  if (activeView === 'setup') {
    return <VotingSetup onBack={() => setActiveView('list')} />;
  }

  if (activeView === 'impeachment') {
    return <ImpeachmentPetition onBack={() => setActiveView('list')} />;
  }

  if (activeView === 'impeach-vote' && selectedPetition) {
    return (
      <ImpeachmentVote 
        petition={selectedPetition} 
        onBack={() => setActiveView('list')} 
      />
    );
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
        <div className="space-x-3">
          <Button onClick={() => setActiveView('setup')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Election
          </Button>
          <Button 
            onClick={() => setActiveView('impeachment')}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            File Impeachment
          </Button>
        </div>
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

      {/* Elections & Impeachment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredElections.map((item) => (
          <Card key={item.id} className={`hover:shadow-lg transition-shadow ${item.type === 'impeachment' ? 'border-red-200' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {item.type === 'impeachment' ? (
                    <>
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <Badge className="bg-red-100 text-red-800">Impeachment Petition</Badge>
                      </div>
                       <CardTitle className="text-xl text-red-600">
                         Impeachment of {'accusedLeader' in item ? item.accusedLeader.split(' - ')[0] : ''}
                       </CardTitle>
                       <p className="text-gray-600 text-sm mt-1">
                         {'accusedRole' in item ? item.accusedRole : ''} - {'constitutionalViolation' in item ? item.constitutionalViolation : ''}
                       </p>
                    </>
                  ) : (
                    <>
                       <CardTitle className="text-xl">{'title' in item ? item.title : ''}</CardTitle>
                       <p className="text-gray-600 text-sm mt-1">{'description' in item ? item.description : ''}</p>
                    </>
                  )}
                </div>
                {item.type === 'impeachment' ? (
                  <Badge className={`
                    ${item.status === 'collecting' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${item.status === 'verified' ? 'bg-blue-100 text-blue-800' : ''}
                    ${item.status === 'voting' ? 'bg-red-100 text-red-800' : ''}
                    ${item.status === 'completed' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {item.status === 'collecting' && 'Collecting Signatures'}
                    {item.status === 'verified' && 'Verified'}
                    {item.status === 'voting' && 'Voting Active'}
                    {item.status === 'completed' && 'Completed'}
                  </Badge>
                ) : (
                  getStatusBadge(item.status)
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.type === 'impeachment' ? (
                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center text-sm text-gray-600">
                     <Calendar className="h-4 w-4 mr-2" />
                     {'createdDate' in item ? new Date(item.createdDate).toLocaleDateString() : ''}
                   </div>
                   <div className="flex items-center text-sm text-gray-600">
                     <Users className="h-4 w-4 mr-2" />
                     {'supportCount' in item && 'requiredSignatures' in item ? `${item.supportCount}/${item.requiredSignatures} signatures` : ''}
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center text-sm text-gray-600">
                     <Calendar className="h-4 w-4 mr-2" />
                     {'startDate' in item ? new Date(item.startDate).toLocaleDateString() : ''}
                   </div>
                   <div className="flex items-center text-sm text-gray-600">
                     <Users className="h-4 w-4 mr-2" />
                     {'votedCount' in item && 'totalVoters' in item ? `${item.votedCount}/${item.totalVoters} voted` : ''}
                   </div>
                </div>
              )}

              {item.type !== 'impeachment' && item.status === 'active' && 'endDate' in item && (
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-green-800 font-medium text-sm">
                    {getTimeRemaining(item.endDate)}
                  </p>
                </div>
              )}
              
              {item.type === 'impeachment' && item.status === 'voting' && (
                <div className="bg-red-50 p-3 rounded-md">
                  <p className="text-red-800 font-medium text-sm">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Impeachment vote in progress
                  </p>
                </div>
              )}

              {item.type === 'impeachment' ? (
                 <div className="space-y-2">
                   <h4 className="font-medium text-sm">Misconduct Description</h4>
                   <p className="text-xs text-gray-600">
                     {'misconductDescription' in item ? item.misconductDescription : ''}
                   </p>
                   {'evidenceFile' in item && item.evidenceFile && (
                     <div className="flex items-center text-xs text-blue-600">
                       <FileText className="h-3 w-3 mr-1" />
                       Evidence attached
                     </div>
                   )}
                 </div>
              ) : (
                 <div className="space-y-2">
                   <h4 className="font-medium text-sm">
                     Positions ({'positions' in item ? item.positions.length : 0})
                   </h4>
                   <div className="flex flex-wrap gap-1">
                     {'positions' in item && item.positions.map((position) => (
                       <Badge key={position.id} variant="outline" className="text-xs">
                         {position.title} ({position.candidates})
                       </Badge>
                     ))}
                   </div>
                 </div>
              )}

              {item.type !== 'impeachment' && item.status === 'active' && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-800 font-medium text-sm">Voting is now open!</p>
                      <p className="text-blue-600 text-xs">Cast your vote before the deadline</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleVote(item)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Vote className="h-4 w-4 mr-1" />
                      Vote Now
                    </Button>
                  </div>
                </div>
              )}

              {item.type === 'impeachment' && item.status === 'voting' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-800 font-medium text-sm">Impeachment vote active!</p>
                      <p className="text-red-600 text-xs">Cast your anonymous vote</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleImpeachmentVote(item)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Vote className="h-4 w-4 mr-1" />
                      Vote
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                {item.type === 'impeachment' ? (
                  <>
                    {item.status === 'completed' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewResults(item)}
                        className="flex-1"
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Results
                      </Button>
                    )}
                    
                    {item.status !== 'completed' && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Petition
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {item.status === 'completed' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewResults(item)}
                        className="flex-1"
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Results
                      </Button>
                    )}
                    
                    {item.status !== 'completed' && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    )}
                    
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredElections.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No elections or petitions found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'No elections or impeachment petitions have been created yet'}
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
