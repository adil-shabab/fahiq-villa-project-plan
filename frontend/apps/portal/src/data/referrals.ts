/**
 * Mock referrals for the tenant portal. Replaced by GET/POST /me/referrals once the backend
 * exists (docs/06 §6.3 — referral reward tracking is a P3 feature).
 */

export type ReferralStatus = "invited" | "visited" | "moved_in" | "rewarded";

export interface Referral {
  id: string;
  name: string;
  phone: string; // E.164
  status: ReferralStatus;
  createdAt: string; // ISO timestamp
}

export const REFERRAL_REWARD = 1000;

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

export const seedReferrals: Referral[] = [
  { id: "r3", name: "Aditi Rao", phone: "+919845012345", status: "visited", createdAt: daysAgo(6) },
  { id: "r2", name: "Karan Mehta", phone: "+919900112233", status: "moved_in", createdAt: daysAgo(40) },
  { id: "r1", name: "Sneha Iyer", phone: "+918861234567", status: "rewarded", createdAt: daysAgo(150) },
];
