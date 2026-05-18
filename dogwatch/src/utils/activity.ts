import { ACTIVITY_TYPES, Activity, ActivityType, Member } from "@/types/dogwatch";
import { startOfDay } from "@/utils/dates";

export const ACTION_CONFIG: Record<
  ActivityType,
  {
    label: string;
    symbol: string;
    color: string;
    bg: string;
    lightBg: string;
  }
> = {
  fed: {
    label: "Fed",
    symbol: "🍗",
    color: "#F97316",
    bg: "#FFF7ED",
    lightBg: "#FFEDD5",
  },
  walked: {
    label: "Walked",
    symbol: "🦮",
    color: "#22C55E",
    bg: "#F0FDF4",
    lightBg: "#DCFCE7",
  },
  medicine: {
    label: "Medicine",
    symbol: "💊",
    color: "#3B82F6",
    bg: "#EFF6FF",
    lightBg: "#DBEAFE",
  },
  bathroom: {
    label: "Bathroom",
    symbol: "🌿",
    color: "#EAB308",
    bg: "#FEFCE8",
    lightBg: "#FEF9C3",
  },
  groomed: {
    label: "Groomed",
    symbol: "✨",
    color: "#A855F7",
    bg: "#FAF5FF",
    lightBg: "#F3E8FF",
  },
  note: {
    label: "Note",
    symbol: "📝",
    color: "#6B7280",
    bg: "#F9FAFB",
    lightBg: "#F3F4F6",
  },
};

export function getActivityDescription(
  type: ActivityType,
  member: string,
  dogName: string,
): string {
  switch (type) {
    case "fed":
      return `${member} fed ${dogName}`;
    case "walked":
      return `${member} walked ${dogName}`;
    case "medicine":
      return `${member} gave ${dogName} medicine`;
    case "bathroom":
      return `${member} took ${dogName} for a bathroom break`;
    case "groomed":
      return `${member} groomed ${dogName}`;
    case "note":
      return `${member} added a note`;
  }
}

export function getLastActivity(
  activities: Activity[],
  type: ActivityType,
): Activity | undefined {
  return activities.find((activity) => activity.type === type);
}

export function countActivitiesToday(
  activities: Activity[],
  type: ActivityType,
  now = new Date(),
): number {
  const today = startOfDay(now);
  return activities.filter(
    (activity) => activity.type === type && activity.timestamp >= today,
  ).length;
}

export function getMemberStats(
  activities: Activity[],
  member: Member,
  now = new Date(),
) {
  const memberActivities = activities.filter(
    (activity) => activity.member === member.name,
  );
  const today = startOfDay(now);
  const todayCount = memberActivities.filter(
    (activity) => activity.timestamp >= today,
  ).length;
  const total = memberActivities.length;
  const contributionPercent =
    activities.length === 0 ? 0 : Math.round((total / activities.length) * 100);

  return {
    total,
    todayCount,
    last: memberActivities[0],
    contributionPercent,
  };
}

export function assertCompleteActionConfig() {
  return ACTIVITY_TYPES.every((type) => Boolean(ACTION_CONFIG[type]));
}
