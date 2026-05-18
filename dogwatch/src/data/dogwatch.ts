import { Activity, Dog, Member, Reminder } from "@/types/dogwatch";

const minusMinutes = (now: Date, minutes: number) =>
  new Date(now.getTime() - minutes * 60 * 1000);

const minusHours = (now: Date, hours: number) =>
  new Date(now.getTime() - hours * 60 * 60 * 1000);

export const LUNA: Dog = {
  name: "Luna",
  breed: "Golden Retriever",
  age: "3 years",
  weight: "62 lbs",
  photo:
    "https://images.unsplash.com/photo-1602241628512-459cdd3234fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=400",
  birthday: "March 12, 2022",
  about:
    "Luna loves belly rubs, fetch, and long walks in the park. She eats twice a day and takes monthly heartworm prevention medicine.",
  tags: ["Friendly", "Energetic", "Loves water", "Good with kids", "Toy-trained"],
};

export function createMembers(now = new Date()): Member[] {
  return [
    {
      id: "1",
      name: "Alex",
      avatar: "AL",
      role: "admin",
      lastActive: minusMinutes(now, 22),
    },
    {
      id: "2",
      name: "Maya",
      avatar: "MA",
      role: "member",
      lastActive: minusHours(now, 3),
    },
    {
      id: "3",
      name: "Jordan",
      avatar: "JO",
      role: "member",
      lastActive: minusHours(now, 14),
    },
  ];
}

export function createActivities(now = new Date()): Activity[] {
  return [
    {
      id: "1",
      type: "fed",
      member: "Alex",
      timestamp: minusMinutes(now, 22),
      note: "1 cup dry food plus treats",
    },
    {
      id: "2",
      type: "bathroom",
      member: "Alex",
      timestamp: minusMinutes(now, 45),
    },
    {
      id: "3",
      type: "walked",
      member: "Maya",
      timestamp: minusHours(now, 3),
      note: "30 min walk around the park",
    },
    {
      id: "4",
      type: "fed",
      member: "Maya",
      timestamp: minusHours(now, 5),
    },
    {
      id: "5",
      type: "bathroom",
      member: "Maya",
      timestamp: minusHours(now, 6),
    },
    {
      id: "6",
      type: "medicine",
      member: "Jordan",
      timestamp: minusHours(now, 14),
      note: "Monthly flea and tick prevention",
    },
    {
      id: "7",
      type: "walked",
      member: "Jordan",
      timestamp: minusHours(now, 16),
      note: "Morning walk, very energetic",
    },
    {
      id: "8",
      type: "groomed",
      member: "Maya",
      timestamp: minusHours(now, 24),
      note: "Full brush and bath",
    },
    {
      id: "9",
      type: "fed",
      member: "Jordan",
      timestamp: minusHours(now, 26),
    },
    {
      id: "10",
      type: "note",
      member: "Alex",
      timestamp: minusHours(now, 30),
      note: "Luna seems a bit low energy today. Keeping an eye on it.",
    },
  ];
}

export const INITIAL_REMINDERS: Reminder[] = [
  {
    id: "1",
    type: "fed",
    label: "Morning feeding",
    time: "7:30 AM",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    enabled: true,
  },
  {
    id: "2",
    type: "fed",
    label: "Evening feeding",
    time: "6:00 PM",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    enabled: true,
  },
  {
    id: "3",
    type: "walked",
    label: "Morning walk",
    time: "8:00 AM",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    enabled: true,
  },
  {
    id: "4",
    type: "walked",
    label: "Weekend walk",
    time: "9:00 AM",
    days: ["Sat", "Sun"],
    enabled: false,
  },
  {
    id: "5",
    type: "medicine",
    label: "Heartworm medicine",
    time: "8:00 PM",
    days: ["1st of month"],
    enabled: true,
  },
];
