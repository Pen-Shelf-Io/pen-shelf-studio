import { Hotel } from '../types';
import { MOCK_HOTELS } from './mockTravelData';

export async function searchHotels(location: string, checkInDate: string, checkOutDate: string): Promise<Hotel[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // For mock purposes, filter by location if provided
  return MOCK_HOTELS.filter(hotel => 
    (location ? hotel.location.toLowerCase().includes(location.toLowerCase()) : true)
  );
}

export async function getHotelById(id: string): Promise<Hotel | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_HOTELS.find((h) => h.id === id) || null;
}

export async function saveHotelReservationToFirebase(hotelId: string, userId: string, details: any): Promise<void> {
  // Simulate network delay for Firebase
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`[Firebase Mock] Saved hotel reservation for user ${userId}, hotel ${hotelId}`, details);
}
