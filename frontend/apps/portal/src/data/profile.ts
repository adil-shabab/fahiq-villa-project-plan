/**
 * Mock tenant profile + notification preferences. Replaced by GET/PATCH /me/profile and the
 * notification-preference endpoints once the backend exists (docs/06 §6.3, docs/07 §7.7).
 */

export type VehicleType = "two_wheeler" | "four_wheeler";

export interface Vehicle {
  id: string;
  type: VehicleType;
  number: string;
}

export interface Profile {
  fullName: string;
  /** Digits only, without +91. Login number; changing it needs OTP verification. */
  mobile: string;
  email: string;
  emergencyName: string;
  emergencyMobile: string;
  vehicles: Vehicle[];
  photo?: string; // data URL in the mock
}

export const seedProfile: Profile = {
  fullName: "Rahul Verma",
  mobile: "9876543210",
  email: "rahul.verma@example.com",
  emergencyName: "Sunita Verma (Mother)",
  emergencyMobile: "9811122233",
  vehicles: [{ id: "v1", type: "two_wheeler", number: "KA 03 HX 4521" }],
};

export type NotifEvent = "rent_reminders" | "payment_receipts" | "maintenance" | "announcements" | "promotions";
export type NotifChannel = "whatsapp" | "sms" | "email";

export interface NotificationPrefs {
  channels: Record<NotifEvent, Record<NotifChannel, boolean>>;
  quietHours: { enabled: boolean; from: string; to: string }; // HH:mm, IST
}

export const notifEvents: { id: NotifEvent; label: string; hint: string }[] = [
  { id: "rent_reminders", label: "Rent Reminders", hint: "Bills, due-date and overdue reminders" },
  { id: "payment_receipts", label: "Payment Receipts", hint: "Receipt after every payment" },
  { id: "maintenance", label: "Maintenance Updates", hint: "Ticket status changes and replies" },
  { id: "announcements", label: "Announcements", hint: "Notices from your property" },
  { id: "promotions", label: "Promotions & Offers", hint: "Referral rewards and offers" },
];

export const seedNotificationPrefs: NotificationPrefs = {
  channels: {
    rent_reminders: { whatsapp: true, sms: true, email: true },
    payment_receipts: { whatsapp: true, sms: false, email: true },
    maintenance: { whatsapp: true, sms: false, email: false },
    announcements: { whatsapp: true, sms: false, email: false },
    promotions: { whatsapp: false, sms: false, email: false },
  },
  quietHours: { enabled: true, from: "22:00", to: "08:00" },
};
