import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/services/notificationService';

export async function POST(req: Request) {
  try {
    const { amount, itemName, id } = await req.json();
    
    const message = `🎉 <b>New Booking Received!</b>\n\n🛍️ <b>Item:</b> ${itemName}\n💰 <b>Amount:</b> $${amount.toFixed(2)}\n🔖 <b>Payment ID:</b> ${id || 'N/A'}\n✅ <b>Status:</b> Success! (Frontend Trigger)`;
    
    await sendTelegramNotification(message);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending manual notification:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
