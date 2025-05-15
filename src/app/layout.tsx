"use client"

import { usePathname } from "next/navigation"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  function linkClass(href: string) {
    const baseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    const inactiveClass = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    const activeClass = "border-indigo-500 text-gray-900"
    return pathname === href ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold">Lanseria Airport</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a href="/" className={linkClass("/")}>
                      Home
                    </a>
                    <a href="/estacionamento" className={linkClass("/estacionamento")}>
                      Parking
                    </a>
                    <a href="/voos" className={linkClass("/voos")}>
                      Flights
                    </a>
                    <a href="/passagens" className={linkClass("/passagens")}>
                      Tickets
                    </a>
                    <a href="/alojamentos" className={linkClass("/alojamentos")}>
                      Hotels
                    </a>
                    <a href="/transfers" className={linkClass("/transfers")}>
                      Transfers
                    </a>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <a href="/usuario" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Profile
                  </a>
                  <a href="/suporte" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Support
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
