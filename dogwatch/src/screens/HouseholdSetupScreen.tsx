import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { Card, IconButton, PrimaryButton, Screen, SegmentedControl } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";
import { Dog } from "@/types/dogwatch";

interface HouseholdSetupScreenProps {
  dog: Dog;
  onBack: () => void;
  onJoin: () => void;
}

export function HouseholdSetupScreen({
  dog,
  onBack,
  onJoin,
}: HouseholdSetupScreenProps) {
  const [tab, setTab] = useState<"join" | "create">("join");
  const [code, setCode] = useState("");
  const [householdName, setHouseholdName] = useState("");
  const [dogName, setDogName] = useState("");

  return (
    <Screen scroll>
      <IconButton label="Back" onPress={onBack}>
        <AppIcon
          name={{ ios: "arrow.left", android: "arrow_back" }}
          fallback="<"
          color={colors.text}
          size={18}
        />
      </IconButton>

      <View style={styles.titleBlock}>
        <View style={styles.houseIcon}>
          <AppIcon
            name={{ ios: "house.fill", android: "home" }}
            fallback="H"
            color={colors.primary}
            size={28}
          />
        </View>
        <Text style={styles.title}>Your Household</Text>
        <Text style={styles.subtitle}>
          Set up shared dog care with your roommates or family
        </Text>
      </View>

      <SegmentedControl
        value={tab}
        options={[
          { label: "Join Existing", value: "join" },
          { label: "Create New", value: "create" },
        ]}
        onChange={setTab}
      />

      {tab === "join" ? (
        <View style={styles.form}>
          <Card style={styles.hint}>
            <Text style={styles.hintText}>
              Ask a household member for the invite code, then enter it below.
            </Text>
          </Card>
          <Field
            label="Invite Code"
            value={code}
            onChangeText={(value) => setCode(value.toUpperCase())}
            placeholder="LUNA-24"
          />

          <Text style={styles.eyebrow}>Or tap to use demo</Text>
          <Card style={styles.demoCard}>
            <Image source={{ uri: dog.photo }} style={styles.demoPhoto} contentFit="cover" />
            <View style={styles.demoText}>
              <Text style={styles.demoTitle}>{dog.name} Household</Text>
              <Text style={styles.demoSub}>Alex, Maya and Jordan · Code: LUNA-24</Text>
            </View>
            <IconButton label="Use demo household" onPress={onJoin} style={styles.demoAction}>
              <AppIcon
                name={{ ios: "chevron.right", android: "chevron_right" }}
                fallback=">"
                color={colors.faintText}
                size={16}
              />
            </IconButton>
          </Card>

          <PrimaryButton title="Join Household" onPress={onJoin} />
        </View>
      ) : (
        <View style={styles.form}>
          <Field
            label="Household Name"
            value={householdName}
            onChangeText={setHouseholdName}
            placeholder="Sunset Ave Crew"
          />
          <Field
            label="Dog's Name"
            value={dogName}
            onChangeText={setDogName}
            placeholder={dog.name}
          />
          <Card style={styles.successHint}>
            <Text style={styles.successText}>
              After creating, you will get a shareable invite code.
            </Text>
          </Card>
          <PrimaryButton title="Create Household" onPress={onJoin} />
        </View>
      )}
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.faintText}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    gap: spacing.sm,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  houseIcon: {
    alignItems: "center",
    backgroundColor: colors.amberSoft,
    borderRadius: radius.lg,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  hint: {
    backgroundColor: colors.amberSoft,
    borderColor: "#FDE68A",
    borderWidth: 1,
  },
  hintText: {
    color: "#92400E",
    fontSize: 14,
    lineHeight: 20,
  },
  successHint: {
    backgroundColor: colors.greenSoft,
    borderColor: "#BBF7D0",
    borderWidth: 1,
  },
  successText: {
    color: "#166534",
    fontSize: 14,
    lineHeight: 20,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  eyebrow: {
    color: colors.faintText,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  demoCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  demoPhoto: {
    borderRadius: radius.md,
    height: 46,
    width: 46,
  },
  demoText: {
    flex: 1,
  },
  demoTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  demoSub: {
    color: colors.mutedText,
    fontSize: 12,
    marginTop: 2,
  },
  demoAction: {
    backgroundColor: "transparent",
  },
});
