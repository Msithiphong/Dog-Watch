import { createActivities, createMembers, INITIAL_REMINDERS, LUNA } from "@/data/dogwatch";
import {
  createInitialDogWatchState,
  createLoggedActivity,
  dogWatchReducer,
} from "@/state/dogwatch";
import { ACTIVITY_TYPES } from "@/types/dogwatch";
import {
  ACTION_CONFIG,
  assertCompleteActionConfig,
  countActivitiesToday,
  getActivityDescription,
  getLastActivity,
  getMemberStats,
} from "@/utils/activity";
import {
  formatDateLabel,
  formatRelativeTime,
  formatTime,
  groupActivitiesByDate,
} from "@/utils/dates";

describe("date helpers", () => {
  const now = new Date(2026, 4, 17, 15, 5, 0);

  it("formats relative time thresholds", () => {
    expect(formatRelativeTime(new Date(2026, 4, 17, 15, 5, 0), now)).toBe(
      "just now",
    );
    expect(formatRelativeTime(new Date(2026, 4, 17, 14, 43, 0), now)).toBe(
      "22m ago",
    );
    expect(formatRelativeTime(new Date(2026, 4, 17, 12, 5, 0), now)).toBe(
      "3h ago",
    );
    expect(formatRelativeTime(new Date(2026, 4, 16, 12, 5, 0), now)).toBe(
      "yesterday",
    );
  });

  it("formats time and date grouping labels", () => {
    expect(formatTime(new Date(2026, 4, 17, 15, 5, 0))).toBe("3:05 PM");
    expect(formatDateLabel(new Date(2026, 4, 17, 7, 0, 0), now)).toBe("Today");
    expect(formatDateLabel(new Date(2026, 4, 16, 7, 0, 0), now)).toBe(
      "Yesterday",
    );
  });

  it("groups activities by formatted date label", () => {
    const activities = createActivities(now);
    const groups = groupActivitiesByDate(activities, now);

    expect(groups[0].date).toBe("Today");
    expect(groups.some((group) => group.date === "Yesterday")).toBe(true);
  });
});

describe("activity helpers", () => {
  it("defines metadata for every activity type", () => {
    expect(assertCompleteActionConfig()).toBe(true);

    for (const type of ACTIVITY_TYPES) {
      expect(ACTION_CONFIG[type].label).toBeTruthy();
      expect(ACTION_CONFIG[type].color).toMatch(/^#/);
      expect(ACTION_CONFIG[type].bg).toMatch(/^#/);
    }
  });

  it("builds dog-specific activity descriptions", () => {
    expect(getActivityDescription("fed", "Alex", "Luna")).toBe("Alex fed Luna");
    expect(getActivityDescription("medicine", "Maya", "Luna")).toBe(
      "Maya gave Luna medicine",
    );
    expect(getActivityDescription("note", "Jordan", "Luna")).toBe(
      "Jordan added a note",
    );
  });

  it("calculates last activity, today counts, and member contribution", () => {
    const now = new Date(2026, 4, 17, 12, 0, 0);
    const activities = createActivities(now);
    const members = createMembers(now);

    expect(getLastActivity(activities, "fed")?.member).toBe("Alex");
    expect(countActivitiesToday(activities, "fed", now)).toBe(2);

    const alexStats = getMemberStats(activities, members[0], now);
    expect(alexStats.todayCount).toBe(2);
    expect(alexStats.total).toBe(3);
    expect(alexStats.contributionPercent).toBe(30);
  });
});

describe("DogWatch reducer", () => {
  it("prepends logged activity and trims optional notes", () => {
    const state = createInitialDogWatchState(new Date(2026, 4, 17, 12, 0, 0));
    const timestamp = new Date(2026, 4, 17, 13, 0, 0);
    const next = dogWatchReducer(state, {
      type: "logActivity",
      activityType: "fed",
      member: "Alex",
      note: "  extra dinner  ",
      timestamp,
    });

    expect(next.activities).toHaveLength(state.activities.length + 1);
    expect(next.activities[0]).toMatchObject({
      type: "fed",
      member: "Alex",
      note: "extra dinner",
      timestamp,
    });
  });

  it("omits whitespace-only notes", () => {
    const state = createInitialDogWatchState(new Date(2026, 4, 17, 12, 0, 0));
    const activity = createLoggedActivity(state, {
      type: "logActivity",
      activityType: "note",
      member: "Alex",
      note: "   ",
      timestamp: new Date(2026, 4, 17, 13, 0, 0),
    });

    expect(activity.note).toBeUndefined();
  });

  it("toggles one reminder without changing unrelated reminders", () => {
    const state = {
      currentUser: createMembers()[0],
      dog: LUNA,
      members: createMembers(),
      activities: [],
      reminders: INITIAL_REMINDERS.map((reminder) => ({ ...reminder })),
    };
    const next = dogWatchReducer(state, { type: "toggleReminder", id: "4" });

    expect(state.reminders.find((reminder) => reminder.id === "4")?.enabled).toBe(
      false,
    );
    expect(next.reminders.find((reminder) => reminder.id === "4")?.enabled).toBe(
      true,
    );
    expect(next.reminders.find((reminder) => reminder.id === "1")?.enabled).toBe(
      state.reminders.find((reminder) => reminder.id === "1")?.enabled,
    );
  });
});
