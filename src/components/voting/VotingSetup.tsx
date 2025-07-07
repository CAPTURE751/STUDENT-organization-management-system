
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Plus, Trash2, Upload, Calendar, Users, Settings } from 'lucide-react';

interface VotingSetupProps {
  onBack: () => void;
}

const VotingSetup: React.FC<VotingSetupProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [electionData, setElectionData] = useState({
    title: '',
    description: '',
    type: 'general',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    votingRules: 'single',
    autoClose: true,
    positions: [
      { id: 1, title: '', description: '', candidates: [] }
    ],
    eligibilityRules: {
      academicYear: [],
      department: [],
      membershipStatus: ['active'],
      gender: 'all'
    }
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    department: '',
    academicYear: '',
    manifesto: '',
    photo: null
  });

  const addPosition = () => {
    const newPosition = {
      id: Date.now(),
      title: '',
      description: '',
      candidates: []
    };
    setElectionData(prev => ({
      ...prev,
      positions: [...prev.positions, newPosition]
    }));
  };

  const removePosition = (positionId: number) => {
    setElectionData(prev => ({
      ...prev,
      positions: prev.positions.filter(p => p.id !== positionId)
    }));
  };

  const updatePosition = (positionId: number, field: string, value: string) => {
    setElectionData(prev => ({
      ...prev,
      positions: prev.positions.map(p => 
        p.id === positionId ? { ...p, [field]: value } : p
      )
    }));
  };

  const addCandidate = (positionId: number) => {
    if (!newCandidate.name.trim()) return;
    
    const candidate = {
      id: Date.now(),
      ...newCandidate
    };

    setElectionData(prev => ({
      ...prev,
      positions: prev.positions.map(p => 
        p.id === positionId 
          ? { ...p, candidates: [...p.candidates, candidate] }
          : p
      )
    }));

    setNewCandidate({
      name: '',
      department: '',
      academicYear: '',
      manifesto: '',
      photo: null
    });
  };

  const removeCandidate = (positionId: number, candidateId: number) => {
    setElectionData(prev => ({
      ...prev,
      positions: prev.positions.map(p => 
        p.id === positionId 
          ? { ...p, candidates: p.candidates.filter(c => c.id !== candidateId) }
          : p
      )
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Election Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">Election Title</Label>
            <Input
              id="title"
              value={electionData.title}
              onChange={(e) => setElectionData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Student Guild Executive Elections 2024"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md"
              value={electionData.description}
              onChange={(e) => setElectionData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the election purpose and any special instructions"
            />
          </div>

          <div>
            <Label>Election Type</Label>
            <Select value={electionData.type} onValueChange={(value) => setElectionData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Election</SelectItem>
                <SelectItem value="departmental">Departmental Election</SelectItem>
                <SelectItem value="special">Special Election</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Voting Rules</Label>
            <Select value={electionData.votingRules} onValueChange={(value) => setElectionData(prev => ({ ...prev, votingRules: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">One vote per position</SelectItem>
                <SelectItem value="ranked">Ranked choice voting</SelectItem>
                <SelectItem value="weighted">Weighted voting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Election Period</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={electionData.startDate}
              onChange={(e) => setElectionData(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={electionData.startTime}
              onChange={(e) => setElectionData(prev => ({ ...prev, startTime: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={electionData.endDate}
              onChange={(e) => setElectionData(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={electionData.endTime}
              onChange={(e) => setElectionData(prev => ({ ...prev, endTime: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox 
            id="autoClose"
            checked={electionData.autoClose}
            onCheckedChange={(checked) => setElectionData(prev => ({ ...prev, autoClose: checked }))}
          />
          <Label htmlFor="autoClose">Auto-close election after end time</Label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Positions & Candidates</h3>
        <Button onClick={addPosition} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Position
        </Button>
      </div>

      {electionData.positions.map((position, index) => (
        <Card key={position.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Position Title (e.g., Chairperson)"
                  value={position.title}
                  onChange={(e) => updatePosition(position.id, 'title', e.target.value)}
                />
                <Input
                  placeholder="Position Description (optional)"
                  value={position.description}
                  onChange={(e) => updatePosition(position.id, 'description', e.target.value)}
                />
              </div>
              {electionData.positions.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removePosition(position.id)}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Candidates ({position.candidates.length})</h4>
              </div>
              
              {position.candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.department} - {candidate.academicYear}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCandidate(position.id, candidate.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="border-t pt-4">
                <h5 className="font-medium mb-3">Add New Candidate</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Candidate Name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Department"
                    value={newCandidate.department}
                    onChange={(e) => setNewCandidate(prev => ({ ...prev, department: e.target.value }))}
                  />
                  <Input
                    placeholder="Academic Year"
                    value={newCandidate.academicYear}
                    onChange={(e) => setNewCandidate(prev => ({ ...prev, academicYear: e.target.value }))}
                  />
                  <Button
                    onClick={() => addCandidate(position.id)}
                    disabled={!newCandidate.name.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Candidate
                  </Button>
                </div>
                <div className="mt-3">
                  <textarea
                    className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md"
                    placeholder="Candidate manifesto/bio (optional)"
                    value={newCandidate.manifesto}
                    onChange={(e) => setNewCandidate(prev => ({ ...prev, manifesto: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Voter Eligibility Rules</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Academic Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Postgraduate'].map((year) => (
                <div key={year} className="flex items-center space-x-2">
                  <Checkbox id={year} />
                  <Label htmlFor={year}>{year}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts'].map((dept) => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox id={dept} />
                  <Label htmlFor={dept}>{dept}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Active', 'Pending', 'Suspended'].map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox id={status} defaultChecked={status === 'Active'} />
                  <Label htmlFor={status}>{status}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gender</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Genders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female Only</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Election</h2>
          <p className="text-gray-600">Step {currentStep} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < 3 ? (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </Button>
        ) : (
          <Button className="bg-green-600 hover:bg-green-700">
            Create Election
          </Button>
        )}
      </div>
    </div>
  );
};

export default VotingSetup;
