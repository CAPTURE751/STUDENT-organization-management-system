import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, AlertTriangle, Users, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImpeachmentPetitionProps {
  onBack: () => void;
}

const ImpeachmentPetition: React.FC<ImpeachmentPetitionProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'create' | 'signatures' | 'review'>('create');
  const [petitionData, setPetitionData] = useState({
    accusedLeader: '',
    accusedRole: '',
    constitutionalViolation: '',
    misconductDescription: '',
    evidenceFile: null as File | null,
    supporterThreshold: 20, // 20% of active members
    currentSupport: 0
  });

  // Mock data for organization leaders
  const organizationLeaders = [
    { id: 1, name: 'John Doe', role: 'Chairperson', department: 'Computer Science' },
    { id: 2, name: 'Jane Smith', role: 'Vice-Chairperson', department: 'Business' },
    { id: 3, name: 'Mike Johnson', role: 'Secretary', department: 'Engineering' },
    { id: 4, name: 'Sarah Wilson', role: 'Treasurer', department: 'Medicine' },
  ];

  // Mock data for supporters
  const mockSupporters = [
    { id: 1, name: 'Alice Brown', department: 'Computer Science', timestamp: '2024-03-15 10:30:00' },
    { id: 2, name: 'Bob Green', department: 'Business', timestamp: '2024-03-15 11:15:00' },
    { id: 3, name: 'Carol White', department: 'Engineering', timestamp: '2024-03-15 12:00:00' },
  ];

  const totalMembers = 150;
  const requiredSignatures = Math.ceil(totalMembers * (petitionData.supporterThreshold / 100));
  const currentSignatures = mockSupporters.length;
  const progressPercentage = (currentSignatures / requiredSignatures) * 100;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPetitionData(prev => ({ ...prev, evidenceFile: file }));
      toast({
        title: "File uploaded",
        description: `${file.name} has been attached as evidence.`,
      });
    }
  };

  const handleSubmitPetition = () => {
    if (!petitionData.accusedLeader || !petitionData.constitutionalViolation || !petitionData.misconductDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep('signatures');
    toast({
      title: "Petition submitted",
      description: "Your impeachment petition is now collecting signatures.",
    });
  };

  const handleSupportPetition = () => {
    toast({
      title: "Signature added",
      description: "You have successfully endorsed this impeachment petition.",
    });
  };

  const renderCreatePetition = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800">Important Notice</h4>
            <p className="text-red-700 text-sm mt-1">
              Impeachment petitions are serious matters that affect the organization's leadership. 
              Ensure you have valid constitutional grounds and sufficient evidence before proceeding.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="accusedLeader">Leader to Impeach *</Label>
          <Select value={petitionData.accusedLeader} onValueChange={(value) => setPetitionData(prev => ({ ...prev, accusedLeader: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select leader" />
            </SelectTrigger>
            <SelectContent>
              {organizationLeaders.map((leader) => (
                <SelectItem key={leader.id} value={`${leader.name}-${leader.role}`}>
                  {leader.name} - {leader.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="accusedRole">Leadership Role</Label>
          <Input
            id="accusedRole"
            value={petitionData.accusedRole}
            onChange={(e) => setPetitionData(prev => ({ ...prev, accusedRole: e.target.value }))}
            placeholder="Will auto-fill based on selection"
            disabled
          />
        </div>
      </div>

      <div>
        <Label htmlFor="violation">Constitutional Violation *</Label>
        <Input
          id="violation"
          value={petitionData.constitutionalViolation}
          onChange={(e) => setPetitionData(prev => ({ ...prev, constitutionalViolation: e.target.value }))}
          placeholder="Quote the specific constitutional article or rule violated"
        />
      </div>

      <div>
        <Label htmlFor="description">Misconduct Description *</Label>
        <textarea
          id="description"
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md"
          value={petitionData.misconductDescription}
          onChange={(e) => setPetitionData(prev => ({ ...prev, misconductDescription: e.target.value }))}
          placeholder="Provide detailed description of the misconduct, including dates, witnesses, and specific actions that justify impeachment"
        />
      </div>

      <div>
        <Label htmlFor="evidence">Supporting Evidence (Optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            id="evidence"
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <label
            htmlFor="evidence"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-600">Upload documents, images, or other evidence</span>
            <span className="text-xs text-gray-500">PDF, DOC, JPG, PNG (Max 10MB)</span>
          </label>
          {petitionData.evidenceFile && (
            <div className="mt-3 p-2 bg-green-50 rounded-md flex items-center">
              <FileText className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-green-800">{petitionData.evidenceFile.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="font-medium text-blue-800 mb-2">Petition Requirements</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Requires {requiredSignatures} signatures ({petitionData.supporterThreshold}% of {totalMembers} active members)</li>
          <li>• Signers must be active members for 30+ days</li>
          <li>• Once verified, petition converts to formal impeachment vote</li>
          <li>• One impeachment motion per leader per semester maximum</li>
        </ul>
      </div>
    </div>
  );

  const renderSignatureCollection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Signature Collection Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Signatures Collected</span>
              <span className="text-sm text-gray-600">{currentSignatures} / {requiredSignatures}</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{Math.round(progressPercentage)}% Complete</span>
              <span>{requiredSignatures - currentSignatures} more needed</span>
            </div>
          </div>

          {progressPercentage < 100 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">Collection in progress - Share petition link with members</span>
              </div>
            </div>
          )}

          {progressPercentage >= 100 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-green-800">Threshold reached! Ready for admin verification</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Petition Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Accused Leader</h4>
            <p className="text-gray-600">{petitionData.accusedLeader}</p>
          </div>
          <div>
            <h4 className="font-medium">Constitutional Violation</h4>
            <p className="text-gray-600">{petitionData.constitutionalViolation}</p>
          </div>
          <div>
            <h4 className="font-medium">Misconduct Description</h4>
            <p className="text-gray-600">{petitionData.misconductDescription}</p>
          </div>
          {petitionData.evidenceFile && (
            <div>
              <h4 className="font-medium">Evidence Attached</h4>
              <div className="flex items-center text-blue-600">
                <FileText className="h-4 w-4 mr-2" />
                <span>{petitionData.evidenceFile.name}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Supporters ({mockSupporters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSupporters.map((supporter) => (
              <div key={supporter.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{supporter.name}</p>
                  <p className="text-sm text-gray-600">{supporter.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{new Date(supporter.timestamp).toLocaleDateString()}</p>
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {progressPercentage < 100 && (
        <div className="text-center">
          <Button onClick={handleSupportPetition} className="bg-blue-600 hover:bg-blue-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Support This Petition
          </Button>
          <p className="text-sm text-gray-600 mt-2">Your signature will be added to support this impeachment</p>
        </div>
      )}
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
          <h2 className="text-2xl font-bold text-gray-900">Impeachment Petition</h2>
          <p className="text-gray-600">
            {currentStep === 'create' && 'Create a new impeachment petition'}
            {currentStep === 'signatures' && 'Collecting member signatures'}
            {currentStep === 'review' && 'Under administrative review'}
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center space-x-4">
        <div className={`flex items-center ${currentStep === 'create' ? 'text-blue-600' : 'text-green-600'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 'create' ? 'bg-blue-100' : 'bg-green-100'}`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium">Create Petition</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className={`flex items-center ${currentStep === 'signatures' ? 'text-blue-600' : currentStep === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 'signatures' ? 'bg-blue-100' : currentStep === 'review' ? 'bg-green-100' : 'bg-gray-100'}`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium">Collect Signatures</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className={`flex items-center ${currentStep === 'review' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 'review' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            3
          </div>
          <span className="ml-2 text-sm font-medium">Admin Review</span>
        </div>
      </div>

      {currentStep === 'create' && (
        <>
          {renderCreatePetition()}
          <div className="flex justify-end">
            <Button onClick={handleSubmitPetition} className="bg-red-600 hover:bg-red-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Submit Impeachment Petition
            </Button>
          </div>
        </>
      )}

      {currentStep === 'signatures' && renderSignatureCollection()}
    </div>
  );
};

export default ImpeachmentPetition;