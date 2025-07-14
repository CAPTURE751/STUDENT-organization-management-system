import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, Download, Search, Filter, Plus, Eye, Edit2, Trash2, Calendar, User, FolderOpen, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  tags: string[];
  isStarred: boolean;
  downloadCount: number;
}

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: 'Organization Constitution',
      description: 'Official constitution and bylaws of the student organization',
      category: 'governance',
      uploadedBy: 'John Doe',
      uploadDate: '2024-01-15',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      tags: ['constitution', 'governance', 'official'],
      isStarred: true,
      downloadCount: 45
    },
    {
      id: 2,
      title: 'Meeting Minutes - January 2024',
      description: 'Minutes from the monthly general meeting',
      category: 'meetings',
      uploadedBy: 'Jane Smith',
      uploadDate: '2024-01-20',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      tags: ['minutes', 'meeting', 'january'],
      isStarred: false,
      downloadCount: 23
    },
    {
      id: 3,
      title: 'Event Planning Template',
      description: 'Standard template for organizing events',
      category: 'templates',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2024-01-10',
      fileSize: '850 KB',
      fileType: 'DOCX',
      tags: ['template', 'events', 'planning'],
      isStarred: true,
      downloadCount: 67
    },
    {
      id: 4,
      title: 'Budget Report Q1 2024',
      description: 'Financial report for the first quarter',
      category: 'financial',
      uploadedBy: 'Sarah Wilson',
      uploadDate: '2024-03-30',
      fileSize: '3.1 MB',
      fileType: 'XLSX',
      tags: ['budget', 'financial', 'q1', '2024'],
      isStarred: false,
      downloadCount: 31
    },
    {
      id: 5,
      title: 'Member Handbook',
      description: 'Comprehensive guide for new and existing members',
      category: 'resources',
      uploadedBy: 'Alex Brown',
      uploadDate: '2024-02-05',
      fileSize: '4.2 MB',
      fileType: 'PDF',
      tags: ['handbook', 'members', 'guide'],
      isStarred: true,
      downloadCount: 89
    }
  ]);

  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
    category: 'resources',
    tags: ''
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'governance', label: 'Governance' },
    { value: 'meetings', label: 'Meeting Minutes' },
    { value: 'financial', label: 'Financial' },
    { value: 'templates', label: 'Templates' },
    { value: 'resources', label: 'Resources' },
    { value: 'events', label: 'Events' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    if (!newDocument.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a document title",
        variant: "destructive",
      });
      return;
    }

    const document: Document = {
      id: documents.length + 1,
      title: newDocument.title,
      description: newDocument.description,
      category: newDocument.category,
      uploadedBy: 'Current User',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '1.5 MB',
      fileType: 'PDF',
      tags: newDocument.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isStarred: false,
      downloadCount: 0
    };

    setDocuments(prev => [document, ...prev]);
    setNewDocument({ title: '', description: '', category: 'resources', tags: '' });
    setIsUploadOpen(false);
    
    toast({
      title: "Success",
      description: "Document uploaded successfully",
    });
  };

  const handleStarToggle = (id: number) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
  };

  const handleDownload = (document: Document) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id ? { ...doc, downloadCount: doc.downloadCount + 1 } : doc
    ));
    
    toast({
      title: "Download Started",
      description: `Downloading ${document.title}`,
    });
  };

  const handleView = (document: Document) => {
    setSelectedDocument(document);
    setIsViewOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      governance: 'bg-purple-100 text-purple-800 border-purple-200',
      meetings: 'bg-blue-100 text-blue-800 border-blue-200',
      financial: 'bg-green-100 text-green-800 border-green-200',
      templates: 'bg-orange-100 text-orange-800 border-orange-200',
      resources: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      events: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getFileTypeIcon = (fileType: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize important documents and files
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter document title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter document description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newDocument.category} onValueChange={(value) => setNewDocument(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newDocument.tags}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g., important, template, draft"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File Upload</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop your file here, or click to browse
                  </p>
                  <Button variant="outline" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>
                  Upload Document
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Total Documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Starred</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.isStarred).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Total Downloads</p>
                <p className="text-2xl font-bold">{documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getFileTypeIcon(document.fileType)}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-1">{document.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {document.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStarToggle(document.id)}
                  className={document.isStarred ? 'text-yellow-500' : 'text-muted-foreground'}
                >
                  <Star className={`h-4 w-4 ${document.isStarred ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {document.uploadedBy}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {document.uploadDate}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className={getCategoryColor(document.category)}>
                    {categories.find(c => c.value === document.category)?.label}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {document.fileSize} • {document.fileType}
                  </div>
                </div>

                {document.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {document.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {document.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{document.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {document.downloadCount} downloads
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(document)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Upload your first document to get started.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Document Viewer Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[900px] h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedDocument?.title}</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedDocument && handleDownload(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-muted/50 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <FileText className="mx-auto h-24 w-24 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">Document Preview</h3>
              <p className="text-muted-foreground">
                Document preview would appear here
              </p>
              {selectedDocument && (
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p><strong>Category:</strong> {categories.find(c => c.value === selectedDocument.category)?.label}</p>
                  <p><strong>Uploaded by:</strong> {selectedDocument.uploadedBy}</p>
                  <p><strong>Upload date:</strong> {selectedDocument.uploadDate}</p>
                  <p><strong>File size:</strong> {selectedDocument.fileSize}</p>
                  <p><strong>Downloads:</strong> {selectedDocument.downloadCount}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;