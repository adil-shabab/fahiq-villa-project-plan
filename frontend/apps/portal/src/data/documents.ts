/**
 * Mock documents for the tenant portal. Replaced by GET /me/agreement, /me/documents and the
 * KYC status endpoints once the backend exists (docs/06 §6.3). Real files will be PDFs/images
 * served through short-lived signed URLs; here each document carries simple structured content
 * so the viewer has something to render.
 */

export interface DocSection {
  heading?: string;
  lines: string[];
}

export interface PortalDocument {
  id: string;
  title: string;
  fileName: string;
  sizeLabel: string;
  updatedAt: string; // ISO date
  sections: DocSection[];
}

export type KycType = "aadhaar" | "pan" | "photo";
export type KycStatus = "verified" | "pending" | "rejected";

export interface KycDocument {
  type: KycType;
  label: string;
  numberMasked?: string;
  status: KycStatus;
  rejectionReason?: string;
  thumbnail: string; // data URL
}

export interface Agreement {
  status: "signed" | "awaiting_signature";
  signedAt?: string; // ISO date
  document: PortalDocument;
}

function thumb(hue: number, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="64"><rect width="96" height="64" rx="6" fill="hsl(${hue} 35% 88%)"/><rect x="8" y="10" width="22" height="28" rx="3" fill="hsl(${hue} 30% 70%)"/><rect x="36" y="12" width="48" height="5" rx="2" fill="hsl(${hue} 25% 65%)"/><rect x="36" y="22" width="38" height="4" rx="2" fill="hsl(${hue} 25% 72%)"/><rect x="36" y="30" width="44" height="4" rx="2" fill="hsl(${hue} 25% 72%)"/><text x="48" y="56" font-family="sans-serif" font-size="9" fill="hsl(${hue} 30% 35%)" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const seedAgreement: Agreement = {
  status: "signed",
  signedAt: "2026-02-28",
  document: {
    id: "agreement",
    title: "Rental Agreement",
    fileName: "Rental Agreement - A-101.pdf",
    sizeLabel: "412 KB",
    updatedAt: "2026-02-28",
    sections: [
      { lines: ["Leave and Licence Agreement", "Green View Residency · Flat A-101, Bellandur, Bengaluru 560103"] },
      {
        heading: "Parties",
        lines: ["Licensor: Fahiq Coliving & Hospitality Pvt. Ltd.", "Licensee: Rahul Verma"],
      },
      {
        heading: "Term",
        lines: ["Start date: 1 March 2026", "End date: 28 February 2027 (11 months)", "Lock-in: 6 months · Notice period: 30 days"],
      },
      {
        heading: "Rent & deposit",
        lines: [
          "Monthly rent: ₹15,000, due on the 5th of every month",
          "Security deposit: ₹45,000 (refundable, less dues and damages)",
          "Annual escalation: 5% on renewal",
          "Electricity billed by sub-meter at ₹8.50/unit; Wi-Fi ₹500/month",
        ],
      },
      {
        heading: "Key terms",
        lines: [
          "Late payment attracts ₹100/day after a 5-day grace period, capped at ₹1,500.",
          "No structural changes without written consent.",
          "Guests may stay up to 3 nights with prior intimation.",
          "Move-out inspection compares against the move-in inventory.",
        ],
      },
      { heading: "Signatures", lines: ["Signed electronically by both parties on 28 Feb 2026 (Aadhaar eSign)."] },
    ],
  },
};

export const seedKyc: KycDocument[] = [
  { type: "aadhaar", label: "Aadhaar", numberMasked: "XXXX XXXX 4821", status: "verified", thumbnail: thumb(28, "AADHAAR") },
  { type: "pan", label: "PAN", numberMasked: "XXXXX1234X", status: "pending", thumbnail: thumb(210, "PAN") },
  {
    type: "photo",
    label: "Photo",
    status: "rejected",
    rejectionReason: "Photo is blurry, please re-upload a clearer image.",
    thumbnail: thumb(150, "PHOTO"),
  },
];

export const sharedDocuments: PortalDocument[] = [
  {
    id: "house-rules",
    title: "House Rules",
    fileName: "House Rules.pdf",
    sizeLabel: "184 KB",
    updatedAt: "2026-06-12",
    sections: [
      { heading: "Quiet hours", lines: ["10:00 PM – 7:00 AM. Keep music and calls low in common areas."] },
      { heading: "Gate", lines: ["Main gate closes at 11:30 PM. Use the intercom after hours."] },
      { heading: "Guests", lines: ["Register overnight guests with the front desk. Maximum 3 nights."] },
      { heading: "Waste", lines: ["Segregate wet and dry waste. Collection at 8:00 AM daily outside each flat."] },
      { heading: "Smoking", lines: ["Not allowed inside flats, corridors or lifts. Use the terrace smoking zone."] },
    ],
  },
  {
    id: "wifi",
    title: "Wi-Fi Details",
    fileName: "Wi-Fi Details.pdf",
    sizeLabel: "36 KB",
    updatedAt: "2026-09-01",
    sections: [
      { heading: "Your flat", lines: ["Network: GreenView_A101", "Password: gv-a101-Monsoon26"] },
      { heading: "Common areas", lines: ["Network: GreenView_Lounge", "Password: lounge@gv2026"] },
      { heading: "Support", lines: ["Router issues? Raise an Internet ticket from the app. ISP helpline: 1800 425 1234."] },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Contacts",
    fileName: "Emergency Contacts.pdf",
    sizeLabel: "52 KB",
    updatedAt: "2026-05-20",
    sections: [
      {
        heading: "Building",
        lines: ["Property manager (Priya Sharma): +91 80 4920 8800", "Security desk (24×7): +91 98450 11223", "Electrician on call: +91 99001 22334"],
      },
      { heading: "City", lines: ["Police: 112", "Fire: 101", "Ambulance: 108", "Nearest hospital: Sakra World Hospital, 2.1 km"] },
    ],
  },
  {
    id: "society",
    title: "Society Guidelines",
    fileName: "Society Guidelines.pdf",
    sizeLabel: "268 KB",
    updatedAt: "2026-01-15",
    sections: [
      { heading: "Parking", lines: ["One allotted two-wheeler slot per flat. Visitor parking is first-come, first-served."] },
      { heading: "Amenities", lines: ["Gym 6 AM – 10 PM. Terrace closes at 10 PM.", "Book the party hall at the front desk 48 hours ahead."] },
      { heading: "Pets", lines: ["Pets on leash in common areas. Owners clean up after them."] },
    ],
  },
];

/** Plain-text rendering used for download / share until the backend serves the real files. */
export function documentText(doc: PortalDocument): string {
  return [doc.title, "", ...doc.sections.flatMap((s) => [...(s.heading ? [s.heading.toUpperCase()] : []), ...s.lines, ""])].join("\n");
}
