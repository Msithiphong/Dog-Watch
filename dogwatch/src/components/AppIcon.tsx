import { SymbolView, SymbolViewProps } from "expo-symbols";
import { Text, ViewStyle } from "react-native";

import { colors } from "@/design/tokens";

interface AppIconProps {
  name:
    | SymbolViewProps["name"]
    | {
        ios?: string;
        android?: string;
        web?: string;
      };
  fallback: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
}

export function AppIcon({
  name,
  fallback,
  color = colors.text,
  size = 20,
  style,
}: AppIconProps) {
  return (
    <SymbolView
      name={name as SymbolViewProps["name"]}
      size={size}
      tintColor={color}
      style={style}
      fallback={
        <Text
          style={{
            color,
            fontSize: Math.max(12, size * 0.72),
            fontWeight: "700",
            lineHeight: size,
            textAlign: "center",
          }}
        >
          {fallback}
        </Text>
      }
    />
  );
}
