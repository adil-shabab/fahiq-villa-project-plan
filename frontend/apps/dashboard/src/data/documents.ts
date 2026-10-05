export type DocCategory = "Agreement" | "KYC Verification" | "Police Intimation" | "Inspection" | "Settlement" | "Invoice";
export type SignStatus = "Signed" | "Pending" | "NA" | "Unsigned";

export interface VaultDocument {
  id: string;
  code: string;
  title: string;
  icon: "pdf" | "badge" | "police" | "lease" | "photos" | "pending" | "settlement" | "invoice";
  category: DocCategory;
  sizeLabel: string;
  tagLabel?: string;
  relatedEntity: string;
  relatedIcon: "person" | "domain";
  uploadedByInitials: string;
  uploadedByName: string;
  uploadedByRole: string;
  uploadDate: string;
  validityLabel: string;
  signStatus: SignStatus;
  signStatusLabel: string;
  expired?: boolean;
  expiringSoon?: boolean;
}

export const vaultDocuments: VaultDocument[] = [
  {
    id: "doc-8942",
    code: "DOC-8942",
    title: "Residential Tenancy Agreement — Unit A-101",
    icon: "pdf",
    category: "Agreement",
    sizeLabel: "2.4 MB PDF",
    tagLabel: "OCR",
    relatedEntity: "Rahul Sharma (A-101)",
    relatedIcon: "person",
    uploadedByInitials: "PS",
    uploadedByName: "Priya Sharma",
    uploadedByRole: "Property Mgr",
    uploadDate: "22 Sep 2026",
    validityLabel: "01 Oct 2027",
    signStatus: "Signed",
    signStatusLabel: "Aadhaar e-Signed",
  },
  {
    id: "doc-8941",
    code: "DOC-8941",
    title: "Aadhaar Card & KYC Scan — Rahul Sharma",
    icon: "badge",
    category: "KYC Verification",
    sizeLabel: "1.1 MB PDF",
    tagLabel: "UIDAI Verified",
    relatedEntity: "Rahul Sharma",
    relatedIcon: "person",
    uploadedByInitials: "RK",
    uploadedByName: "Rajesh Kumar",
    uploadedByRole: "Facility Ops",
    uploadDate: "22 Sep 2026",
    validityLabel: "—",
    signStatus: "NA",
    signStatusLabel: "N/A (Govt ID)",
  },
  {
    id: "doc-8938",
    code: "DOC-8938",
    title: "Police Verification Intimation Form 2026",
    icon: "police",
    category: "Police Intimation",
    sizeLabel: "890 KB PDF",
    tagLabel: "Bengaluru Police",
    relatedEntity: "Fatima Khan (A-102)",
    relatedIcon: "person",
    uploadedByInitials: "PS",
    uploadedByName: "Priya Sharma",
    uploadedByRole: "Property Mgr",
    uploadDate: "18 Sep 2026",
    validityLabel: "15 Oct 2026",
    signStatus: "NA",
    signStatusLabel: "Submitted to PS",
    expiringSoon: true,
  },
  {
    id: "doc-8720",
    code: "DOC-8720",
    title: "Commercial Lease Agreement — Ground Floor Cafe",
    icon: "lease",
    category: "Agreement",
    sizeLabel: "4.2 MB PDF",
    relatedEntity: "Maple Court Apartments",
    relatedIcon: "domain",
    uploadedByInitials: "PS",
    uploadedByName: "Priya Sharma",
    uploadedByRole: "Property Mgr",
    uploadDate: "14 May 2025",
    validityLabel: "Expired 14 May 2026",
    signStatus: "Signed",
    signStatusLabel: "Expired 14 May 2026",
    expired: true,
  },
  {
    id: "doc-8924",
    code: "DOC-8924",
    title: "Move-in Inspection Checklist & Geo-tagged Photos",
    icon: "photos",
    category: "Inspection",
    sizeLabel: "18.6 MB ZIP",
    relatedEntity: "Ananya Rao (B-204)",
    relatedIcon: "person",
    uploadedByInitials: "AV",
    uploadedByName: "Ankit Verma",
    uploadedByRole: "Maintenance",
    uploadDate: "01 Sep 2026",
    validityLabel: "—",
    signStatus: "NA",
    signStatusLabel: "N/A (Media)",
  },
  {
    id: "doc-8919",
    code: "DOC-8919",
    title: "Residential Tenancy Agreement — Unit C-118",
    icon: "pending",
    category: "Agreement",
    sizeLabel: "1.9 MB PDF",
    relatedEntity: "Arjun Nair (C-118)",
    relatedIcon: "person",
    uploadedByInitials: "PS",
    uploadedByName: "Priya Sharma",
    uploadedByRole: "Property Mgr",
    uploadDate: "28 Sep 2026",
    validityLabel: "01 Dec 2026",
    signStatus: "Pending",
    signStatusLabel: "Pending Tenant Signature",
  },
  {
    id: "doc-8890",
    code: "DOC-8890",
    title: "Security Deposit Settlement Deed — Vikram Shah",
    icon: "settlement",
    category: "Settlement",
    sizeLabel: "512 KB PDF",
    relatedEntity: "Vikram Shah (E-208)",
    relatedIcon: "person",
    uploadedByInitials: "PS",
    uploadedByName: "Priya Sharma",
    uploadedByRole: "Property Mgr",
    uploadDate: "24 Sep 2026",
    validityLabel: "—",
    signStatus: "Signed",
    signStatusLabel: "Signed & Settled",
  },
  {
    id: "doc-8876",
    code: "DOC-8876",
    title: "Tax Invoice #INV-2026-0501 — Maintenance & Power",
    icon: "invoice",
    category: "Invoice",
    sizeLabel: "340 KB PDF",
    relatedEntity: "Green View Residency",
    relatedIcon: "domain",
    uploadedByInitials: "PS",
    uploadedByName: "Priya Sharma",
    uploadedByRole: "Property Mgr",
    uploadDate: "20 Sep 2026",
    validityLabel: "—",
    signStatus: "NA",
    signStatusLabel: "N/A (Invoice)",
  },
];

