"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TransferService {
  id: string
  type: string
  name: string
  capacity: number
  pricePerKm: number
  minPrice: number
  features: string[]
  estimatedTime: string
  available: boolean
}

const mockServices: TransferService[] = [
  {
    id: "1",
    type: "Shuttle",
    name: "Airport Express Shuttle",
    capacity: 12,
    pricePerKm: 5,
    minPrice: 100,
    features: ["Air Conditioning", "WiFi", "Luggage Space"],
    estimatedTime: "30-45 min",
    available: true
  },
  {
    id: "2",
    type: "Private",
    name: "Executive Car Service",
    capacity: 4,
    pricePerKm: 12,
    minPrice: 250,
    features: ["Luxury Vehicle", "Professional Driver", "Meet & Greet", "WiFi"],
    estimatedTime: "25-35 min",
    available: true
  },
  {
    id: "3",
    type: "Minibus",
    name: "Group Transfer",
    capacity: 16,
    pricePerKm: 8,
    minPrice: 350,
    features: ["Air Conditioning", "Large Luggage Space", "Group Booking"],
    estimatedTime: "35-50 min",
    available: true
  }
]

const popularDestinations = [
  { name: "Sandton City", distance: 35 },
  { name: "Pretoria Central", distance: 45 },
  { name: "Sun City Resort", distance: 120 },
  { name: "Johannesburg CBD", distance: 40 }
]

export default function TransfersPage() {
  const [bookingDetails, setBookingDetails] = useState({
    destination: "",
    date: "",
    time: "",
    passengers: "1",
    serviceType: "all"
  })

  const [customDestination, setCustomDestination] = useState("")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const calculatePrice = (service: TransferService, distance: number) => {
    const price = Math.max(service.minPrice, service.pricePerKm * distance)
    return price
  }

  const filteredServices = mockServices.filter(service => {
    if (bookingDetails.serviceType !== "all" && service.type !== bookingDetails.serviceType) return false
    if (!service.available) return false
    if (parseInt(bookingDetails.passengers) > service.capacity) return false
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Airport Transfers
          </h1>
          <p className="mt-2 text-gray-600">
            Book reliable airport transfers and shuttle services
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="destination">Destination</Label>
              <Select
                value={bookingDetails.destination}
                onValueChange={(value) => setBookingDetails({ ...bookingDetails, destination: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Custom Destination</SelectItem>
                  {popularDestinations.map((dest) => (
                    <SelectItem key={dest.name} value={dest.name}>
                      {dest.name} ({dest.distance} km)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {bookingDetails.destination === "" && (
                <Input
                  placeholder="Enter custom destination"
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={bookingDetails.date}
                onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={bookingDetails.time}
                onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Select
                value={bookingDetails.passengers}
                onValueChange={(value) => setBookingDetails({ ...bookingDetails, passengers: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 8, 12, 16].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          {filteredServices.map((service) => {
            const destination = bookingDetails.destination || customDestination
            const distance = popularDestinations.find(d => d.name === destination)?.distance || 30
            const price = calculatePrice(service, distance)

            return (
              <Card key={service.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.type}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Capacity:</span> {service.capacity} passengers
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Estimated Time:</span> {service.estimatedTime}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">R${price}</p>
                      <p className="text-sm text-gray-500">
                        {destination ? `${distance} km journey` : 'Estimated price'}
                      </p>
                    </div>
                    <Button
                      variant={selectedService === service.id ? "default" : "outline"}
                      onClick={() => setSelectedService(service.id)}
                      className="mt-4 md:mt-0"
                    >
                      {selectedService === service.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {selectedService && (
          <div className="mt-8 flex justify-end">
            <Button asChild>
              <a href={`/transfers/checkout?service=${selectedService}&destination=${bookingDetails.destination || customDestination}&date=${bookingDetails.date}&time=${bookingDetails.time}&passengers=${bookingDetails.passengers}`}>
                Continue to Booking
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
