import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActivityRow } from "@/components/ActivityRow";
import { Screen } from "@/components/ui";
import { colors, spacing } from "@/design/tokens";
import { Activity } from "@/types/dogwatch";
import { groupActivitiesByDate } from "@/utils/dates";

interface ActivityFeedScreenProps {
  activities: Activity[];
  dogName: string;
  onLogAction: () => void;
}

export function ActivityFeedScreen({
  activities,
  dogName,
  onLogAction,
}: ActivityFeedScreenProps) {
  const groups = groupActivitiesByDate(activities);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Activity Feed</Text>
          <Text style={styles.subtitle}>Care history for {dogName}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add activity"
          onPress={onLogAction}
          style={({ pressed }) => [styles.logButton, pressed && styles.pressed]}
        >
          <Text style={styles.logButtonText}>+ Log</Text>
        </Pressable>
      </View>

      {activities.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>P</Text>
          <Text style={styles.emptyTitle}>No activity yet</Text>
          <Text style={styles.emptySub}>Start logging care for {dogName}</Text>
        </View>
      ) : (
        groups.map((group) => (
          <View key={group.date} style={styles.group}>
            <View style={styles.dateRow}>
              <View style={styles.dateLine} />
              <Text style={styles.datePill}>{group.date}</Text>
              <View style={styles.dateLine} />
            </View>
            <View style={styles.list}>
              {group.items.map((activity) => (
                <ActivityRow
                  key={activity.id}
                  activity={activity}
                  dogName={dogName}
                />
              ))}
            </View>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 2,
  },
  logButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  logButtonText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: "800",
  },
  group: {
    marginBottom: spacing.xl,
  },
  dateRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  dateLine: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
  },
  datePill: {
    backgroundColor: colors.softBorder,
    borderRadius: 999,
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  list: {
    gap: spacing.sm,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 72,
  },
  emptyIcon: {
    color: colors.primary,
    fontSize: 42,
    fontWeight: "900",
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: spacing.md,
  },
  emptySub: {
    color: colors.faintText,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  pressed: {
    opacity: 0.72,
  },
});
