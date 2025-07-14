import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, AlertTriangle, Users, Clock, FileText, CheckCircle, XCircle, Vote, Shield, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImpeachmentVoteProps {
  petition: any;
  onBack: () => void;
}

const ImpeachmentVote: React.FC<ImpeachmentVoteProps> = ({ petition, onBack }) => {
  const { toast } = useToast();
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'impeach' | 'dismiss' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock vote data
  const voteData = {
    totalEligibleVoters: 150,
    votedCount: 89,
    impeachVotes: 52,
    dismissVotes: 37,
    quorumRequired: 75, // 50% of total members
    majorityRequired: 67, // 2/3 majority
    timeRemaining: '2 days 5 hours',
    endDate: '2024-03-22T17:00:00'
  };

  const votingProgress = (voteData.votedCount / voteData.totalEligibleVoters) * 100;
  const quorumMet = voteData.votedCount >= voteData.quorumRequired;
  const impeachmentPassing = voteData.impeachVotes >= voteData.majorityRequired;

  const handleVoteSubmit = () => {
    if (!selectedVote) return;

    setHasVoted(true);
    setShowConfirmation(true);
    toast({
      title: "Vote submitted",
      description: "Your anonymous vote has been recorded.",
    });
  };

  const handleDownloadRecord = () => {
    toast({
      title: "Download started",
      description: "Impeachment vote record is being downloaded.",
    });
  };

  if (showConfirmation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Voting
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vote Confirmation</h2>
            <p className="text-gray-600">Your vote has been successfully recorded</p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Vote Submitted Successfully</h3>
            <p className="text-gray-600 mb-6">
              Your anonymous vote for the impeachment of <strong>{petition.accusedLeader}</strong> has been recorded.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h4 className="font-medium text-blue-800 mb-2">Vote Details</h4>
              <div className="text-sm text-blue-700">
                <p>Vote Cast: <strong>{selectedVote === 'impeach' ? 'Support Impeachment' : 'Dismiss Petition'}</strong></p>
                <p>Date: {new Date().toLocaleString()}</p>
                <p>Voting ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>

            <div className="space-x-3">
              <Button onClick={onBack}>
                Continue to Results
              </Button>
              <Button variant="outline" onClick={handleDownloadRecord}>
                <Download className="h-4 w-4 mr-2" />
                Download Vote Record
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Impeachment Vote</h2>
          <p className="text-gray-600">Cast your vote on the impeachment petition</p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Anonymous Voting</h4>
            <p className="text-green-700 text-sm mt-1">
              Your vote is completely anonymous and cannot be traced back to you. Vote according to your conscience.
            </p>
          </div>
        </div>
      </div>

      {/* Voting Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Voting Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Participation</span>
              <span className="text-sm text-gray-600">{voteData.votedCount} / {voteData.totalEligibleVoters}</span>
            </div>
            <Progress value={votingProgress} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{Math.round(votingProgress)}% Voted</span>
              <span>{voteData.totalEligibleVoters - voteData.votedCount} pending</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-red-50 rounded-md">
                <p className="text-sm font-medium text-red-800">Impeach Votes</p>
                <p className="text-2xl font-bold text-red-600">{voteData.impeachVotes}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-md">
                <p className="text-sm font-medium text-blue-800">Dismiss Votes</p>
                <p className="text-2xl font-bold text-blue-600">{voteData.dismissVotes}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">{voteData.timeRemaining} remaining</span>
              </div>
              <div className="flex space-x-4 text-xs">
                <span className={`${quorumMet ? 'text-green-600' : 'text-red-600'}`}>
                  Quorum: {quorumMet ? 'Met' : 'Not Met'} ({voteData.quorumRequired} needed)
                </span>
                <span className={`${impeachmentPassing ? 'text-red-600' : 'text-blue-600'}`}>
                  2/3 Majority: {impeachmentPassing ? 'Passing' : 'Not Passing'} ({voteData.majorityRequired} needed)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Petition Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Impeachment Petition Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Accused Leader</h4>
              <p className="text-gray-600">{petition.accusedLeader}</p>
            </div>
            <div>
              <h4 className="font-medium">Position</h4>
              <p className="text-gray-600">{petition.accusedRole}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium">Constitutional Violation</h4>
            <p className="text-gray-600 bg-red-50 p-3 rounded-md border border-red-200">
              "{petition.constitutionalViolation}"
            </p>
          </div>
          
          <div>
            <h4 className="font-medium">Misconduct Description</h4>
            <p className="text-gray-600">{petition.misconductDescription}</p>
          </div>

          {petition.evidenceFile && (
            <div>
              <h4 className="font-medium">Evidence Attached</h4>
              <div className="flex items-center text-blue-600 bg-blue-50 p-3 rounded-md">
                <FileText className="h-4 w-4 mr-2" />
                <span>{petition.evidenceFile.name}</span>
                <Button variant="link" size="sm" className="ml-auto">
                  View Evidence
                </Button>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium">Petition Support</h4>
            <p className="text-gray-600">
              {petition.supportCount} members ({Math.round((petition.supportCount / voteData.totalEligibleVoters) * 100)}%) 
              signed the petition to initiate this impeachment vote.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Voting Section */}
      {!hasVoted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Vote className="h-5 w-5 mr-2" />
              Cast Your Vote
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 mb-4">
              Based on the evidence presented, do you support the impeachment of {petition.accusedLeader}?
            </p>

            <div className="space-y-3">
              <div 
                className={`p-4 border-2 rounded-md cursor-pointer transition-all ${
                  selectedVote === 'impeach' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => setSelectedVote('impeach')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedVote === 'impeach' ? 'border-red-500 bg-red-500' : 'border-gray-300'
                  }`}>
                    {selectedVote === 'impeach' && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600">Support Impeachment</h4>
                    <p className="text-sm text-gray-600">
                      I believe the evidence supports removing {petition.accusedLeader} from office
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-md cursor-pointer transition-all ${
                  selectedVote === 'dismiss' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedVote('dismiss')}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedVote === 'dismiss' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedVote === 'dismiss' && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600">Dismiss Petition</h4>
                    <p className="text-sm text-gray-600">
                      I believe the evidence is insufficient to justify impeachment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={handleVoteSubmit}
                disabled={!selectedVote}
                className={`w-full ${selectedVote === 'impeach' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                <Vote className="h-4 w-4 mr-2" />
                Submit Anonymous Vote
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                This action cannot be undone. Your vote will remain anonymous.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasVoted && (
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vote Already Cast</h3>
            <p className="text-gray-600">
              You have already voted in this impeachment. Thank you for your participation.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImpeachmentVote;