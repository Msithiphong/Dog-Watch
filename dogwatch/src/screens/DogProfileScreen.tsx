import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { Card, Screen, SectionTitle } from "@/components/ui";
import { colors, radius, shadows, spacing } from "@/design/tokens";
import { Activity, ActivityType, Dog } from "@/types/dogwatch";
import { ACTION_CONFIG, countActivitiesToday, getLastActivity } from "@/utils/activity";
import { formatRelativeTime } from "@/utils/dates";

interface DogProfileScreenProps {
  dog: Dog;
  activities: Activity[];
  onLogAction: () => void;
}

const STAT_TYPES: ActivityType[] = ["fed", "walked", "medicine", "bathroom", "groomed"];

export function DogProfileScreen({
  dog,
  activities,
  onLogAction,
}: DogProfileScreenProps) {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title}>Dog Profile</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit dog profile"
          style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
        >
          <AppIcon
            name={{ ios: "pencil", android: "edit" }}
            fallback="E"
            color={colors.primaryDark}
            size={14}
          />
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <View style={styles.profile}>
        <Image
          accessibilityLabel={`${dog.name} profile photo`}
          source={{ uri: dog.photo }}
          style={styles.photo}
          contentFit="cover"
        />
        <Text style={styles.name}>{dog.name}</Text>
        <Text style={styles.breed}>{dog.breed}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Log activity from profile"
          onPress={onLogAction}
          style={({ pressed }) => [styles.logButton, pressed && styles.pressed]}
        >
          <Text style={styles.logText}>+ Log Activity</Text>
        </Pressable>
      </View>

      <View style={styles.infoGrid}>
        <InfoCard
          label="Birthday"
          value="Mar 12, 2022"
          icon={{ ios: "calendar", android: "calendar_month" }}
          fallback="C"
          color={colors.pink}
        />
        <InfoCard
          label="Age"
          value={dog.age}
          icon={{ ios: "dog.fill", android: "pets" }}
          fallback="D"
          color={colors.purple}
        />
        <InfoCard
          label="Weight"
          value={dog.weight}
          icon={{ ios: "scalemass.fill", android: "scale" }}
          fallback="W"
          color={colors.info}
        />
      </View>

      <SectionTitle title="Today's Care" />
      <Card style={styles.careList}>
        {STAT_TYPES.map((type, index) => {
          const config = ACTION_CONFIG[type];
          const last = getLastActivity(activities, type);
          const count = countActivitiesToday(activities, type);

          return (
            <View
              key={type}
              style={[
                styles.careRow,
                index < STAT_TYPES.length - 1 && styles.careDivider,
              ]}
            >
              <View style={[styles.careIcon, { backgroundColor: config.bg }]}>
                <Text style={styles.careSymbol}>{config.symbol}</Text>
              </View>
              <View style={styles.careText}>
                <Text style={styles.careLabel}>{config.label}</Text>
                <Text style={styles.careMeta}>
                  {last
                    ? `Last: ${formatRelativeTime(last.timestamp)} by ${last.member}`
                    : "Not yet today"}
                </Text>
              </View>
              <Text
                style={[
                  styles.countPill,
                  {
                    backgroundColor: count > 0 ? config.bg : colors.softBorder,
                    color: count > 0 ? config.color : colors.faintText,
                  },
                ]}
              >
                {count}x today
              </Text>
            </View>
          );
        })}
      </Card>

      <SectionTitle title={`About ${dog.name}`} />
      <Card style={styles.about}>
        <Text style={styles.aboutText}>{dog.about}</Text>
        <View style={styles.tags}>
          {dog.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

function InfoCard({
  label,
  value,
  icon,
  fallback,
  color,
}: {
  label: string;
  value: string;
  icon: { ios: string; android: string };
  fallback: string;
  color: string;
}) {
  return (
    <Card style={styles.infoCard}>
      <View style={[styles.infoIcon, { backgroundColor: `${color}18` }]}>
        <AppIcon name={icon} fallback={fallback} color={color} size={16} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
  },
  editButton: {
    alignItems: "center",
    backgroundColor: colors.amberSoft,
    borderRadius: 999,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  editText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "800",
  },
  profile: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  photo: {
    borderColor: colors.card,
    borderRadius: 60,
    borderWidth: 4,
    height: 116,
    width: 116,
    ...shadows.lifted,
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "900",
    marginTop: spacing.md,
  },
  breed: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 2,
  },
  logButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  logText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: "800",
  },
  infoGrid: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  infoCard: {
    alignItems: "center",
    flex: 1,
    padding: spacing.md,
  },
  infoIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 32,
    justifyContent: "center",
    marginBottom: spacing.sm,
    width: 32,
  },
  infoLabel: {
    color: colors.faintText,
    fontSize: 11,
    fontWeight: "800",
  },
  infoValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2,
    textAlign: "center",
  },
  careList: {
    marginBottom: spacing.xl,
    padding: 0,
  },
  careRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
  },
  careDivider: {
    borderBottomColor: colors.softBorder,
    borderBottomWidth: 1,
  },
  careIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  careSymbol: {
    fontSize: 19,
  },
  careText: {
    flex: 1,
  },
  careLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  careMeta: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 2,
  },
  countPill: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  about: {
    gap: spacing.md,
  },
  aboutText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.amberSoft,
    borderRadius: 999,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  pressed: {
    opacity: 0.72,
  },
});
