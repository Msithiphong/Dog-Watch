import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { Card, IconButton, Screen, Toggle } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";
import { Reminder } from "@/types/dogwatch";
import { ACTION_CONFIG } from "@/utils/activity";

interface RemindersScreenProps {
  reminders: Reminder[];
  dogName: string;
  onBack: () => void;
  onToggle: (id: string) => void;
}

const SUGGESTED_REMINDERS = [
  { label: "Bedtime bathroom break", time: "10:00 PM", color: colors.purple },
  { label: "Weekly weigh-in", time: "Sunday 10:00 AM", color: colors.info },
  { label: "Monthly grooming", time: "1st of month", color: colors.pink },
];

export function RemindersScreen({
  reminders,
  dogName,
  onBack,
  onToggle,
}: RemindersScreenProps) {
  const activeCount = reminders.filter((reminder) => reminder.enabled).length;

  return (
    <Screen scroll>
      <View style={styles.header}>
        <IconButton label="Back" onPress={onBack}>
          <AppIcon
            name={{ ios: "arrow.left", android: "arrow_back" }}
            fallback="<"
            color={colors.text}
            size={18}
          />
        </IconButton>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Reminders</Text>
          <Text style={styles.subtitle}>
            {activeCount} active reminders for {dogName}
          </Text>
        </View>
        <IconButton label="Add reminder" style={styles.addButton}>
          <AppIcon
            name={{ ios: "plus", android: "add" }}
            fallback="+"
            color={colors.card}
            size={18}
          />
        </IconButton>
      </View>

      <Card style={styles.summary}>
        <View style={styles.summaryIcon}>
          <AppIcon
            name={{ ios: "bell.fill", android: "notifications" }}
            fallback="B"
            color={colors.card}
            size={18}
          />
        </View>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryTitle}>
            Reminders help the whole team stay on schedule
          </Text>
          <Text style={styles.summarySub}>
            All household members receive these notifications
          </Text>
        </View>
      </Card>

      <View style={styles.list}>
        {reminders.map((reminder) => {
          const config = ACTION_CONFIG[reminder.type];
          return (
            <Card
              key={reminder.id}
              style={[styles.reminderCard, !reminder.enabled && styles.disabledCard]}
            >
              <View style={[styles.reminderIcon, { backgroundColor: config.bg }]}>
                <Text style={styles.reminderSymbol}>{config.symbol}</Text>
              </View>
              <View style={styles.reminderCopy}>
                <Text style={styles.reminderLabel}>{reminder.label}</Text>
                <Text style={styles.reminderMeta}>
                  <Text style={{ color: config.color, fontWeight: "900" }}>
                    {reminder.time}
                  </Text>
                  {" · "}
                  {reminder.days.length === 7 ? "Every day" : reminder.days.join(", ")}
                </Text>
              </View>
              <Toggle
                enabled={reminder.enabled}
                label={`Toggle ${reminder.label}`}
                onPress={() => onToggle(reminder.id)}
              />
            </Card>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Suggested Reminders</Text>
      <View style={styles.suggestions}>
        {SUGGESTED_REMINDERS.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={`Suggested reminder ${item.label}`}
            style={({ pressed }) => [styles.suggestion, pressed && styles.pressed]}
          >
            <View style={[styles.suggestDot, { backgroundColor: `${item.color}18` }]}>
              <Text style={[styles.suggestDotText, { color: item.color }]}>+</Text>
            </View>
            <View style={styles.suggestionCopy}>
              <Text style={styles.suggestionTitle}>{item.label}</Text>
              <Text style={styles.suggestionTime}>{item.time}</Text>
            </View>
            <AppIcon
              name={{ ios: "plus", android: "add" }}
              fallback="+"
              color={colors.mutedText}
              size={16}
            />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  summary: {
    alignItems: "center",
    backgroundColor: colors.blueSoft,
    borderColor: "#BFDBFE",
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryIcon: {
    alignItems: "center",
    backgroundColor: colors.info,
    borderRadius: radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  summaryCopy: {
    flex: 1,
  },
  summaryTitle: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "800",
  },
  summarySub: {
    color: "#2563EB",
    fontSize: 12,
    marginTop: 2,
  },
  list: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  reminderCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  disabledCard: {
    opacity: 0.58,
  },
  reminderIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  reminderSymbol: {
    fontSize: 19,
  },
  reminderCopy: {
    flex: 1,
  },
  reminderLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  reminderMeta: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: spacing.md,
  },
  suggestions: {
    gap: spacing.sm,
  },
  suggestion: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  suggestDot: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  suggestDotText: {
    fontSize: 20,
    fontWeight: "900",
  },
  suggestionCopy: {
    flex: 1,
  },
  suggestionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  suggestionTime: {
    color: colors.faintText,
    fontSize: 12,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.72,
  },
});
