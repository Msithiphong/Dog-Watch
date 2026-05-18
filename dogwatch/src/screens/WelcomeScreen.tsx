import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { Card, PrimaryButton, Screen } from "@/components/ui";
import { colors, radius, shadows, spacing } from "@/design/tokens";
import { Dog } from "@/types/dogwatch";

interface WelcomeScreenProps {
  dog: Dog;
  onGetStarted: () => void;
}

const FEATURES = [
  {
    icon: { ios: "pawprint.fill", android: "pets" },
    fallback: "P",
    color: colors.primaryHot,
    bg: colors.amberLight,
    text: "Log meals, walks, medicine, and notes in one tap",
  },
  {
    icon: { ios: "person.2.fill", android: "group" },
    fallback: "T",
    color: colors.purple,
    bg: "#F5F3FF",
    text: "Coordinate care with everyone in the household",
  },
  {
    icon: { ios: "bell.fill", android: "notifications" },
    fallback: "B",
    color: colors.info,
    bg: colors.blueSoft,
    text: "Keep shared reminders visible for the whole team",
  },
  {
    icon: { ios: "heart.fill", android: "favorite" },
    fallback: "H",
    color: colors.pink,
    bg: "#FDF2F8",
    text: "Build a simple care history for every dog day",
  },
] as const;

export function WelcomeScreen({ dog, onGetStarted }: WelcomeScreenProps) {
  return (
    <Screen scroll contentStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.photoWrap}>
          <Image
            accessibilityLabel={`${dog.name} profile photo`}
            source={{ uri: dog.photo }}
            style={styles.photo}
            contentFit="cover"
          />
          <View style={styles.badge}>
            <AppIcon
              name={{ ios: "pawprint.fill", android: "pets" }}
              fallback="P"
              color={colors.card}
              size={20}
            />
          </View>
        </View>

        <Text style={styles.title}>Dog Watch</Text>
        <Text style={styles.subtitle}>Shared care for your beloved pup</Text>
      </View>

      <View style={styles.features}>
        {FEATURES.map((feature) => (
          <Card key={feature.text} style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: feature.bg }]}>
              <AppIcon
                name={feature.icon}
                fallback={feature.fallback}
                color={feature.color}
                size={18}
              />
            </View>
            <Text style={styles.featureText}>{feature.text}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Get Started" onPress={onGetStarted} />
        <Text style={styles.footerText}>Free for you and your household</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  hero: {
    alignItems: "center",
    paddingTop: spacing.xxxl,
  },
  photoWrap: {
    marginBottom: spacing.xl,
    position: "relative",
  },
  photo: {
    borderColor: colors.card,
    borderRadius: 72,
    borderWidth: 4,
    height: 132,
    width: 132,
    ...shadows.lifted,
  },
  badge: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.card,
    borderRadius: 22,
    borderWidth: 2,
    bottom: 0,
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    width: 44,
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    marginTop: spacing.xs,
  },
  features: {
    gap: spacing.md,
    marginVertical: spacing.xxxl,
  },
  featureCard: {
    alignItems: "center",
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  featureIcon: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  featureText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  footerText: {
    color: colors.faintText,
    fontSize: 13,
    textAlign: "center",
  },
});
