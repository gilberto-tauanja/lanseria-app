"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TourPackage {
  id: string
  name: string
  type: string
  duration: string
  price: number
  rating: number
  reviews: number
  description: string
  highlights: string[]
  includes: string[]
  image: string
  startTimes: string[]
  availability: "High" | "Medium" | "Low"
}

const mockPackages: TourPackage[] = [
  {
    id: "1",
    name: "Pilanesberg Safari Adventure",
    type: "Safari",
    duration: "Full Day (8-10 hours)",
    price: 2500,
    rating: 4.8,
    reviews: 156,
    description: "Experience an unforgettable safari adventure in Pilanesberg National Park. Spot the Big Five and enjoy professional guide commentary.",
    highlights: [
      "Big Five game viewing",
      "Professional safari guide",
      "Lunch at safari lodge",
      "Hotel pickup and drop-off"
    ],
    includes: [
      "Transport in air-conditioned vehicle",
      "Professional guide",
      "Park entrance fees",
      "Lunch and refreshments",
      "Hotel pickup and drop-off"
    ],
    image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg",
    startTimes: ["05:30", "06:00"],
    availability: "High"
  },
  {
    id: "2",
    name: "Cradle of Humankind Tour",
    type: "Cultural",
    duration: "Half Day (4-5 hours)",
    price: 1200,
    rating: 4.6,
    reviews: 89,
    description: "Visit the UNESCO World Heritage site and explore the origins of humankind at the Maropeng Visitor Centre and Sterkfontein Caves.",
    highlights: [
      "Maropeng Visitor Centre",
      "Sterkfontein Caves tour",
      "Interactive exhibits",
      "Expert guide"
    ],
    includes: [
      "Entrance fees",
      "Guide",
      "Transport",
      "Light refreshments"
    ],
    image: "https://images.pexels.com/photos/5273644/pexels-photo-5273644.jpeg",
    startTimes: ["09:00", "13:00"],
    availability: "Medium"
  },
  {
    id: "3",
    name: "Wine Route Experience",
    type: "Food & Wine",
    duration: "Full Day (7-8 hours)",
    price: 1800,
    rating: 4.7,
    reviews: 124,
    description: "Discover South African wines with visits to premium wineries, including tastings, cellar tours, and a gourmet lunch.",
    highlights: [
      "Premium wine tastings",
      "Cellar tours",
      "Gourmet lunch",
      "Scenic drives"
    ],
    includes: [
      "Wine tastings at 3 estates",
      "Lunch",
      "Transport",
      "Expert wine guide"
    ],
    image: "https://images.pexels.com/photos/2702805/pexels-photo-2702805.jpeg",
    startTimes: ["09:30"],
    availability: "High"
  }
]

export default function TourPackagesPage() {
  const [filters, setFilters] = useState({
    type: "all",
    duration: "all",
    priceRange: "all"
  })

  const filteredPackages = mockPackages.filter(pkg => {
    if (filters.type !== "all" && pkg.type !== filters.type) return false
    if (filters.duration !== "all") {
      if (filters.duration === "half" && !pkg.duration.includes("Half")) return false
      if (filters.duration === "full" && !pkg.duration.includes("Full")) return false
    }
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (pkg.price < min || pkg.price > max) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tour Packages & Experiences
          </h1>
          <p className="mt-2 text-gray-600">
            Discover the best tours and activities around Lanseria
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({ ...filters, type: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Safari">Safari</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Food & Wine">Food & Wine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Duration</Label>
              <Select
                value={filters.duration}
                onValueChange={(value) => setFilters({ ...filters, duration: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="half">Half Day</SelectItem>
                  <SelectItem value="full">Full Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price Range</Label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-1000">Under R$1,000</SelectItem>
                  <SelectItem value="1000-2000">R$1,000 - R$2,000</SelectItem>
                  <SelectItem value="2000-5000">R$2,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden flex flex-col">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  width={640}  // Example width that matches your aspect ratio
                  height={360} // 16:9 ratio (640/360 = 16/9)
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{pkg.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{pkg.type}</p>
                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Highlights:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {pkg.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {pkg.duration}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${pkg.availability === "High" ? "bg-green-100 text-green-800" :
                        pkg.availability === "Medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"}`}>
                      {pkg.availability} Availability
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">R${pkg.price}</span>
                    <span className="text-sm text-gray-500">/person</span>
                  </div>
                  <Button asChild>
                    <a href={`/pacotes/reserva?package=${pkg.id}`}>
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
