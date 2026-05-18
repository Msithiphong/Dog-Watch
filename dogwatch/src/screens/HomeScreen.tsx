import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ActivityRow } from "@/components/ActivityRow";
import { AppIcon } from "@/components/AppIcon";
import { Card, IconButton, Screen, SectionTitle, TextButton } from "@/components/ui";
import { colors, radius, shadows, spacing } from "@/design/tokens";
import { Activity, ActivityType, Dog } from "@/types/dogwatch";
import { ACTION_CONFIG, getLastActivity } from "@/utils/activity";
import { formatRelativeTime } from "@/utils/dates";

interface HomeScreenProps {
  dog: Dog;
  activities: Activity[];
  onLogAction: (type?: ActivityType) => void;
  onViewFeed: () => void;
  onViewReminders: () => void;
}

const QUICK_ACTIONS: ActivityType[] = [
  "fed",
  "walked",
  "medicine",
  "bathroom",
  "groomed",
  "note",
];

const STATUS_CARDS: { type: ActivityType; label: string }[] = [
  { type: "fed", label: "Last Fed" },
  { type: "walked", label: "Last Walk" },
  { type: "medicine", label: "Medicine" },
  { type: "bathroom", label: "Bathroom" },
];

export function HomeScreen({
  dog,
  activities,
  onLogAction,
  onViewFeed,
  onViewReminders,
}: HomeScreenProps) {
  const recentActivity = activities[0];

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Good morning</Text>
          <Text style={styles.greeting}>Alex</Text>
        </View>
        <IconButton label="Open reminders" onPress={onViewReminders} style={styles.bellButton}>
          <AppIcon
            name={{ ios: "bell.fill", android: "notifications" }}
            fallback="B"
            color={colors.text}
            size={18}
          />
          <View style={styles.notificationDot} />
        </IconButton>
      </View>

      <Card style={styles.heroCard}>
        <Image
          accessibilityLabel={`${dog.name} profile photo`}
          source={{ uri: dog.photo }}
          style={styles.heroPhoto}
          contentFit="cover"
        />
        <View style={styles.heroCopy}>
          <View style={styles.nameRow}>
            <Text style={styles.dogName}>{dog.name}</Text>
            <Text style={styles.breedPill}>{dog.breed}</Text>
          </View>
          <Text style={styles.heroMeta}>
            {recentActivity
              ? `Updated ${formatRelativeTime(recentActivity.timestamp)}`
              : "No recent activity"}
          </Text>
          <TextButton title="View activity" color={colors.card} onPress={onViewFeed} />
        </View>
      </Card>

      <View style={styles.statusGrid}>
        {STATUS_CARDS.map(({ type, label }) => {
          const config = ACTION_CONFIG[type];
          const activity = getLastActivity(activities, type);
          return (
            <Pressable
              key={type}
              accessibilityRole="button"
              accessibilityLabel={`Quick log ${config.label}`}
              onPress={() => onLogAction(type)}
              style={({ pressed }) => [
                styles.statusCard,
                shadows.card,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.statusTop}>
                <View style={[styles.statusIcon, { backgroundColor: config.bg }]}>
                  <Text style={styles.statusSymbol}>{config.symbol}</Text>
                </View>
                {activity ? (
                  <View style={[styles.statusDot, { backgroundColor: config.color }]} />
                ) : null}
              </View>
              <Text style={styles.statusLabel}>{label}</Text>
              <Text style={styles.statusValue}>
                {activity ? formatRelativeTime(activity.timestamp) : "Not yet"}
              </Text>
              {activity ? <Text style={styles.statusMember}>by {activity.member}</Text> : null}
            </Pressable>
          );
        })}
      </View>

      <SectionTitle
        title="Quick Log"
        action={<Text style={styles.helpText}>One tap to log</Text>}
      />
      <View style={styles.quickGrid}>
        {QUICK_ACTIONS.map((type) => {
          const config = ACTION_CONFIG[type];
          return (
            <Pressable
              key={type}
              accessibilityRole="button"
              accessibilityLabel={`Quick log ${config.label}`}
              onPress={() => onLogAction(type)}
              style={({ pressed }) => [
                styles.quickButton,
                { backgroundColor: config.bg },
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.quickSymbol}>{config.symbol}</Text>
              <Text style={[styles.quickLabel, { color: config.color }]}>
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle
        title="Recent Activity"
        action={<TextButton title="See all" onPress={onViewFeed} />}
      />
      <View style={styles.recentList}>
        {activities.slice(0, 3).map((activity) => (
          <ActivityRow
            key={activity.id}
            activity={activity}
            dogName={dog.name}
            compact
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.faintText,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  greeting: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  bellButton: {
    backgroundColor: colors.card,
    position: "relative",
    ...shadows.card,
  },
  notificationDot: {
    backgroundColor: colors.primaryHot,
    borderColor: colors.card,
    borderRadius: 5,
    borderWidth: 1,
    height: 9,
    position: "absolute",
    right: 9,
    top: 9,
    width: 9,
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroPhoto: {
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: radius.lg,
    borderWidth: 2,
    height: 86,
    width: 86,
  },
  heroCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  nameRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  dogName: {
    color: colors.card,
    fontSize: 24,
    fontWeight: "900",
  },
  breedPill: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 999,
    color: colors.card,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  heroMeta: {
    color: "rgba(255,255,255,0.86)",
    fontSize: 13,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: "48%",
  },
  statusTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  statusIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  statusSymbol: {
    fontSize: 18,
  },
  statusDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  statusLabel: {
    color: colors.faintText,
    fontSize: 12,
    fontWeight: "800",
  },
  statusValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 2,
  },
  statusMember: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 2,
  },
  helpText: {
    color: colors.faintText,
    fontSize: 12,
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickButton: {
    alignItems: "center",
    borderRadius: radius.lg,
    minHeight: 82,
    justifyContent: "center",
    padding: spacing.sm,
    width: "31.8%",
  },
  quickSymbol: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: "800",
  },
  recentList: {
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
});
