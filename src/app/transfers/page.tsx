'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const services = ['Airport Pickup', 'Hotel Transfer', 'City Tour'];
const destinations = ['Maputo', 'Matola', 'Catembe', 'custom']; // Use "custom" instead of empty string

export default function TransfersPage() {
  const [selectedService, setSelectedService] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [bookingDetails, setBookingDetails] = useState({
    destination: '',
    date: undefined,
    time: '',
    passengers: 1,
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Book Your Transfer</h1>

      {/* Select Service */}
      <div>
        <label className="block mb-2 font-medium">Select Service</label>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Destination */}
      <div>
        <label className="block mb-2 font-medium">Select Destination</label>
        <Select
          value={bookingDetails.destination}
          onValueChange={(value) =>
            setBookingDetails({ ...bookingDetails, destination: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((destination) => (
              <SelectItem key={destination} value={destination}>
                {destination === 'custom' ? 'Custom Destination' : destination}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {bookingDetails.destination === 'custom' && (
          <Input
            placeholder="Enter custom destination"
            value={customDestination}
            onChange={(e) => setCustomDestination(e.target.value)}
            className="mt-2"
          />
        )}
      </div>

      {/* Select Date */}
      <div>
        <label className="block mb-2 font-medium">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !bookingDetails.date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {bookingDetails.date ? format(bookingDetails.date, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={bookingDetails.date}
              onSelect={(date) =>
                setBookingDetails({ ...bookingDetails, date })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Select Time */}
      <div>
        <label className="block mb-2 font-medium">Select Time</label>
        <Input
          type="time"
          value={bookingDetails.time}
          onChange={(e) =>
            setBookingDetails({ ...bookingDetails, time: e.target.value })
          }
        />
      </div>

      {/* Select Passengers */}
      <div>
        <label className="block mb-2 font-medium">Number of Passengers</label>
        <Input
          type="number"
          min="1"
          value={bookingDetails.passengers}
          onChange={(e) =>
            setBookingDetails({
              ...bookingDetails,
              passengers: parseInt(e.target.value, 10),
            })
          }
        />
      </div>

      {/* Continue Button */}
      <a
        href={`/transfers/checkout?service=${selectedService}&destination=${
          bookingDetails.destination === 'custom'
            ? encodeURIComponent(customDestination)
            : bookingDetails.destination
        }&date=${bookingDetails.date ? format(bookingDetails.date, 'yyyy-MM-dd') : ''}&time=${
          bookingDetails.time
        }&passengers=${bookingDetails.passengers}`}
      >
        <Button className="w-full mt-4">Continue to Booking</Button>
      </a>
    </div>
  );
}
