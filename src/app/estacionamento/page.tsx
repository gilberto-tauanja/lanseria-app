"use client"

import React, { useState } from "react"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

interface ParkingZone {
  id: string
  name: string
  type: string
  totalSpots: number
  availableSpots: number
  pricePerHour: number
}

const initialZones: ParkingZone[] = [
  {
    id: "1",
    name: "Zone A",
    type: "VIP",
    totalSpots: 50,
    availableSpots: 25,
    pricePerHour: 30
  },
  {
    id: "2",
    name: "Zone B",
    type: "Accessible",
    totalSpots: 30,
    availableSpots: 15,
    pricePerHour: 20
  },
  {
    id: "3",
    name: "Zone C",
    type: "Long Term",
    totalSpots: 100,
    availableSpots: 45,
    pricePerHour: 15
  },
  {
    id: "4",
    name: "Zone D",
    type: "Short Term",
    totalSpots: 80,
    availableSpots: 30,
    pricePerHour: 25
  }
]

export default function ParkingPage() {
  const [zones] = useState<ParkingZone[]>(initialZones)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Parking Management
          </h1>
          <p className="mt-3 max-w-md mx-auto text-gray-500">
            View real-time parking availability and make reservations
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {zones.map((zone) => (
              <Card key={zone.id} className="p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {zone.name} - {zone.type}
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-500">
                        Available: {zone.availableSpots} / {zone.totalSpots} spots
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: R{zone.pricePerHour}/hour
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex-grow flex items-end">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <a href={`/estacionamento/reserva?zone=${zone.id}`}>
                        Reserve Spot
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Parking Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Zone Types
                </h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>VIP: Premium spots closest to terminals</li>
                  <li>Accessible: Reserved for disabled parking</li>
                  <li>Long Term: Economical option for extended stays</li>
                  <li>Short Term: Convenient for quick pick-ups and drop-offs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How to Park
                </h3>
                <ol className="space-y-2 text-sm text-gray-500 list-decimal list-inside">
                  <li>Select your preferred parking zone</li>
                  <li>Click "Reserve Spot" to proceed</li>
                  <li>Enter your vehicle details and duration</li>
                  <li>Complete payment to confirm your spot</li>
                  <li>Use the confirmation QR code at entry</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
