"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: string
}

const mockFAQs = [
  {
    question: "How early should I arrive at the airport?",
    answer: "For domestic flights, arrive 2 hours before departure. For international flights, arrive 3 hours before departure to allow time for check-in and security procedures."
  },
  {
    question: "What parking options are available?",
    answer: "We offer several parking options including short-term, long-term, VIP, and accessible parking. You can pre-book your parking space through our app for guaranteed availability."
  },
  {
    question: "How do I contact Lost & Found?",
    answer: "Lost & Found is located in Terminal A, Ground Floor. You can also report lost items through our app or call +27 123 456 789. Office hours are 07:00-21:00 daily."
  },
  {
    question: "What are the airport's operating hours?",
    answer: "The airport is open 24/7. However, specific shop and service hours may vary. Check individual listings in our app for current operating hours."
  },
  {
    question: "How do I book airport transfers?",
    answer: "You can book transfers through our app, choosing from shuttle services, private cars, or minibuses. Pre-booking is recommended to ensure availability."
  }
]

export default function SupportPage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: messageInput,
      timestamp: new Date().toISOString()
    }

    // Simulate bot response
    const botResponses = [
      "I'll help you with that right away.",
      "Let me check that information for you.",
      "Thank you for your question. Here's what I found.",
      "I understand your concern. Here's what you can do."
    ]
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: botResponses[Math.floor(Math.random() * botResponses.length)],
      timestamp: new Date().toISOString()
    }

    setChatMessages([...chatMessages, userMessage, botMessage])
    setMessageInput("")
  }

  const filteredFAQs = mockFAQs.filter(faq =>
    searchQuery
      ? faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Support Center
          </h1>
          <p className="mt-2 text-gray-600">
            Get help and find answers to your questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Section */}
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Chat Support</h2>
              <div className="h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-red-900">Emergency Contact</h2>
                  <p className="text-sm text-red-700 mt-1">24/7 Emergency Support</p>
                </div>
                <Button variant="destructive">
                  Call Emergency
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Emergency Hotline:</span> +27 911
                </p>
                <p className="text-sm text-red-700">
                  <span className="font-medium">Airport Security:</span> +27 123 456 789
                </p>
                <p className="text-sm text-red-700">
                  <span className="font-medium">Medical Services:</span> +27 987 654 321
                </p>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Additional Help Links */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/suporte/guia">Airport Guide</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/suporte/bagagem">Baggage Information</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/suporte/acessibilidade">Accessibility Services</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/suporte/contato">Contact Directory</a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
