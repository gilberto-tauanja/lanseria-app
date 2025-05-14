"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Booking {
  id: string
  type: "Flight" | "Hotel" | "Transfer" | "Parking" | "Tour"
  status: "Upcoming" | "Completed" | "Cancelled"
  date: string
  details: string
  reference: string
  price: number
}

interface LoyaltyPoints {
  total: number
  level: "Bronze" | "Silver" | "Gold"
  nextLevel: number
  history: {
    date: string
    points: number
    description: string
  }[]
}

const mockBookings: Booking[] = [
  {
    id: "1",
    type: "Flight",
    status: "Upcoming",
    date: "2024-02-15",
    details: "Lanseria → Cape Town | SA 123",
    reference: "FL123456",
    price: 1200
  },
  {
    id: "2",
    type: "Hotel",
    status: "Upcoming",
    date: "2024-02-15",
    details: "Lanseria Lodge | 2 nights",
    reference: "HT789012",
    price: 2400
  },
  {
    id: "3",
    type: "Parking",
    status: "Completed",
    date: "2024-01-20",
    details: "Zone A | 3 days",
    reference: "PK345678",
    price: 450
  },
  {
    id: "4",
    type: "Tour",
    status: "Cancelled",
    date: "2024-01-10",
    details: "Safari Adventure",
    reference: "TR901234",
    price: 2500
  }
]

const mockLoyalty: LoyaltyPoints = {
  total: 1250,
  level: "Silver",
  nextLevel: 2000,
  history: [
    {
      date: "2024-01-20",
      points: 150,
      description: "Flight booking SA 123"
    },
    {
      date: "2024-01-15",
      points: 200,
      description: "Hotel stay at Lanseria Lodge"
    },
    {
      date: "2024-01-10",
      points: 100,
      description: "Parking reservation"
    }
  ]
}

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+27 123 456 789",
    preferences: {
      newsletter: true,
      notifications: true,
      language: "English"
    }
  })

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate profile update
    alert("Profile updated successfully!")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your account, bookings, and preferences
          </p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Points</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Bookings</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.type}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.details}</TableCell>
                        <TableCell>{booking.reference}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${booking.status === "Upcoming" ? "bg-green-100 text-green-800" :
                              booking.status === "Completed" ? "bg-blue-100 text-blue-800" :
                              "bg-red-100 text-red-800"}`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>R${booking.price}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/bookings/${booking.id}`}>View Details</a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Loyalty Status</h2>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {mockLoyalty.total} points
                    </div>
                    <div className="text-sm text-gray-600">
                      {mockLoyalty.level} Member
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-1">
                        {mockLoyalty.nextLevel - mockLoyalty.total} points to next level
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${(mockLoyalty.total / mockLoyalty.nextLevel) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Points History</h3>
                  <div className="space-y-4">
                    {mockLoyalty.history.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{entry.description}</div>
                          <div className="text-sm text-gray-500">{entry.date}</div>
                        </div>
                        <div className="text-green-600 font-medium">+{entry.points} points</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-6">
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <Button type="submit">Update Profile</Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="p-6">
              <div className="space-y-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Newsletter Subscription</h3>
                    <p className="text-sm text-gray-500">Receive updates about promotions and news</p>
                  </div>
                  <Button
                    variant={userProfile.preferences.newsletter ? "default" : "outline"}
                    onClick={() => setUserProfile({
                      ...userProfile,
                      preferences: {
                        ...userProfile.preferences,
                        newsletter: !userProfile.preferences.newsletter
                      }
                    })}
                  >
                    {userProfile.preferences.newsletter ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Get real-time updates about your bookings</p>
                  </div>
                  <Button
                    variant={userProfile.preferences.notifications ? "default" : "outline"}
                    onClick={() => setUserProfile({
                      ...userProfile,
                      preferences: {
                        ...userProfile.preferences,
                        notifications: !userProfile.preferences.notifications
                      }
                    })}
                  >
                    {userProfile.preferences.notifications ? "Enabled" : "Enable"}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
