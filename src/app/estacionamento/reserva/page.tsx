"use client"

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const parkingZones = {
  "1": { name: "Zone A", type: "VIP", pricePerHour: 30 },
  "2": { name: "Zone B", type: "Accessible", pricePerHour: 20 },
  "3": { name: "Zone C", type: "Long Term", pricePerHour: 15 },
  "4": { name: "Zone D", type: "Short Term", pricePerHour: 25 }
};

// Lanseria Airport coordinates
const lanseriaCoords = { lat: -26.133, lng: 27.938 };

// Simulated parking spots with coordinates
const parkingSpots = [
  { id: "1", zoneId: "1", lat: -26.133, lng: 27.938, occupied: false },
  { id: "2", zoneId: "2", lat: -26.134, lng: 27.939, occupied: false },
  { id: "3", zoneId: "3", lat: -26.135, lng: 27.940, occupied: false },
  { id: "4", zoneId: "4", lat: -26.136, lng: 27.941, occupied: false },
];

function ReservationContent() {
  const searchParams = useSearchParams();
  const zoneId = searchParams.get("zone") || "1";
  const zone = parkingZones[zoneId as keyof typeof parkingZones];

  const [formData, setFormData] = useState({
    licensePlate: "",
    duration: "1",
    paymentMethod: "credit"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [nearestSpot, setNearestSpot] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);
  const [testMode, setTestMode] = useState(false);

  // Function to calculate distance between two coordinates (Haversine formula)
  const getDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const handleLocationUpdate = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    // Check if user is within 0.5 km of Lanseria Airport
    const distance = getDistance(latitude, longitude, lanseriaCoords.lat, lanseriaCoords.lng);
    if (distance <= 0.5) {
      // Find nearest available spot
      const availableSpots = parkingSpots.filter((spot) => !spot.occupied);
      if (availableSpots.length > 0) {
        // Find spot with minimum distance to user
        let nearest = availableSpots[0];
        let minDist = getDistance(latitude, longitude, nearest.lat, nearest.lng);
        for (const spot of availableSpots) {
          const dist = getDistance(latitude, longitude, spot.lat, spot.lng);
          if (dist < minDist) {
            nearest = spot;
            minDist = dist;
          }
        }
        setNearestSpot(nearest.id);
        setAlertVisible(true);
      }
    } else {
      setAlertVisible(false);
      setNearestSpot(null);
    }
  }, [getDistance]);

  useEffect(() => {
    if (testMode) {
      // In test mode, simulate user near Lanseria Airport
      setNearestSpot("1");
      setAlertVisible(true);
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    if (!locationPermissionRequested) {
      setLocationPermissionRequested(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          // Permission granted, start watching position
          const watchId = navigator.geolocation.watchPosition(
            handleLocationUpdate,
            () => {
              setError("Failed to get your location.");
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
          );
          return () => navigator.geolocation.clearWatch(watchId);
        },
        () => {
          setError("Location permission denied or unavailable.");
        }
      );
    }
  }, [locationPermissionRequested, testMode, handleLocationUpdate]);

  const handleConfirmParking = () => {
    if (nearestSpot) {
      // Mark spot as occupied (in real app, update backend)
      const spotIndex = parkingSpots.findIndex((spot) => spot.id === nearestSpot);
      if (spotIndex !== -1) {
        parkingSpots[spotIndex].occupied = true;
      }
      setAlertVisible(false);
      alert("Parking spot confirmed and marked as occupied.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch {
      setError("Failed to process reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    // Find the parking spot coordinates for the reserved zone
    const reservedSpot = parkingSpots.find(spot => spot.zoneId === zoneId);

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

              {reservedSpot && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Directions to your parking spot</h3>
                  <iframe
                    title="Parking Directions"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyClTA6IxfZUHeK29KH75ZGNYIZwTCLlzfU&origin=${lanseriaCoords.lat},${lanseriaCoords.lng}&destination=${reservedSpot.lat},${reservedSpot.lng}&mode=driving`}
                    allowFullScreen
                  />
                </div>
              )}

              <Button asChild>
                <a href="/estacionamento">Return to Parking Overview</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reserve Parking Spot</h1>
          <p className="mt-2 text-gray-600">
            Complete your reservation for {zone.name} ({zone.type})
          </p>
          <Button
            variant="secondary"
            onClick={() => setTestMode(!testMode)}
            className="mb-6"
          >
            {testMode ? "Disable" : "Enable"} Test Mode (Simulate Location)
          </Button>
        </div>

        {alertVisible && nearestSpot && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Alert!</strong>
            <span className="block sm:inline"> Nearest available parking spot: {nearestSpot}</span>
            <button
              onClick={handleConfirmParking}
              className="ml-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
            >
              Confirm Parking
            </button>
          </div>
        )}

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
              <div className="space-y-1 text-gray-600">
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
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading reservation details...</div>}>
      <ReservationContent />
    </Suspense>
  );
}