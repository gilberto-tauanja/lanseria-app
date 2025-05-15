"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Shop {
  id: string
  name: string
  type: "Retail" | "Restaurant" | "Duty Free"
  category: string
  location: string
  openingHours: string
  description: string
  image: string
  priceRange: "€" | "€€" | "€€€"
  rating: number
  reviews: number
  features: string[]
}

const mockShops: Shop[] = [
  {
    id: "1",
    name: "Sky Duty Free",
    type: "Duty Free",
    category: "Multi-Brand",
    location: "International Terminal",
    openingHours: "05:00 - 23:00",
    description: "Premium duty-free shopping featuring international brands in perfumes, cosmetics, liquor, and more.",
    image: "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg",
    priceRange: "€€",
    rating: 4.5,
    reviews: 128,
    features: ["Tax Free", "International Brands", "Price Match"]
  },
  {
    id: "2",
    name: "African Flavors",
    type: "Restaurant",
    category: "Local Cuisine",
    location: "Food Court",
    openingHours: "06:00 - 22:00",
    description: "Traditional South African cuisine with modern twists. Perfect for experiencing local flavors.",
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
    priceRange: "€€",
    rating: 4.7,
    reviews: 256,
    features: ["Local Cuisine", "Full Bar", "Vegetarian Options"]
  },
  {
    id: "3",
    name: "Tech Hub",
    type: "Retail",
    category: "Electronics",
    location: "Main Terminal",
    openingHours: "07:00 - 21:00",
    description: "Latest gadgets, travel electronics, and accessories. Expert staff to help with your tech needs.",
    image: "https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg",
    priceRange: "€€€",
    rating: 4.3,
    reviews: 89,
    features: ["Tech Support", "International Warranty", "Wide Selection"]
  }
]

export default function ComercioPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all"
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredShops = mockShops.filter(shop => {
    if (activeTab !== "all" && shop.type.toLowerCase() !== activeTab) return false
    if (filters.category !== "all" && shop.category !== filters.category) return false
    if (filters.priceRange !== "all" && shop.priceRange !== filters.priceRange) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        shop.name.toLowerCase().includes(query) ||
        shop.description.toLowerCase().includes(query) ||
        shop.category.toLowerCase().includes(query)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shops & Restaurants
          </h1>
          <p className="mt-2 text-gray-600">
            Explore retail, dining, and duty-free options at Lanseria Airport
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="space-y-6">
            <Input
              placeholder="Search shops and restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto"
            />

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="retail">Retail</TabsTrigger>
                <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
                <TabsTrigger value="duty free">Duty Free</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters({ ...filters, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Multi-Brand">Multi-Brand</SelectItem>
                  <SelectItem value="Local Cuisine">Local Cuisine</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="€">€ Budget</SelectItem>
                  <SelectItem value="€€">€€ Moderate</SelectItem>
                  <SelectItem value="€€€">€€€ Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  className="object-cover w-full h-48"
                  width={640}
                  height={360}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                    <p className="text-sm text-gray-500">{shop.type}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{shop.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{shop.description}</p>

                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Location:</span> {shop.location}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Hours:</span> {shop.openingHours}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Price Range:</span> {shop.priceRange}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {shop.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {shop.type === "Restaurant" && (
                  <Button className="w-full" asChild>
                    <a href={`/comercio/reserva?shop=${shop.id}`}>
                      Reserve Table
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
