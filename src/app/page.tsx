import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Lanseria Airport
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your complete airport management solution
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Smart Parking</h3>
              <p className="mt-2 text-sm text-gray-500">
                Real-time parking availability and reservations
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/estacionamento">View Parking</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Flight Tracking</h3>
              <p className="mt-2 text-sm text-gray-500">
                Live updates on arrivals and departures
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/voos">Track Flights</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Book Hotels</h3>
              <p className="mt-2 text-sm text-gray-500">
                Find and book nearby accommodations
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/alojamentos">Browse Hotels</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Airport Transfers</h3>
              <p className="mt-2 text-sm text-gray-500">
                Book shuttles and private transfers
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/transfers">Book Transfer</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Tourism Packages</h3>
              <p className="mt-2 text-sm text-gray-500">
                Explore local tours and experiences
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/pacotes">View Packages</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Shopping & Dining</h3>
              <p className="mt-2 text-sm text-gray-500">
                Explore airport shops and restaurants
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/comercio">View Shops</a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
