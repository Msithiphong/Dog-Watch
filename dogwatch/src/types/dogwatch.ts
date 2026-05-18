export const ACTIVITY_TYPES = [
  "fed",
  "walked",
  "medicine",
  "bathroom",
  "groomed",
  "note",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface Activity {
  id: string;
  type: ActivityType;
  member: string;
  timestamp: Date;
  note?: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
  lastActive: Date;
}

export interface Reminder {
  id: string;
  type: ActivityType;
  label: string;
  time: string;
  days: string[];
  enabled: boolean;
}

export interface Dog {
  name: string;
  breed: string;
  age: string;
  weight: string;
  photo: string;
  birthday: string;
  about: string;
  tags: string[];
}
