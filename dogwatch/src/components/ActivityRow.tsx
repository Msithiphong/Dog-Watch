import { StyleSheet, Text, View } from "react-native";

import { Avatar, Card } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";
import { Activity } from "@/types/dogwatch";
import { ACTION_CONFIG, getActivityDescription } from "@/utils/activity";
import { formatRelativeTime, formatTime } from "@/utils/dates";

export function ActivityRow({
  activity,
  dogName,
  compact = false,
}: {
  activity: Activity;
  dogName: string;
  compact?: boolean;
}) {
  const config = ACTION_CONFIG[activity.type];
  const initials = activity.member.slice(0, 2).toUpperCase();

  return (
    <Card style={[styles.row, compact && styles.compactRow]}>
      <View style={[styles.symbolWrap, { backgroundColor: config.bg }]}>
        <Text style={styles.symbol}>{config.symbol}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Avatar label={initials} size={24} />
          <Text style={styles.member}>{activity.member}</Text>
          <Text style={[styles.badge, { color: config.color, backgroundColor: config.bg }]}>
            {config.label}
          </Text>
        </View>
        <Text style={styles.description}>
          {getActivityDescription(activity.type, activity.member, dogName)}
        </Text>
        {activity.note ? <Text style={styles.note}>{activity.note}</Text> : null}
      </View>
      <Text style={styles.time}>
        {compact ? formatRelativeTime(activity.timestamp) : formatTime(activity.timestamp)}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  compactRow: {
    borderRadius: radius.md,
  },
  symbolWrap: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  symbol: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  member: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
  },
  badge: {
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  description: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  note: {
    backgroundColor: "#F9F8F7",
    borderRadius: radius.md,
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
    padding: spacing.sm,
  },
  time: {
    color: colors.faintText,
    fontSize: 12,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
});
