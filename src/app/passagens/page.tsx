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

interface Flight {
  id: string
  airline: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  stops: number
  seatsAvailable: number
}

const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "South African Airways",
    flightNumber: "SA 123",
    origin: "Lanseria",
    destination: "Cape Town",
    departureTime: "08:00",
    arrivalTime: "10:00",
    duration: "2h",
    price: 1200,
    stops: 0,
    seatsAvailable: 45
  },
  {
    id: "2",
    airline: "British Airways",
    flightNumber: "BA 456",
    origin: "Lanseria",
    destination: "London",
    departureTime: "21:00",
    arrivalTime: "07:00",
    duration: "10h",
    price: 8500,
    stops: 1,
    seatsAvailable: 32
  },
  {
    id: "3",
    airline: "Emirates",
    flightNumber: "EK 789",
    origin: "Lanseria",
    destination: "Dubai",
    departureTime: "14:30",
    arrivalTime: "00:30",
    duration: "8h",
    price: 6800,
    stops: 0,
    seatsAvailable: 28
  }
]

export default function FlightBookingPage() {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: "1"
  })
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Book Flights
          </h1>
          <p className="mt-2 text-gray-600">
            Search and compare flights from multiple airlines
          </p>
        </div>

        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="origin">From</Label>
              <Input
                id="origin"
                placeholder="Departure city"
                value={searchParams.origin}
                onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="destination">To</Label>
              <Input
                id="destination"
                placeholder="Arrival city"
                value={searchParams.destination}
                onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Select
                value={searchParams.passengers}
                onValueChange={(value) => setSearchParams({ ...searchParams, passengers: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-4">
              <Button type="submit" className="w-full">
                Search Flights
              </Button>
            </div>
          </form>
        </Card>

        {hasSearched && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Airline</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFlights.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell>
                        <div className="font-medium">{flight.airline}</div>
                        <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div>{flight.origin} → {flight.destination}</div>
                      </TableCell>
                      <TableCell>
                        <div>{flight.departureTime}</div>
                        <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
                      </TableCell>
                      <TableCell>{flight.duration}</TableCell>
                      <TableCell>
                        {flight.stops === 0 ? (
                          <span className="text-green-600">Direct</span>
                        ) : (
                          <span>{flight.stops} stop{flight.stops > 1 ? "s" : ""}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">R${flight.price}</div>
                        <div className="text-sm text-gray-500">
                          {flight.seatsAvailable} seats left
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={selectedFlight === flight.id ? "default" : "outline"}
                          onClick={() => setSelectedFlight(flight.id)}
                          className="w-full"
                        >
                          {selectedFlight === flight.id ? "Selected" : "Select"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {selectedFlight && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Total for {searchParams.passengers} passenger(s):</span>
                    <span className="ml-2 text-lg font-bold">
                      R${(mockFlights.find(f => f.id === selectedFlight)?.price || 0) * parseInt(searchParams.passengers)}
                    </span>
                  </div>
                  <Button asChild>
                    <a href={`/passagens/checkout?flight=${selectedFlight}&passengers=${searchParams.passengers}`}>
                      Continue to Booking
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
