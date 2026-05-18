import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AppIcon } from "@/components/AppIcon";
import { IconButton, PrimaryButton, Screen, SegmentedControl, TextButton } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";

interface AuthScreenProps {
  onBack: () => void;
  onAuth: () => void;
}

export function AuthScreen({ onBack, onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Screen scroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <IconButton label="Back" onPress={onBack}>
            <AppIcon
              name={{ ios: "arrow.left", android: "arrow_back" }}
              fallback="<"
              color={colors.text}
              size={18}
            />
          </IconButton>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <AppIcon
                name={{ ios: "pawprint.fill", android: "pets" }}
                fallback="P"
                color={colors.card}
                size={15}
              />
            </View>
            <Text style={styles.brandText}>Dog Watch</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            {mode === "login" ? "Welcome back!" : "Create account"}
          </Text>
          <Text style={styles.subtitle}>
            {mode === "login"
              ? "Sign in to check on Luna"
              : "Join your household to start tracking Luna's care"}
          </Text>
        </View>

        <SegmentedControl
          value={mode}
          options={[
            { label: "Log In", value: "login" },
            { label: "Sign Up", value: "signup" },
          ]}
          onChange={setMode}
        />

        <View style={styles.form}>
          {mode === "signup" && (
            <Field
              label="Your Name"
              value={name}
              onChangeText={setName}
              placeholder="Alex"
            />
          )}
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <View>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={colors.faintText}
                secureTextEntry={!showPassword}
                style={[styles.input, styles.passwordInput]}
                value={password}
              />
              <IconButton
                label="Toggle password visibility"
                onPress={() => setShowPassword((value) => !value)}
                style={styles.passwordButton}
              >
                <AppIcon
                  name={{
                    ios: showPassword ? "eye.slash.fill" : "eye.fill",
                    android: showPassword ? "visibility_off" : "visibility",
                  }}
                  fallback={showPassword ? "Hide" : "Show"}
                  color={colors.faintText}
                  size={18}
                />
              </IconButton>
            </View>
          </View>

          {mode === "login" && <TextButton title="Forgot password?" style={styles.forgot} />}

          <PrimaryButton
            title={mode === "login" ? "Sign In" : "Create Account"}
            onPress={onAuth}
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        <PrimaryButton
          title="Continue with Google"
          onPress={onAuth}
          style={styles.googleButton}
          textColor={colors.text}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address";
}) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize="none"
        keyboardType={keyboardType}
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
  container: {
    flex: 1,
    gap: spacing.xl,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brand: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  brandText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  headerSpacer: {
    width: 40,
  },
  titleBlock: {
    gap: spacing.xs,
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
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  passwordWrap: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 58,
  },
  passwordButton: {
    backgroundColor: "transparent",
    position: "absolute",
    right: spacing.sm,
    top: 6,
  },
  forgot: {
    alignSelf: "flex-end",
  },
  divider: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  line: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: colors.faintText,
    fontSize: 13,
  },
  googleButton: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
});
