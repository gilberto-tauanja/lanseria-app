import * as React from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Hotels</h2>
          <p className="mb-4">Find and book nearby accommodations.</p>
          <Button asChild>
            <a href="/alojamentos">Browse Hotels</a>
          </Button>
        </Card>
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Transfers</h2>
          <p className="mb-4">Book shuttles and private transfers.</p>
          <Button asChild>
            <a href="/transfers">Book Transfer</a>
          </Button>
        </Card>
      </div>
    </div>
  )
}
