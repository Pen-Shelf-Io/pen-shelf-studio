import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MOCK_FLIGHTS, MOCK_HOTELS } from '@/lib/services/mockTravelData';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, id } = body;

    let price = 0;

    if (type === 'flight') {
      const flight = MOCK_FLIGHTS.find(f => f.id === id);
      if (!flight) return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
      price = flight.price;
    } else if (type === 'hotel') {
      const hotel = MOCK_HOTELS.find(h => h.id === id);
      if (!hotel) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
      const duration = body.duration ? parseInt(body.duration, 10) : 1;
      price = hotel.pricePerNight * duration;
    } else {
      return NextResponse.json({ error: 'Invalid travel type' }, { status: 400 });
    }

    const amountInCents = Math.round(price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      price: price,
      itemName: type === 'flight' ? 'Flight Ticket' : 'Hotel Reservation'
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
