import { Platform, StyleSheet } from "react-native";

export const colors = {
  appBackground: "#E8E0D8",
  surface: "#FFFAF5",
  card: "#FFFFFF",
  text: "#1C1917",
  mutedText: "#78716C",
  faintText: "#A8A29E",
  border: "#E7E5E4",
  softBorder: "#F5F5F4",
  primary: "#F59E0B",
  primaryDark: "#D97706",
  primaryHot: "#F97316",
  success: "#22C55E",
  info: "#3B82F6",
  danger: "#EF4444",
  purple: "#8B5CF6",
  pink: "#EC4899",
  greenSoft: "#F0FDF4",
  blueSoft: "#EFF6FF",
  amberSoft: "#FEF3C7",
  amberLight: "#FFF7ED",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const shadows = StyleSheet.create({
  card:
    Platform.OS === "web"
      ? {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }
      : {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        },
  lifted:
    Platform.OS === "web"
      ? {
          boxShadow: "0 8px 18px rgba(0,0,0,0.16)",
        }
      : {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.16,
          shadowRadius: 18,
          elevation: 6,
        },
});
