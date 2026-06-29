'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

interface ClientDetailsFormProps {
  type: 'flight' | 'hotel';
  itemId: string;
}

const flightSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  passport: z.string().optional(),
  dob: z.string().min(1, 'Date of birth is required.'),
});

const hotelSchema = z.object({
  primaryGuestName: z.string().min(2, 'Guest name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  stayDuration: z.string().min(1, 'Please enter number of nights.').refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Must be a valid number greater than 0',
  }),
  specialRequests: z.string().optional(),
});

export default function ClientDetailsForm({ type, itemId }: ClientDetailsFormProps) {
  const router = useRouter();

  const isFlight = type === 'flight';
  const schema = isFlight ? flightSchema : hotelSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: isFlight
      ? { fullName: '', email: '', phone: '', passport: '', dob: '' }
      : { primaryGuestName: '', email: '', phone: '', stayDuration: '1', specialRequests: '' },
  });

  const onSubmit = (values: any) => {
    // Navigate to checkout, passing type and id.
    // For hotels, pass the stayDuration so the API can multiply the price.
    let checkoutUrl = `/travel/checkout?type=${type}&id=${itemId}`;
    
    if (type === 'hotel' && values.stayDuration) {
      checkoutUrl += `&duration=${values.stayDuration}`;
    }
    
    router.push(checkoutUrl);
  };

  return (
    <div className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border">
      <h2 className="text-2xl font-headline font-bold mb-6">
        {isFlight ? 'Passenger Details' : 'Guest Details'}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name={isFlight ? "fullName" : "primaryGuestName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isFlight ? "Full Name" : "Primary Guest Name"} *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isFlight ? (
              <>
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="A12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="stayDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stay Duration (Nights) *</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          {!isFlight && (
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Early check-in, dietary requirements..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="pt-4 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto btn-animated">
              Proceed to Payment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
