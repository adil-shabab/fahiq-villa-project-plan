export type UnitType = "1RK" | "Studio" | "1BHK" | "2BHK" | "3BHK" | "PG Bed" | "Commercial";

export interface ListingRow {
  id: string;
  unitCode: string;
  propertyId: string;
  propertyName: string;
  type: UnitType;
  rent: number;
  listed: boolean;
  views: number;
  enquiries: number;
  listingTitle: string;
  listingDescription: string;
  slug: string;
  coverColor: string; // placeholder swatch standing in for a real photo
}

export const listings: ListingRow[] = [
  {
    id: "u1",
    unitCode: "A-101",
    propertyId: "green-view",
    propertyName: "Green View Residency",
    type: "2BHK",
    rent: 15000,
    listed: true,
    views: 412,
    enquiries: 9,
    listingTitle: "Spacious 2BHK near MG Road Metro",
    listingDescription:
      "A bright, well-ventilated 2BHK on the first floor with a dedicated parking spot, modular kitchen and power backup. Walking distance to the metro and local market.",
    slug: "green-view-a-101-2bhk-koramangala",
    coverColor: "#cfe3da",
  },
  {
    id: "u2",
    unitCode: "A-305",
    propertyId: "green-view",
    propertyName: "Green View Residency",
    type: "1BHK",
    rent: 11500,
    listed: true,
    views: 268,
    enquiries: 5,
    listingTitle: "Cosy 1BHK with balcony, 3rd floor",
    listingDescription: "A compact, sunny 1BHK with a private balcony overlooking the garden courtyard.",
    slug: "green-view-a-305-1bhk-koramangala",
    coverColor: "#d8e7d0",
  },
  {
    id: "u3",
    unitCode: "D-207",
    propertyId: "sunrise-pg",
    propertyName: "Sunrise PG for Women",
    type: "PG Bed",
    rent: 9800,
    listed: true,
    views: 531,
    enquiries: 14,
    listingTitle: "Single-sharing PG bed for working women",
    listingDescription: "Fully furnished single-sharing room with food included, in a secure women-only PG with CCTV and a warden on site.",
    slug: "sunrise-pg-d-207-bed-indiranagar",
    coverColor: "#f3dfc0",
  },
  {
    id: "u4",
    unitCode: "D-212",
    propertyId: "sunrise-pg",
    propertyName: "Sunrise PG for Women",
    type: "PG Bed",
    rent: 7600,
    listed: false,
    views: 0,
    enquiries: 0,
    listingTitle: "Double-sharing PG bed, Indiranagar",
    listingDescription: "Double-sharing room, currently unlisted while under light maintenance.",
    slug: "sunrise-pg-d-212-bed-indiranagar",
    coverColor: "#f3dfc0",
  },
  {
    id: "u5",
    unitCode: "B-112",
    propertyId: "maple-court",
    propertyName: "Maple Court Apartments",
    type: "3BHK",
    rent: 22500,
    listed: true,
    views: 189,
    enquiries: 3,
    listingTitle: "Family-friendly 3BHK with covered parking",
    listingDescription: "A large 3BHK ideal for families, with two covered parking spots and a children's play area in the complex.",
    slug: "maple-court-b-112-3bhk-whitefield",
    coverColor: "#d6e4ef",
  },
  {
    id: "u6",
    unitCode: "B-204",
    propertyId: "maple-court",
    propertyName: "Maple Court Apartments",
    type: "2BHK",
    rent: 16200,
    listed: true,
    views: 302,
    enquiries: 7,
    listingTitle: "Modern 2BHK, Whitefield",
    listingDescription: "Recently renovated 2BHK with a modular kitchen and attached bathrooms.",
    slug: "maple-court-b-204-2bhk-whitefield",
    coverColor: "#d6e4ef",
  },
  {
    id: "u7",
    unitCode: "C-118",
    propertyId: "silver-oak",
    propertyName: "Silver Oak Hostel",
    type: "PG Bed",
    rent: 7200,
    listed: true,
    views: 445,
    enquiries: 11,
    listingTitle: "Triple-sharing bed for students, Silver Oak Hostel",
    listingDescription: "Budget-friendly triple-sharing bed close to the engineering college, with mess and Wi-Fi included.",
    slug: "silver-oak-c-118-bed-btmlayout",
    coverColor: "#e7d9ef",
  },
  {
    id: "u8",
    unitCode: "C-301",
    propertyId: "silver-oak",
    propertyName: "Silver Oak Hostel",
    type: "1RK",
    rent: 8900,
    listed: false,
    views: 0,
    enquiries: 0,
    listingTitle: "Independent 1RK, Silver Oak Hostel",
    listingDescription: "Independent single-room unit, currently off-market pending a move-out inspection.",
    slug: "silver-oak-c-301-1rk-btmlayout",
    coverColor: "#e7d9ef",
  },
  {
    id: "u9",
    unitCode: "E-110",
    propertyId: "lake-breeze",
    propertyName: "Lake Breeze Flats",
    type: "Studio",
    rent: 12800,
    listed: true,
    views: 221,
    enquiries: 4,
    listingTitle: "Lake-facing studio apartment",
    listingDescription: "A fully furnished studio with a lake-facing balcony, ideal for a single working professional.",
    slug: "lake-breeze-e-110-studio-hebbal",
    coverColor: "#cfe0ea",
  },
];

export interface LocalityPage {
  id: string;
  name: string;
  listingCount: number;
  monthlyViews: number;
}

export const localityPages: LocalityPage[] = [
  { id: "koramangala", name: "Koramangala", listingCount: 14, monthlyViews: 1120 },
  { id: "indiranagar", name: "Indiranagar", listingCount: 9, monthlyViews: 860 },
  { id: "whitefield", name: "Whitefield", listingCount: 11, monthlyViews: 745 },
  { id: "btm-layout", name: "BTM Layout", listingCount: 6, monthlyViews: 310 },
  { id: "hebbal", name: "Hebbal", listingCount: 2, monthlyViews: 179 },
];

export const listingsSummary = {
  liveListings: listings.filter((l) => l.listed).length,
  totalUnits: 163,
  viewsThisMonth: 3214,
  enquiriesThisMonth: 58,
  conversionRate: 1.8,
  viewsSparkline: [210, 260, 240, 310, 290, 340, 365, 330, 380, 410, 395, 430],
};
