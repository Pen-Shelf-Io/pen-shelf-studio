'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Calendar as CalendarIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const hotelSearchSchema = z.object({
  location: z.string().min(2, 'Please enter a destination.'),
  checkIn: z.string().min(1, 'Please select a check-in date.'),
  checkOut: z.string().min(1, 'Please select a check-out date.'),
  guests: z.string().min(1, 'Please enter number of guests.'),
});

interface HotelSearchFormProps {
  onSearch: (values: z.infer<typeof hotelSearchSchema>) => void;
  isLoading?: boolean;
}

export function HotelSearchForm({ onSearch, isLoading }: HotelSearchFormProps) {
  const form = useForm<z.infer<typeof hotelSearchSchema>>({
    resolver: zodResolver(hotelSearchSchema),
    defaultValues: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: '2',
    },
  });

  function onSubmit(values: z.infer<typeof hotelSearchSchema>) {
    onSearch(values);
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Where are you going?" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="date" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="date" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem className="w-full md:w-32">
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="number" min="1" max="10" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? 'Searching...' : 'Search Hotels'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
