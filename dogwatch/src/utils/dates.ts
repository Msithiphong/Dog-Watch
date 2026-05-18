import { Activity } from "@/types/dogwatch";

export function formatRelativeTime(date: Date, now = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  return `${diffDays}d ago`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatDateLabel(date: Date, now = new Date()): string {
  const today = startOfDay(now);
  const dateDay = startOfDay(date);
  const diffDays = Math.floor((today.getTime() - dateDay.getTime()) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function groupActivitiesByDate(
  activities: Activity[],
  now = new Date(),
): { date: string; items: Activity[] }[] {
  const groups = new Map<string, Activity[]>();

  for (const activity of activities) {
    const label = formatDateLabel(activity.timestamp, now);
    groups.set(label, [...(groups.get(label) ?? []), activity]);
  }

  return Array.from(groups.entries()).map(([date, items]) => ({ date, items }));
}
