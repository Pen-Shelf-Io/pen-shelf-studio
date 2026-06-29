import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendTelegramNotification } from '@/lib/services/notificationService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    // Verify the webhook signature if the secret is set
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    } else {
      // For local testing without a webhook secret configured yet, just parse the body
      // NOTE: DO NOT DO THIS IN PRODUCTION!
      event = JSON.parse(body);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      const amount = (paymentIntent.amount / 100).toFixed(2);
      const currency = paymentIntent.currency.toUpperCase();
      
      const message = `🎉 <b>New Booking Received!</b>\n\n💰 <b>Amount:</b> ${amount} ${currency}\n🔖 <b>Payment ID:</b> ${paymentIntent.id}\n✅ <b>Status:</b> Success!`;
      
      await sendTelegramNotification(message);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`Webhook error: ${err.message}`);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