export const docCategories = [
  "All Categories",
  "Agreement (Tenancy & Lease)",
  "KYC & Government ID",
  "Police Verification",
  "Tax Invoice & Bills",
  "Move-in Inspection Photos",
  "Settlement Deed",
] as const;

export const vaultStats = {
  totalDocuments: vaultDocuments.length,
  signedAgreements: vaultDocuments.filter((d) => d.signStatus === "Signed").length,
  expiringSoon: vaultDocuments.filter((d) => d.expiringSoon).length,
  expiredFlag: vaultDocuments.filter((d) => d.expired).length,
};

export interface DocTemplate {
  id: string;
  version: string;
  title: string;
  description: string;
  tokenCount: number;
  sampleTokens: string[];
  editedLabel: string;
}

export const docTemplates: DocTemplate[] = [
  {
    id: "tpl-rental",
    version: "v3.2 · Active",
    title: "Rental Agreement (Standard 11-Month)",
    description: "Karnataka stamp-duty compliant tenancy contract with auto-calculated escalations, maintenance allocation, and lock-in period clauses.",
    tokenCount: 14,
    sampleTokens: ["{{tenant_name}}", "{{rent_amount}}"],
    editedLabel: "Edited 20 Sep 2026",
  },
  {
    id: "tpl-police",
    version: "v2.0 · Active",
    title: "Police Verification Form (Bengaluru City)",
    description: "Standard tenant verification format for jurisdictional police station submissions, employer cross-checks, and permanent address affidavits.",
    tokenCount: 10,
    sampleTokens: ["{{permanent_addr}}", "{{station_ps}}"],
    editedLabel: "Edited 04 Sep 2026",
  },
  {
    id: "tpl-receipt",
    version: "v4.1 · Active",
    title: "Rent Receipt (Section 10(13A) HRA)",
    description: "Automated monthly rent receipt containing Landlord PAN, GSTIN breakdown, and revenue stamp watermark for tenant tax exemption filing.",
    tokenCount: 8,
    sampleTokens: ["{{landlord_pan}}", "{{receipt_month}}"],
    editedLabel: "Edited 01 Sep 2026",
  },
  {
    id: "tpl-moveout",
    version: "v1.4 · Active",
    title: "Notice of Termination / Move-out Notice",
    description: "30-day formal vacation intimation protocol with key-handover timeline, exit checklist adherence, and security deposit repayment guidelines.",
    tokenCount: 6,
    sampleTokens: ["{{vacate_date}}", "{{key_officer}}"],
    editedLabel: "Edited 19 Jul 2026",
  },
  {
    id: "tpl-settlement",
    version: "v2.5 · Active",
    title: "Move-out Settlement Statement",
    description: "Net security deposit refund ledger calculating painting charges, deep-cleaning deductions, electricity meter arrears, and NEFT payout schedule.",
    tokenCount: 12,
    sampleTokens: ["{{gross_deposit}}", "{{net_refund}}"],
    editedLabel: "Edited 20 Sep 2026",
  },
  {
    id: "tpl-noc",
    version: "v1.1 · Active",
    title: "NOC / Society Clearance Certificate",
    description: "Resident Welfare Association (RWA) gate-pass, moving truck clearance undertaking, and clubhouse access authorization form.",
    tokenCount: 5,
    sampleTokens: ["{{rwa_name}}", "{{clearance_date}}"],
    editedLabel: "Edited 10 Aug 2026",
  },
];
