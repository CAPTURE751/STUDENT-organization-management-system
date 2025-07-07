
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Search, Calendar, MapPin, Users, Clock } from 'lucide-react';

const Events = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const events = [
    {
      id: 1,
      title: 'Annual General Meeting',
      description: 'Discuss the yearly progress and elect new officials',
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Main Hall, Administration Block',
      category: 'Meeting',
      status: 'Upcoming',
      rsvpCount: 45,
      maxAttendees: 100,
      organizer: 'John Doe'
    },
    {
      id: 2,
      title: 'Career Development Workshop',
      description: 'Learn about career opportunities in tech industry',
      date: '2024-03-20',
      time: '2:00 PM',
      location: 'Computer Lab 1',
      category: 'Workshop',
      status: 'Upcoming',
      rsvpCount: 28,
      maxAttendees: 50,
      organizer: 'Mary Jane'
    },
    {
      id: 3,
      title: 'Charity Fundraiser',
      description: 'Support local orphanage through donations',
      date: '2024-02-28',
      time: '9:00 AM',
      location: 'University Grounds',
      category: 'Fundraiser',
      status: 'Completed',
      rsvpCount: 75,
      maxAttendees: 100,
      organizer: 'Peter Parker'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'Ongoing':
        return <Badge className="bg-green-100 text-green-800">Ongoing</Badge>;
      case 'Completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Meeting':
        return 'bg-purple-100 text-purple-800';
      case 'Workshop':
        return 'bg-orange-100 text-orange-800';
      case 'Fundraiser':
        return 'bg-green-100 text-green-800';
      case 'Social':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-600 mt-2">Manage organization events and activities</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge className={`mt-2 ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </Badge>
                </div>
                {getStatusBadge(event.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {event.rsvpCount}/{event.maxAttendees} attending
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {event.organizer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">by {event.organizer}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  {event.status === 'Upcoming' ? 'RSVP' : 'View Details'}
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input id="eventTitle" placeholder="Enter event title" />
              </div>

              <div>
                <Label htmlFor="eventDescription">Description</Label>
                <textarea
                  id="eventDescription"
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md"
                  placeholder="Describe the event..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventDate">Date</Label>
                  <Input id="eventDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="eventTime">Time</Label>
                  <Input id="eventTime" type="time" />
                </div>
              </div>

              <div>
                <Label htmlFor="eventLocation">Location</Label>
                <Input id="eventLocation" placeholder="Event venue" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventCategory">Category</Label>
                  <select id="eventCategory" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select category</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Fundraiser">Fundraiser</option>
                    <option value="Social">Social</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input id="maxAttendees" type="number" placeholder="100" />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Events;
