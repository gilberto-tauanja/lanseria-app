"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

interface Hotel {
  id: string
  name: string
  rating: number
  type: string
  location: string
  distanceToAirport: string
  pricePerNight: number
  amenities: string[]
  image: string
  availableRooms: number
}

const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Lanseria Lodge",
    rating: 4.5,
    type: "Resort",
    location: "Lanseria",
    distanceToAirport: "0.5 km",
    pricePerNight: 1200,
    amenities: ["Free WiFi", "Pool", "Restaurant", "Spa", "Airport Shuttle"],
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    availableRooms: 12
  },
  {
    id: "2",
    name: "Airport View Hotel",
    rating: 4.0,
    type: "Business Hotel",
    location: "Lanseria Airport Area",
    distanceToAirport: "1 km",
    pricePerNight: 950,
    amenities: ["Free WiFi", "Business Center", "Restaurant", "Fitness Center"],
    image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
    availableRooms: 8
  },
  {
    id: "3",
    name: "Safari Resort & Spa",
    rating: 4.8,
    type: "Luxury Resort",
    location: "Lanseria Nature Reserve",
    distanceToAirport: "3 km",
    pricePerNight: 2200,
    amenities: ["Free WiFi", "Pool", "Spa", "Safari Tours", "5-Star Restaurant"],
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    availableRooms: 5
  }
]

export default function HotelsPage() {
  const [filters, setFilters] = useState({
    priceRange: "all",
    type: "all",
    rating: "all"
  })

  const [searchDates, setSearchDates] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2"
  })

  const filteredHotels = mockHotels.filter(hotel => {
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (hotel.pricePerNight < min || hotel.pricePerNight > max) return false
    }
    if (filters.type !== "all" && hotel.type !== filters.type) return false
    if (filters.rating !== "all" && hotel.rating < Number(filters.rating)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hotels &amp; Resorts
          </h1>
          <p className="mt-2 text-gray-600">
            Find perfect accommodation near Lanseria Airport
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                value={searchDates.checkIn}
                onChange={(e) => setSearchDates({ ...searchDates, checkIn: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                value={searchDates.checkOut}
                onChange={(e) => setSearchDates({ ...searchDates, checkOut: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="guests">Guests</Label>
              <Select
                value={searchDates.guests}
                onValueChange={(value: string) => setSearchDates({ ...searchDates, guests: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priceRange">Price Range</Label>
              <Select
                value={filters.priceRange}
                onValueChange={(value: string) => setFilters({ ...filters, priceRange: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-1000">Under R1,000</SelectItem>
                  <SelectItem value="1000-2000">R1,000 - R2,000</SelectItem>
                  <SelectItem value="2000-3000">R2,000 - R3,000</SelectItem>
                  <SelectItem value="3000-999999">R3,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{hotel.type}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Location:</span> {hotel.location}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Distance to Airport:</span> {hotel.distanceToAirport}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Available Rooms:</span> {hotel.availableRooms}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-900">
                    R{hotel.pricePerNight}
                    <span className="text-sm font-normal text-gray-500">/night</span>
                  </div>
                  <Button asChild>
                    <a href={`/alojamentos/reserva?hotel=${hotel.id}&checkIn=${searchDates.checkIn}&checkOut=${searchDates.checkOut}&guests=${searchDates.guests}`}>
                      Book Now
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
