"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const parkingZones = {
  "1": { name: "Zone A", type: "VIP", pricePerHour: 30 },
  "2": { name: "Zone B", type: "Accessible", pricePerHour: 20 },
  "3": { name: "Zone C", type: "Long Term", pricePerHour: 15 },
  "4": { name: "Zone D", type: "Short Term", pricePerHour: 25 }
}

export default function ReservationPage() {
  const searchParams = useSearchParams()
  const zoneId = searchParams.get("zone") || "1"
  const zone = parkingZones[zoneId as keyof typeof parkingZones]

  const [formData, setFormData] = useState({
    licensePlate: "",
    duration: "1",
    paymentMethod: "credit"
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError("Failed to process reservation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Reservation Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your parking spot has been successfully reserved.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Reservation Details</h3>
                <p className="text-sm text-gray-600">Zone: {zone.name} ({zone.type})</p>
                <p className="text-sm text-gray-600">License Plate: {formData.licensePlate}</p>
                <p className="text-sm text-gray-600">Duration: {formData.duration} hour(s)</p>
                <p className="text-sm text-gray-600">Total: R${zone.pricePerHour * parseInt(formData.duration)}</p>
              </div>
              <Button asChild>
                <a href="/estacionamento">Return to Parking Overview</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reserve Parking Spot</h1>
          <p className="mt-2 text-gray-600">
            Complete your reservation for {zone.name} ({zone.type})
          </p>
        </div>

        <Card className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">{error}</Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                placeholder="Enter your license plate"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (hours)</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 12, 24].map((hours) => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} hour{hours > 1 ? "s" : ""} - R${zone.pricePerHour * hours}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payment">Payment Method</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="apple">Apple Pay</SelectItem>
                  <SelectItem value="google">Google Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Summary</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Zone: {zone.name} ({zone.type})</p>
                <p>Price per hour: R${zone.pricePerHour}</p>
                <p>Duration: {formData.duration} hour(s)</p>
                <p className="font-medium text-gray-900 mt-2">
                  Total: R${zone.pricePerHour * parseInt(formData.duration)}
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Reservation"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
