
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Clock, Shield, Vote, CheckCircle, AlertTriangle } from 'lucide-react';

interface VotingBoothProps {
  election: any;
  onBack: () => void;
}

const VotingBooth: React.FC<VotingBoothProps> = ({ election, onBack }) => {
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock candidates data
  const mockCandidates = {
    1: [
      { id: 1, name: 'John Doe', department: 'Computer Science', year: 'Year 3', manifesto: 'Focused on improving student services and academic excellence.', photo: null },
      { id: 2, name: 'Jane Smith', department: 'Business', year: 'Year 4', manifesto: 'Committed to transparent leadership and student welfare.', photo: null },
      { id: 3, name: 'Mike Johnson', department: 'Engineering', year: 'Year 3', manifesto: 'Advocating for better facilities and student representation.', photo: null }
    ],
    2: [
      { id: 4, name: 'Sarah Wilson', department: 'Medicine', year: 'Year 2', manifesto: 'Dedicated to supporting student mental health and well-being.', photo: null },
      { id: 5, name: 'David Brown', department: 'Arts', year: 'Year 3', manifesto: 'Working towards inclusive campus environment for all students.', photo: null }
    ]
  };

  const positions = election.positions.map(pos => ({
    ...pos,
    candidates: mockCandidates[pos.id] || []
  }));

  const handleVoteChange = (positionId: number, candidateId: number) => {
    setVotes(prev => ({
      ...prev,
      [positionId]: candidateId
    }));
  };

  const handleSubmitVote = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(election.endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Election has ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Elections
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vote Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your vote has been securely recorded and encrypted. Thank you for participating in the democratic process.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Your vote is anonymous and secure</span>
              </div>
              <p className="text-green-700 text-sm mt-2">
                Vote ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
              Return to Elections
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{election.title}</h2>
            <p className="text-gray-600">Cast your vote securely</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{getTimeRemaining()}</span>
        </div>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Secure Voting</h3>
              <p className="text-blue-700 text-sm mt-1">
                Your vote is encrypted and anonymous. You can only vote once per election. 
                Make sure to review your choices before submitting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Position {currentStep + 1} of {positions.length}</span>
        <div className="flex space-x-1">
          {positions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-blue-600' : 
                votes[positions[index].id] ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Voting Interface */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{positions[currentStep].title}</CardTitle>
              {positions[currentStep].description && (
                <p className="text-gray-600 mt-1">{positions[currentStep].description}</p>
              )}
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {positions[currentStep].candidates.length} candidates
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={votes[positions[currentStep].id]?.toString() || ''} 
            onValueChange={(value) => handleVoteChange(positions[currentStep].id, parseInt(value))}
          >
            <div className="space-y-4">
              {positions[currentStep].candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={candidate.id.toString()} id={candidate.id.toString()} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={candidate.id.toString()} className="cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.photo} />
                          <AvatarFallback>
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                          <p className="text-sm text-gray-600">{candidate.department} - {candidate.year}</p>
                          {candidate.manifesto && (
                            <p className="text-sm text-gray-700 mt-2">{candidate.manifesto}</p>
                          )}
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Position
        </Button>
        
        {currentStep < positions.length - 1 ? (
          <Button 
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!votes[positions[currentStep].id]}
          >
            Next Position
          </Button>
        ) : (
          <div className="space-x-2">
            <Button 
              variant="outline"
              onClick={() => {
                // Show confirmation dialog
                const confirmed = window.confirm(
                  `Are you sure you want to submit your vote? You have voted for ${Object.keys(votes).length} out of ${positions.length} positions. This action cannot be undone.`
                );
                if (confirmed) {
                  handleSubmitVote();
                }
              }}
              disabled={Object.keys(votes).length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Vote className="h-4 w-4 mr-2" />
                  Submit Vote
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Vote Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base">Your Vote Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {positions.map((position) => (
              <div key={position.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{position.title}:</span>
                <span className="text-sm font-medium">
                  {votes[position.id] ? 
                    position.candidates.find(c => c.id === votes[position.id])?.name || 'Unknown' : 
                    'Not selected'
                  }
                </span>
              </div>
            ))}
          </div>
          
          {Object.keys(votes).length < positions.length && (
            <div className="mt-4 flex items-center space-x-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">
                You have {positions.length - Object.keys(votes).length} position(s) remaining
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingBooth;
