import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { Avatar, Card, Screen } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";

interface SettingsScreenProps {
  onLogout: () => void;
}

const sections = [
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        sub: "Alex · alex@example.com",
        value: "Edit",
        icon: { ios: "person.fill", android: "person" },
        fallback: "U",
      },
      {
        label: "Notifications",
        sub: "Push, reminders and alerts",
        value: "Manage",
        icon: { ios: "bell.fill", android: "notifications" },
        fallback: "B",
      },
    ],
  },
  {
    title: "Luna",
    items: [
      {
        label: "Dog Profile",
        sub: "Luna · Golden Retriever",
        value: "Edit",
        icon: { ios: "heart.fill", android: "favorite" },
        fallback: "D",
      },
      {
        label: "Feeding Schedule",
        sub: "7:30 AM and 6:00 PM",
        value: "Edit",
        icon: { ios: "bell.fill", android: "notifications" },
        fallback: "F",
      },
    ],
  },
  {
    title: "App",
    items: [
      {
        label: "Dark Mode",
        value: "Off",
        icon: { ios: "moon.fill", android: "dark_mode" },
        fallback: "M",
      },
      {
        label: "Privacy",
        value: "View",
        icon: { ios: "shield.fill", android: "shield" },
        fallback: "S",
      },
      {
        label: "Help & Support",
        sub: "FAQs, contact us",
        icon: { ios: "questionmark.circle.fill", android: "help" },
        fallback: "?",
      },
    ],
  },
] as const;

export function SettingsScreen({ onLogout }: SettingsScreenProps) {
  return (
    <Screen scroll>
      <Text style={styles.title}>Settings</Text>

      <Card style={styles.profileCard}>
        <Avatar label="AL" />
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>Alex</Text>
          <Text style={styles.profileEmail}>alex@example.com</Text>
          <Text style={styles.profileMeta}>Admin · Luna Household</Text>
        </View>
        <AppIcon
          name={{ ios: "chevron.right", android: "chevron_right" }}
          fallback=">"
          color={colors.faintText}
          size={16}
        />
      </Card>

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Card style={styles.sectionCard}>
            {section.items.map((item, index) => (
              <SettingRow
                key={item.label}
                item={item}
                isLast={index === section.items.length - 1}
              />
            ))}
          </Card>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Household</Text>
        <Card style={styles.sectionCard}>
          <DangerRow
            label="Leave Household"
            icon={{ ios: "trash.fill", android: "delete" }}
            fallback="!"
          />
          <DangerRow
            label="Log Out"
            icon={{ ios: "rectangle.portrait.and.arrow.right", android: "logout" }}
            fallback="L"
            onPress={onLogout}
            isLast
          />
        </Card>
      </View>

      <Text style={styles.version}>Dog Watch v1.0.0</Text>
    </Screen>
  );
}

function SettingRow({
  item,
  isLast,
}: {
  item: (typeof sections)[number]["items"][number];
  isLast: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.label}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowDivider,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.rowIcon}>
        <AppIcon name={item.icon} fallback={item.fallback} color={colors.text} size={16} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowLabel}>{item.label}</Text>
        {"sub" in item && item.sub ? <Text style={styles.rowSub}>{item.sub}</Text> : null}
      </View>
      {"value" in item && item.value ? (
        <Text style={styles.rowValue}>{item.value}</Text>
      ) : null}
      <AppIcon
        name={{ ios: "chevron.right", android: "chevron_right" }}
        fallback=">"
        color={colors.faintText}
        size={14}
      />
    </Pressable>
  );
}

function DangerRow({
  label,
  icon,
  fallback,
  onPress,
  isLast = false,
}: {
  label: string;
  icon: { ios: string; android: string };
  fallback: string;
  onPress?: () => void;
  isLast?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowDivider,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.rowIcon, styles.dangerIcon]}>
        <AppIcon name={icon} fallback={fallback} color={colors.danger} size={16} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.dangerText}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: spacing.lg,
  },
  profileCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  profileCopy: {
    flex: 1,
  },
  profileName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  profileEmail: {
    color: colors.mutedText,
    fontSize: 13,
    marginTop: 2,
  },
  profileMeta: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "800",
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.faintText,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.7,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
    textTransform: "uppercase",
  },
  sectionCard: {
    padding: 0,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 62,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderBottomColor: colors.softBorder,
    borderBottomWidth: 1,
  },
  rowIcon: {
    alignItems: "center",
    backgroundColor: colors.softBorder,
    borderRadius: radius.md,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  dangerIcon: {
    backgroundColor: "#FEF2F2",
  },
  rowCopy: {
    flex: 1,
  },
  rowLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  rowSub: {
    color: colors.faintText,
    fontSize: 12,
    marginTop: 2,
  },
  rowValue: {
    color: colors.faintText,
    fontSize: 13,
    fontWeight: "700",
  },
  dangerText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "800",
  },
  version: {
    color: "#D1D0CF",
    fontSize: 12,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.72,
  },
});
