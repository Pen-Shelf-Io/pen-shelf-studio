import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.NODE_ENV === "production") {
    if (process.env.URL) return process.env.URL; // Netlify main URL
    if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL; // Netlify deploy URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Vercel
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}
