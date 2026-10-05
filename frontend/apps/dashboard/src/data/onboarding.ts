export const onboardingSteps = ["Applicant", "KYC", "Terms", "Agreement", "Inspection", "Review"] as const;
export type OnboardingStepName = (typeof onboardingSteps)[number];

export interface OnboardingRecord {
  id: string;
  applicantName: string;
  avatarInitials: string;
  unitCode: string;
  propertyName: string;
  stepIndex: number; // 0-based index into onboardingSteps, or onboardingSteps.length if complete
  startedOn: string;
  assignedTo: string;
}

export const inProgressOnboardings: OnboardingRecord[] = [
  {
    id: "ob1",
    applicantName: "Siddharth Rao",
    avatarInitials: "SR",
    unitCode: "B-305",
    propertyName: "Maple Court Apartments",
    stepIndex: 4,
    startedOn: "2026-09-26",
    assignedTo: "Priya Sharma",
  },
  {
    id: "ob2",
    applicantName: "Pooja Bhatt",
    avatarInitials: "PB",
    unitCode: "D-207",
    propertyName: "Sunrise PG for Women",
    stepIndex: 2,
    startedOn: "2026-09-28",
    assignedTo: "Priya Sharma",
  },
  {
    id: "ob3",
    applicantName: "Farhan Sheikh",
    avatarInitials: "FS",
    unitCode: "C-204",
    propertyName: "Silver Oak Hostel",
    stepIndex: 1,
    startedOn: "2026-09-30",
    assignedTo: "Rohan Gupta",
  },
];

export const recentlyCompleted: OnboardingRecord[] = [
  {
    id: "ob0",
    applicantName: "Karthik Subramaniam",
    avatarInitials: "KS",
    unitCode: "B-204",
    propertyName: "Maple Court Apartments",
    stepIndex: 6,
    startedOn: "2026-09-18",
    assignedTo: "Priya Sharma",
  },
];

export interface KycDoc {
  type: "Aadhaar" | "PAN" | "Photo" | "Other";
  status: "Pending" | "Verified" | "Rejected";
  rejectionReason?: string;
}

export interface CoOccupant {
  id: string;
  name: string;
  relation: string;
  phone: string;
  kind: "Co-occupant" | "Guarantor";
}

export interface InventoryItem {
  id: string;
  label: string;
  condition: "New" | "Good" | "Fair" | "Damaged";
  notes: string;
}

export interface OnboardingDraft {
  // Step 1 — Applicant
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  currentAddress: string;
  permanentAddress: string;
  sameAsCurrent: boolean;
  occupation: "Working Professional" | "Student" | "Business";
  companyOrCollege: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  coOccupants: CoOccupant[];

  // Step 2 — KYC
  kycDocs: KycDoc[];

  // Step 3 — Terms
  startDate: string;
  endDate: string;
  rent: number;
  deposit: number;
  maintenanceCharge: number;
  lockInMonths: number;
  noticePeriodDays: number;
  escalationPercent: number;
  dueDay: number;
  waterIncluded: boolean;
  wifiIncluded: boolean;
  parkingIncluded: boolean;

  // Step 4 — Agreement
  agreementMethod: "esign" | "upload" | "skip";
  agreementStatus: "Not sent" | "Awaiting Signature" | "Signed" | "Uploaded";

  // Step 5 — Inspection
  inventory: InventoryItem[];
  openingElectricityReading: string;
  openingWaterReading: string;

  // target
  unitCode: string;
  propertyName: string;
}

export function createEmptyDraft(unitCode: string, propertyName: string, rent: number, deposit: number): OnboardingDraft {
  return {
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    currentAddress: "",
    permanentAddress: "",
    sameAsCurrent: false,
    occupation: "Working Professional",
    companyOrCollege: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    coOccupants: [],
    kycDocs: [
      { type: "Aadhaar", status: "Pending" },
      { type: "PAN", status: "Pending" },
      { type: "Photo", status: "Pending" },
    ],
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    rent,
    deposit,
    maintenanceCharge: 0,
    lockInMonths: 6,
    noticePeriodDays: 30,
    escalationPercent: 5,
    dueDay: 5,
    waterIncluded: false,
    wifiIncluded: false,
    parkingIncluded: false,
    agreementMethod: "esign",
    agreementStatus: "Not sent",
    inventory: [
      { id: "inv1", label: "Bed", condition: "Good", notes: "" },
      { id: "inv2", label: "Wardrobe", condition: "Good", notes: "" },
      { id: "inv3", label: "Fan", condition: "Good", notes: "" },
      { id: "inv4", label: "Geyser", condition: "Good", notes: "" },
      { id: "inv5", label: "Wi-Fi Router", condition: "Good", notes: "" },
    ],
    openingElectricityReading: "",
    openingWaterReading: "",
    unitCode,
    propertyName,
  };
}
