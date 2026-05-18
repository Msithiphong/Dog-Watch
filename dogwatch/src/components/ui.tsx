import { PropsWithChildren, ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, shadows, spacing } from "@/design/tokens";

export function Screen({
  children,
  scroll = false,
  contentStyle,
}: PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

export function Card({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, shadows.card, style]}>{children}</View>;
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{title}</Text>
      {action}
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  style,
  textColor = colors.card,
  accessibilityLabel,
}: {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.primaryButtonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

export function TextButton({
  title,
  onPress,
  color = colors.primary,
  style,
}: {
  title: string;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress}>
      <Text style={[styles.textButton, { color }, style]}>{title}</Text>
    </Pressable>
  );
}

export function IconButton({
  children,
  onPress,
  label,
  style,
}: PropsWithChildren<{
  onPress?: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
}>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  );
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segmented}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={option.label}
            onPress={() => onChange(option.value)}
            style={[styles.segment, isActive && styles.segmentActive]}
          >
            <Text
              style={[
                styles.segmentText,
                isActive ? styles.segmentTextActive : styles.segmentTextInactive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Toggle({
  enabled,
  onPress,
  label,
}: {
  enabled: boolean;
  onPress?: () => void;
  label: string;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: enabled }}
      onPress={onPress}
      style={[styles.toggle, { backgroundColor: enabled ? colors.primary : colors.border }]}
    >
      <View style={[styles.toggleKnob, enabled && styles.toggleKnobOn]} />
    </Pressable>
  );
}

export function Avatar({
  label,
  color = colors.primaryDark,
  background = colors.amberSoft,
  size = 48,
}: {
  label: string;
  color?: string;
  background?: string;
  size?: number;
}) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: Math.min(radius.lg, size / 3),
          backgroundColor: background,
        },
      ]}
    >
      <Text style={[styles.avatarText, { color, fontSize: Math.max(11, size * 0.32) }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitleText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: spacing.xl,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  textButton: {
    fontSize: 14,
    fontWeight: "700",
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.softBorder,
    borderRadius: 18,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
  segmented: {
    backgroundColor: colors.softBorder,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xs,
  },
  segment: {
    alignItems: "center",
    borderRadius: radius.md,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  segmentActive: {
    backgroundColor: colors.card,
    ...shadows.card,
  },
  segmentText: {
    fontSize: 14,
  },
  segmentTextActive: {
    color: colors.text,
    fontWeight: "700",
  },
  segmentTextInactive: {
    color: colors.mutedText,
    fontWeight: "500",
  },
  toggle: {
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    paddingHorizontal: 3,
    width: 52,
  },
  toggleKnob: {
    backgroundColor: colors.card,
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  toggleKnobOn: {
    transform: [{ translateX: 24 }],
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontWeight: "800",
  },
});
