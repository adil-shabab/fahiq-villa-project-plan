export type PropertyType = "Apartment Building" | "Independent House" | "PG / Hostel" | "Commercial";

export interface UnitSummary {
  id: string;
  code: string;
  floor: string;
  type: string;
  rent: number;
  status: "Available" | "Occupied" | "Notice" | "Under Maintenance" | "Booked";
  tenantName?: string;
}

export interface NearbyPlace {
  label: string;
  category: string;
  distanceKm: number;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  locality: string;
  city: string;
  state: string;
  addressLine1: string;
  addressLine2?: string;
  description: string;
  /** Seeds for generated on-brand placeholder photos — see PropertyPhoto.tsx. */
  photoSeed: string;
  gallerySeeds: string[];
  amenities: string[];
  totalUnits: number;
  occupied: number;
  available: number;
  notice: number;
  maintenance: number;
  isListed: boolean;
  gateClosingTime: string;
  guestPolicy: string;
  nearby: NearbyPlace[];
  units: UnitSummary[];
}

export const properties: Property[] = [
  {
    id: "green-view",
    name: "Green View Residency",
    type: "Apartment Building",
    locality: "Koramangala",
    city: "Bengaluru",
    state: "Karnataka",
    addressLine1: "14th Cross, 5th Block",
    addressLine2: "Near Forum Mall",
    description:
      "A gated apartment community with 24 units across 4 floors, popular with young families and working professionals for its proximity to the metro and local market.",
    photoSeed: "green-view-cover",
    gallerySeeds: ["green-view-1", "green-view-2", "green-view-3", "green-view-4"],
    amenities: ["Lift", "Power Backup", "Gated Community", "Visitor Parking", "CCTV", "Security Guard", "Intercom", "Garden", "Children's Play Area"],
    totalUnits: 24,
    occupied: 19,
    available: 3,
    notice: 1,
    maintenance: 1,
    isListed: true,
    gateClosingTime: "11:00 PM",
    guestPolicy: "Guests allowed till 9 PM with prior notice to security",
    nearby: [
      { label: "MG Road Metro", category: "Metro", distanceKm: 1.2 },
      { label: "Forum Mall", category: "Market", distanceKm: 0.4 },
      { label: "St. John's Hospital", category: "Hospital", distanceKm: 2.1 },
    ],
    units: [
      { id: "gv-a101", code: "A-101", floor: "1st Floor", type: "2BHK", rent: 15000, status: "Occupied", tenantName: "Rahul Sharma" },
      { id: "gv-a102", code: "A-102", floor: "1st Floor", type: "1BHK", rent: 11000, status: "Occupied", tenantName: "Fatima Khan" },
      { id: "gv-a201", code: "A-201", floor: "2nd Floor", type: "2BHK", rent: 15500, status: "Available" },
      { id: "gv-a305", code: "A-305", floor: "3rd Floor", type: "1BHK", rent: 11500, status: "Occupied", tenantName: "Sneha Kulkarni" },
      { id: "gv-a308", code: "A-308", floor: "3rd Floor", type: "2BHK", rent: 15200, status: "Notice", tenantName: "Karan Mehta" },
      { id: "gv-a402", code: "A-402", floor: "4th Floor", type: "3BHK", rent: 19500, status: "Under Maintenance" },
    ],
  },
  {
    id: "sunrise-pg",
    name: "Sunrise PG for Women",
    type: "PG / Hostel",
    locality: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    addressLine1: "100 Feet Road",
    addressLine2: "Opp. Indiranagar Club",
    description:
      "A secure, women-only PG with 18 beds across single and double-sharing rooms. Includes meals, housekeeping and a dedicated warden on site 24/7.",
    photoSeed: "sunrise-cover",
    gallerySeeds: ["sunrise-1", "sunrise-2", "sunrise-3"],
    amenities: ["CCTV", "Security Guard", "Housekeeping", "Power Backup", "Intercom", "Common Lounge"],
    totalUnits: 18,
    occupied: 15,
    available: 2,
    notice: 1,
    maintenance: 0,
    isListed: true,
    gateClosingTime: "9:30 PM",
    guestPolicy: "No overnight guests; visitors allowed in common area till 7 PM",
    nearby: [
      { label: "Indiranagar Metro", category: "Metro", distanceKm: 0.6 },
      { label: "100 Feet Road Market", category: "Market", distanceKm: 0.2 },
      { label: "Manipal Hospital", category: "Hospital", distanceKm: 1.8 },
    ],
    units: [
      { id: "sr-d201", code: "D-201", floor: "2nd Floor", type: "PG Bed · Single", rent: 11500, status: "Occupied", tenantName: "Priyanka Das" },
      { id: "sr-d207", code: "D-207", floor: "2nd Floor", type: "PG Bed · Single", rent: 9800, status: "Occupied", tenantName: "Ayesha Siddiqui" },
      { id: "sr-d212", code: "D-212", floor: "2nd Floor", type: "PG Bed · Double", rent: 7600, status: "Available" },
      { id: "sr-d305", code: "D-305", floor: "3rd Floor", type: "PG Bed · Double", rent: 7600, status: "Notice", tenantName: "Lavanya Pillai" },
    ],
  },
  {
    id: "maple-court",
    name: "Maple Court Apartments",
    type: "Apartment Building",
    locality: "Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    addressLine1: "ITPL Main Road",
    description:
      "A family-friendly complex of 32 units with covered parking and a children's play area, close to the Whitefield tech corridor.",
    photoSeed: "maple-cover",
    gallerySeeds: ["maple-1", "maple-2", "maple-3", "maple-4"],
    amenities: ["Lift", "Power Backup", "Visitor Parking", "Fire Safety", "Gated Community", "Children's Play Area", "Swimming Pool", "Gym"],
    totalUnits: 32,
    occupied: 27,
    available: 4,
    notice: 0,
    maintenance: 1,
    isListed: true,
    gateClosingTime: "11:30 PM",
    guestPolicy: "Guests allowed anytime with security sign-in",
    nearby: [
      { label: "ITPL IT Park", category: "IT Park", distanceKm: 1.0 },
      { label: "Whitefield Metro", category: "Metro", distanceKm: 2.4 },
      { label: "Columbia Asia Hospital", category: "Hospital", distanceKm: 3.0 },
    ],
    units: [
      { id: "mc-b112", code: "B-112", floor: "1st Floor", type: "3BHK", rent: 22500, status: "Occupied", tenantName: "Mohammed Irfan" },
      { id: "mc-b204", code: "B-204", floor: "2nd Floor", type: "2BHK", rent: 16200, status: "Occupied", tenantName: "Ananya Rao" },
      { id: "mc-b210", code: "B-210", floor: "2nd Floor", type: "2BHK", rent: 16500, status: "Available" },
      { id: "mc-b305", code: "B-305", floor: "3rd Floor", type: "3BHK", rent: 23000, status: "Under Maintenance" },
    ],
  },
  {
    id: "silver-oak",
    name: "Silver Oak Hostel",
    type: "PG / Hostel",
    locality: "BTM Layout",
    city: "Bengaluru",
    state: "Karnataka",
    addressLine1: "2nd Stage, BTM Layout",
    description:
      "Budget-friendly hostel popular with students, offering single, double and triple-sharing beds with mess and Wi-Fi included.",
    photoSeed: "silveroak-cover",
    gallerySeeds: ["silveroak-1", "silveroak-2", "silveroak-3"],
    amenities: ["CCTV", "Housekeeping", "Power Backup", "Common Lounge", "Terrace Access"],
    totalUnits: 21,
    occupied: 18,
    available: 2,
    notice: 0,
    maintenance: 1,
    isListed: true,
    gateClosingTime: "10:00 PM",
    guestPolicy: "Guests allowed in common areas till 8 PM only",
    nearby: [
      { label: "BTM Engineering College", category: "College", distanceKm: 0.5 },
      { label: "BTM Bus Stop", category: "Bus Stop", distanceKm: 0.1 },
      { label: "Fortis Hospital", category: "Hospital", distanceKm: 2.6 },
    ],
    units: [
      { id: "so-c118", code: "C-118", floor: "1st Floor", type: "PG Bed · Triple", rent: 7200, status: "Occupied", tenantName: "Arjun Nair" },
      { id: "so-c204", code: "C-204", floor: "2nd Floor", type: "PG Bed · Single", rent: 8900, status: "Available" },
      { id: "so-c301", code: "C-301", floor: "3rd Floor", type: "1RK", rent: 8900, status: "Under Maintenance" },
    ],
  },
  {
    id: "lake-breeze",
    name: "Lake Breeze Flats",
    type: "Independent House",
    locality: "Hebbal",
    city: "Bengaluru",
    state: "Karnataka",
    addressLine1: "Hebbal Lake Road",
    description: "A small independent building of 16 studio and 1BHK units, several with a lake-facing balcony.",
    photoSeed: "lakebreeze-cover",
    gallerySeeds: ["lakebreeze-1", "lakebreeze-2"],
    amenities: ["Power Backup", "Visitor Parking", "Terrace Access"],
    totalUnits: 16,
    occupied: 11,
    available: 4,
    notice: 1,
    maintenance: 0,
    isListed: false,
    gateClosingTime: "No restriction",
    guestPolicy: "No formal policy — independent building",
    nearby: [
      { label: "Hebbal Lake", category: "Landmark", distanceKm: 0.1 },
      { label: "Hebbal Flyover Bus Stop", category: "Bus Stop", distanceKm: 0.3 },
    ],
    units: [
      { id: "lb-e110", code: "E-110", floor: "1st Floor", type: "Studio", rent: 12800, status: "Occupied", tenantName: "Divya Menon" },
      { id: "lb-e205", code: "E-205", floor: "2nd Floor", type: "1BHK", rent: 13900, status: "Available" },
      { id: "lb-e208", code: "E-208", floor: "2nd Floor", type: "1BHK", rent: 13900, status: "Notice", tenantName: "Vikram Shah" },
    ],
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}
