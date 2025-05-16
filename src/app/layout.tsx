"use client"

import { usePathname } from "next/navigation"
import { Inter } from "next/font/google"
import "./globals.css"
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

const navItems = [
  { href: "/", label: "Home", imgSrc: "/home.png" },
  { href: "/estacionamento", label: "Parking", imgSrc: "/parking.png" },
  { href: "/voos", label: "Flights", imgSrc: "/flights.png" },
  { href: "/passagens", label: "Tickets", imgSrc: "/tickets.png" },
  { href: "/explore", label: "Explore", imgSrc: "/globe.svg" },
]

const userItems = [
  { href: "/usuario", label: "Profile", imgSrc: "/profile.png" },
  { href: "/suporte", label: "Support", imgSrc: "/support.png" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function linkClass(href: string) {
    const baseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    const inactiveClass = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    const activeClass = "border-indigo-500 text-gray-900"
    return pathname === href ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`
  }

  function mobileLinkClass(href: string) {
    const baseClass = "flex flex-col items-center justify-center text-xs font-medium"
    const inactiveClass = "text-gray-500 hover:text-gray-700"
    const activeClass = "text-indigo-600"
    return pathname === href ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`
  }

  // Filter userItems for mobile nav to exclude Support
  const mobileUserItems = userItems.filter(item => item.label !== "Support")

  return (
    <html lang="en">
      <body className={inter.className}>
        {mounted ? (
          <div className="min-h-screen bg-white flex flex-col">
            <nav className="border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold">Lanseria Airport</span>
                  </div>
                  <div className="hidden sm:flex sm:space-x-8">
                    {navItems.map(({ href, label }) => (
                      <a key={href} href={href} className={linkClass(href)}>
                        {label}
                      </a>
                    ))}
                  </div>
                  <div className="hidden sm:flex sm:items-center sm:space-x-4">
                    {userItems.map(({ href, label }) => (
                      <a key={href} href={href} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile navigation bar */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
                <div className="max-w-7xl mx-auto px-4 flex justify-between">
                  {navItems.concat(mobileUserItems).map(({ href, label, imgSrc }) => (
                    <a key={href} href={href} className={mobileLinkClass(href)}>
                      <img src={imgSrc} alt={label} className="w-6 h-6 mb-1" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
            <main className="flex-grow">{children}</main>
          </div>
        ) : (
          <div className="min-h-screen bg-white flex flex-col">
            {/* Empty state while mounting */}
          </div>
        )}
      </body>
    </html>
  )
}
