import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { Avatar, Card, Screen, SectionTitle } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";
import { Activity, Member } from "@/types/dogwatch";
import { ACTION_CONFIG, getMemberStats } from "@/utils/activity";
import { formatRelativeTime } from "@/utils/dates";

interface HouseholdMembersScreenProps {
  members: Member[];
  activities: Activity[];
  dogName: string;
}

const MEMBER_COLORS: Record<string, { bg: string; color: string }> = {
  Alex: { bg: colors.amberSoft, color: colors.primaryDark },
  Maya: { bg: "#F5F3FF", color: "#7C3AED" },
  Jordan: { bg: colors.blueSoft, color: "#2563EB" },
};

export function HouseholdMembersScreen({
  members,
  activities,
  dogName,
}: HouseholdMembersScreenProps) {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Household</Text>
          <Text style={styles.subtitle}>Care team for {dogName}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Invite household member"
          style={({ pressed }) => [styles.inviteButton, pressed && styles.pressed]}
        >
          <AppIcon
            name={{ ios: "person.badge.plus", android: "person_add" }}
            fallback="+"
            color={colors.primaryDark}
            size={15}
          />
          <Text style={styles.inviteText}>Invite</Text>
        </Pressable>
      </View>

      <Card style={styles.inviteCard}>
        <View style={styles.shareIcon}>
          <AppIcon
            name={{ ios: "square.and.arrow.up", android: "share" }}
            fallback="S"
            color={colors.card}
            size={18}
          />
        </View>
        <View style={styles.inviteCopy}>
          <Text style={styles.inviteLabel}>Invite Code</Text>
          <Text style={styles.inviteCode}>LUNA-24</Text>
        </View>
        <Text style={styles.copyPill}>Copy</Text>
      </Card>

      <View style={styles.members}>
        {members.map((member) => {
          const palette = MEMBER_COLORS[member.name] ?? {
            bg: colors.softBorder,
            color: colors.mutedText,
          };
          const stats = getMemberStats(activities, member);

          return (
            <Card key={member.id} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <Avatar
                  label={member.avatar}
                  background={palette.bg}
                  color={palette.color}
                />
                <View style={styles.memberCopy}>
                  <View style={styles.memberNameRow}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    {member.role === "admin" ? (
                      <AppIcon
                        name={{ ios: "crown.fill", android: "crown" }}
                        fallback="A"
                        color={colors.primary}
                        size={14}
                      />
                    ) : null}
                  </View>
                  <Text style={styles.memberMeta}>
                    Active {formatRelativeTime(member.lastActive)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.rolePill,
                    member.role === "admin" ? styles.roleAdmin : styles.roleMember,
                  ]}
                >
                  {member.role === "admin" ? "Admin" : "Member"}
                </Text>
              </View>

              <View style={styles.statGrid}>
                <Stat label="Today" value={`${stats.todayCount} logs`} />
                <Stat label="Total" value={`${stats.total} logs`} />
                <Stat
                  label="Last log"
                  value={stats.last ? formatRelativeTime(stats.last.timestamp) : "None"}
                />
              </View>

              {stats.last ? (
                <View style={styles.recentBlock}>
                  <Text style={styles.recentLabel}>RECENT</Text>
                  <View style={styles.recentPills}>
                    {activities
                      .filter((activity) => activity.member === member.name)
                      .slice(0, 3)
                      .map((activity) => {
                        const config = ACTION_CONFIG[activity.type];
                        return (
                          <Text
                            key={activity.id}
                            style={[
                              styles.activityPill,
                              {
                                backgroundColor: config.bg,
                                color: config.color,
                              },
                            ]}
                          >
                            {config.label} · {formatRelativeTime(activity.timestamp)}
                          </Text>
                        );
                      })}
                  </View>
                </View>
              ) : null}
            </Card>
          );
        })}
      </View>

      <SectionTitle title="Who's been helping?" />
      <Card style={styles.chart}>
        {members.map((member) => {
          const palette = MEMBER_COLORS[member.name] ?? {
            bg: colors.softBorder,
            color: colors.mutedText,
          };
          const stats = getMemberStats(activities, member);

          return (
            <View key={member.id} style={styles.chartRow}>
              <View style={styles.chartMeta}>
                <Avatar
                  label={member.avatar.charAt(0)}
                  background={palette.bg}
                  color={palette.color}
                  size={24}
                />
                <Text style={styles.chartName}>{member.name}</Text>
                <Text style={styles.chartCount}>
                  {stats.total} ({stats.contributionPercent}%)
                </Text>
              </View>
              <View style={styles.track}>
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: palette.color,
                      width: `${stats.contributionPercent}%`,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </Card>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
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
  subtitle: {
    color: colors.mutedText,
    fontSize: 14,
    marginTop: 2,
  },
  inviteButton: {
    alignItems: "center",
    backgroundColor: colors.amberSoft,
    borderRadius: 999,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inviteText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "800",
  },
  inviteCard: {
    alignItems: "center",
    backgroundColor: "#FFF8F2",
    borderColor: "#FDE68A",
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  shareIcon: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  inviteCopy: {
    flex: 1,
  },
  inviteLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  inviteCode: {
    color: colors.primaryDark,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 2,
  },
  copyPill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    color: colors.card,
    fontSize: 13,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  members: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  memberCard: {
    gap: spacing.md,
  },
  memberHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  memberCopy: {
    flex: 1,
  },
  memberNameRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  memberName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  memberMeta: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 2,
  },
  rolePill: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  roleAdmin: {
    backgroundColor: colors.amberSoft,
    color: colors.primaryDark,
  },
  roleMember: {
    backgroundColor: colors.softBorder,
    color: colors.mutedText,
  },
  statGrid: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#F9F8F7",
    borderRadius: radius.md,
    flex: 1,
    padding: spacing.sm,
  },
  statLabel: {
    color: colors.faintText,
    fontSize: 11,
    fontWeight: "800",
  },
  statValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2,
  },
  recentBlock: {
    borderTopColor: colors.softBorder,
    borderTopWidth: 1,
    paddingTop: spacing.md,
  },
  recentLabel: {
    color: colors.faintText,
    fontSize: 11,
    fontWeight: "900",
    marginBottom: spacing.sm,
  },
  recentPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  activityPill: {
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chart: {
    gap: spacing.md,
  },
  chartRow: {
    gap: spacing.sm,
  },
  chartMeta: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  chartName: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
  },
  chartCount: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: "700",
  },
  track: {
    backgroundColor: colors.softBorder,
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  bar: {
    borderRadius: 999,
    height: "100%",
  },
  pressed: {
    opacity: 0.72,
  },
});
