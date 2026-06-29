import { Flight } from '../types';
import { MOCK_FLIGHTS } from './mockTravelData';

export async function searchFlights(origin: string, destination: string, date: string): Promise<Flight[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!origin || !destination) {
    return MOCK_FLIGHTS;
  }

  // Generate 3-4 options dynamically using the MOCK_FLIGHTS airlines and IDs
  // so the checkout API can still find the price by ID.
  const numResults = Math.floor(Math.random() * 3) + 2; // 2 to 4 results
  const shuffledFlights = [...MOCK_FLIGHTS].sort(() => 0.5 - Math.random());
  const selectedFlights = shuffledFlights.slice(0, numResults);

  const results = selectedFlights.map((flight, index) => {
    // Generate some dynamic departure/arrival times based on the requested date
    const baseDate = date ? new Date(date) : new Date();
    const depTime = new Date(baseDate);
    depTime.setHours(8 + index * 4, 0, 0); // Stagger departure times
    
    const arrTime = new Date(depTime);
    arrTime.setHours(depTime.getHours() + 3 + index, 30, 0); // 3-6 hour flights

    return {
      ...flight,
      departureCity: origin,
      arrivalCity: destination,
      departureTime: depTime.toISOString(),
      arrivalTime: arrTime.toISOString(),
      duration: `${3 + index}h 30m`,
    };
  });

  return results;
}

export async function getFlightById(id: string): Promise<Flight | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_FLIGHTS.find((f) => f.id === id) || null;
}

export async function saveFlightBookingToFirebase(flightId: string, userId: string, details: any): Promise<void> {
  // Simulate network delay for Firebase
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`[Firebase Mock] Saved flight booking for user ${userId}, flight ${flightId}`, details);
}
