
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import * as React from "react"

const previousCards = [
  {
    title: "Smart Parking",
    description: "Real-time parking availability and reservations",
    href: "/estacionamento",
    imgSrc: "/1736.jpg",
  },
  {
    title: "Flight Tracking",
    description: "Live updates on arrivals and departures",
    href: "/voos",
    imgSrc: "/track.jpeg",
  },
  {
    title: "Book Hotels",
    description: "Find and book nearby accommodations",
    href: "/alojamentos",
    imgSrc: "/hotels.png",
  },
  {
    title: "Airport Transfers",
    description: "Book shuttles and private transfers",
    href: "/transfers",
    imgSrc: "/transfers.png",
  },
  {
    title: "Tourism Packages",
    description: "Explore local tours and experiences",
    href: "/pacotes",
    imgSrc: "/tourism.jpg",
  },
  {
    title: "Shopping & Dining",
    description: "Explore airport shops and restaurants",
    href: "/comercio",
    imgSrc: "/shopping.jpeg",
  },
]

export default function Home() {
  const isLoggedIn = true // Simulate user login state

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Flight Search / Check-In Module */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Flight Search & Check-In</h2>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Flight Number or Destination"
              className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Search / Check-In
            </Button>
          </form>
        </section>

        {/* Upcoming Flights & Boarding Pass Access */}
        {isLoggedIn && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Flights & Boarding Pass</h2>
            <Card className="p-6">
              <p className="text-gray-700">You have 2 upcoming flights:</p>
              <ul className="mt-4 space-y-3">
                <li className="flex justify-between">
                  <span>Flight LAN123 to New York</span>
                  <Button variant="outline" size="sm">View Boarding Pass</Button>
                </li>
                <li className="flex justify-between">
                  <span>Flight LAN456 to London</span>
                  <Button variant="outline" size="sm">View Boarding Pass</Button>
                </li>
              </ul>
            </Card>
          </section>
        )}

        {/* Live Flight Status / Airport Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Live Flight Status & Airport Info</h2>
          <Card className="p-6">
            <p className="text-gray-700 mb-2">Gates, delays, terminal map, parking info</p>
            {/* Placeholder for real-time data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Gate Info</h3>
                <p>Gate A12, Boarding at 14:30</p>
              </div>
              <div>
                <h3 className="font-medium">Delays</h3>
                <p>Flight LAN789 delayed by 30 minutes</p>
              </div>
              <div>
                <h3 className="font-medium">Terminal Map</h3>
                <Button variant="outline" size="sm">View Map</Button>
              </div>
              <div>
                <h3 className="font-medium">Parking</h3>
                <Button variant="outline" size="sm">View Parking</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Scrollable Promotional Area */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Promotions</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[
              { title: "Lounge Access", description: "Exclusive airport lounge deals" },
              { title: "Duty-Free Deals", description: "Save on shopping" },
              { title: "Airline Upgrades", description: "Upgrade your flight experience" },
              { title: "Food & Drink", description: "Special offers at airport restaurants" },
              { title: "Travel Insurance", description: "Protect your trip" },
              { title: "Hotel Offers", description: "Discounts on nearby hotels" },
            ].map((promo, idx) => (
              <Card key={idx} className="min-w-[250px] flex-shrink-0 p-4">
                <h3 className="font-semibold">{promo.title}</h3>
                <p className="text-sm text-gray-600">{promo.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Access Tiles */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "Terminal Map", link: "/terminal-map" },
              { title: "Transport", link: "/transfers" },
              { title: "Language Settings", link: "/settings/language" },
              { title: "Customer Support", link: "/suporte" },
            ].map((tile, idx) => (
              <Card key={idx} className="p-6 text-center cursor-pointer hover:shadow-md transition-shadow">
                <a href={tile.link} className="block text-lg font-medium text-primary hover:underline">
                  {tile.title}
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Previous Cards Carousel */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Explore More Services</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {previousCards.map((card, idx) => (
              <Card key={idx} className="min-w-[180px] flex-shrink-0 p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
                <a href={card.href} className="block">
                  <img src={card.imgSrc} alt={card.title} className="mx-auto mb-2 h-18 w-50 object-contain" />
                  <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </a>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
