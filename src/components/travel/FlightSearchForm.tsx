'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plane, Calendar as CalendarIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const flightSearchSchema = z.object({
  origin: z.string().min(2, 'Please enter a valid origin city.'),
  destination: z.string().min(2, 'Please enter a valid destination city.'),
  date: z.string().min(1, 'Please select a date.'),
  passengers: z.string().min(1, 'Please enter number of passengers.'),
});

interface FlightSearchFormProps {
  onSearch: (values: z.infer<typeof flightSearchSchema>) => void;
  isLoading?: boolean;
}

export function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
  const form = useForm<z.infer<typeof flightSearchSchema>>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      origin: '',
      destination: '',
      date: '',
      passengers: '1',
    },
  });

  function onSubmit(values: z.infer<typeof flightSearchSchema>) {
    onSearch(values);
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Origin (e.g. New York)" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transform rotate-90" />
                    <Input placeholder="Destination (e.g. London)" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
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
            name="passengers"
            render={({ field }) => (
              <FormItem className="w-full md:w-32">
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="number" min="1" max="9" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? 'Searching...' : 'Search Flights'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
