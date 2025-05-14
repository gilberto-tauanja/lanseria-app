"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Flight {
  id: string
  flightNumber: string
  airline: string
  origin: string
  destination: string
  scheduledTime: string
  status: "On Time" | "Delayed" | "Boarding" | "Departed" | "Arrived" | "Cancelled"
  terminal: string
  gate: string
}

const mockFlights: Flight[] = [
  {
    id: "1",
    flightNumber: "SA 123",
    airline: "South African Airways",
    origin: "Cape Town",
    destination: "Lanseria",
    scheduledTime: "09:00",
    status: "On Time",
    terminal: "A",
    gate: "12"
  },
  {
    id: "2",
    flightNumber: "BA 456",
    airline: "British Airways",
    origin: "Lanseria",
    destination: "London",
    scheduledTime: "10:30",
    status: "Boarding",
    terminal: "B",
    gate: "5"
  },
  {
    id: "3",
    flightNumber: "EK 789",
    airline: "Emirates",
    origin: "Dubai",
    destination: "Lanseria",
    scheduledTime: "11:45",
    status: "Delayed",
    terminal: "A",
    gate: "8"
  },
  {
    id: "4",
    flightNumber: "SA 234",
    airline: "South African Airways",
    origin: "Lanseria",
    destination: "Durban",
    scheduledTime: "12:15",
    status: "On Time",
    terminal: "B",
    gate: "3"
  }
]

export default function FlightTrackingPage() {
  const [flights, setFlights] = useState<Flight[]>(mockFlights)
  const [filter, setFilter] = useState({
    type: "all", // all, departures, arrivals
    search: "",
    status: "all" // all, ontime, delayed, etc.
  })

  const filteredFlights = flights.filter(flight => {
    if (filter.type === "departures" && flight.origin !== "Lanseria") return false
    if (filter.type === "arrivals" && flight.destination !== "Lanseria") return false
    if (filter.status !== "all" && flight.status.toLowerCase() !== filter.status) return false
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase()
      return (
        flight.flightNumber.toLowerCase().includes(searchTerm) ||
        flight.airline.toLowerCase().includes(searchTerm) ||
        flight.origin.toLowerCase().includes(searchTerm) ||
        flight.destination.toLowerCase().includes(searchTerm)
      )
    }
    return true
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates by randomly changing some flight statuses
      setFlights(currentFlights => 
        currentFlights.map(flight => ({
          ...flight,
          status: Math.random() > 0.8 
            ? ["On Time", "Delayed", "Boarding", "Departed"][Math.floor(Math.random() * 4)] as Flight["status"]
            : flight.status
        }))
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Flight Tracking
          </h1>
          <p className="mt-2 text-gray-600">
            Real-time flight information for Lanseria International Airport
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type">Flight Type</Label>
              <Select
                value={filter.type}
                onValueChange={(value) => setFilter({ ...filter, type: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select flight type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Flights</SelectItem>
                  <SelectItem value="departures">Departures</SelectItem>
                  <SelectItem value="arrivals">Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={filter.status}
                onValueChange={(value) => setFilter({ ...filter, status: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="on time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="departed">Departed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search flights..."
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flight</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Terminal</TableHead>
                  <TableHead>Gate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{flight.flightNumber}</div>
                        <div className="text-sm text-gray-500">{flight.airline}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{flight.origin}</div>
                        <div className="text-sm text-gray-500">to</div>
                        <div>{flight.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>{flight.scheduledTime}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${flight.status === "On Time" ? "bg-green-100 text-green-800" :
                          flight.status === "Delayed" ? "bg-red-100 text-red-800" :
                          flight.status === "Boarding" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"}`}>
                        {flight.status}
                      </span>
                    </TableCell>
                    <TableCell>{flight.terminal}</TableCell>
                    <TableCell>{flight.gate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          Flight information updates automatically every 30 seconds
        </div>
      </div>
    </div>
  )
}
