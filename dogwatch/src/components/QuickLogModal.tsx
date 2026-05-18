import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Card, IconButton, PrimaryButton } from "@/components/ui";
import { colors, radius, spacing } from "@/design/tokens";
import { ACTIVITY_TYPES, ActivityType } from "@/types/dogwatch";
import { ACTION_CONFIG } from "@/utils/activity";

interface QuickLogModalProps {
  visible: boolean;
  initialType?: ActivityType;
  dogName: string;
  memberName: string;
  onClose: () => void;
  onLog: (type: ActivityType, note?: string) => void;
}

export function QuickLogModal({
  visible,
  initialType,
  dogName,
  memberName,
  onClose,
  onLog,
}: QuickLogModalProps) {
  const [selectedType, setSelectedType] = useState<ActivityType>(initialType ?? "fed");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (visible) {
      setSelectedType(initialType ?? "fed");
      setNote("");
    }
  }, [initialType, visible]);

  const selectedConfig = ACTION_CONFIG[selectedType];
  const logLabel =
    selectedType === "note"
      ? `Log Note for ${dogName}`
      : `Log ${selectedConfig.label} for ${dogName}`;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet} testID="quick-log-modal">
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Log for {dogName}</Text>
            <IconButton label="Close quick log" onPress={onClose}>
              <Text style={styles.closeText}>x</Text>
            </IconButton>
          </View>

          <View style={styles.typeGrid}>
            {ACTIVITY_TYPES.map((type) => {
              const config = ACTION_CONFIG[type];
              const isSelected = type === selectedType;
              return (
                <Pressable
                  key={type}
                  accessibilityRole="button"
                  accessibilityLabel={`Choose ${config.label}`}
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedType(type)}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor: isSelected ? config.lightBg : colors.softBorder,
                      borderColor: isSelected ? config.color : "transparent",
                    },
                  ]}
                >
                  <Text style={styles.typeSymbol}>{config.symbol}</Text>
                  <Text
                    style={[
                      styles.typeLabel,
                      { color: isSelected ? config.color : colors.mutedText },
                    ]}
                  >
                    {config.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Card
            style={[
              styles.preview,
              {
                backgroundColor: selectedConfig.bg,
                borderColor: selectedConfig.lightBg,
              },
            ]}
          >
            <Text style={styles.previewSymbol}>{selectedConfig.symbol}</Text>
            <View>
              <Text style={[styles.previewTitle, { color: selectedConfig.color }]}>
                {selectedType === "note"
                  ? "Adding a note"
                  : `${selectedConfig.label} ${dogName}`}
              </Text>
              <Text style={styles.previewMeta}>by {memberName} · just now</Text>
            </View>
          </Card>

          <Text style={styles.label}>Add a note (optional)</Text>
          <TextInput
            accessibilityLabel="Quick log note"
            multiline
            onChangeText={setNote}
            placeholder={
              selectedType === "fed"
                ? "e.g. 1 cup dry food"
                : selectedType === "walked"
                  ? "e.g. 20 min walk"
                  : selectedType === "medicine"
                    ? "e.g. Heartworm pill"
                    : selectedType === "bathroom"
                      ? "e.g. Backyard break"
                      : selectedType === "groomed"
                        ? "e.g. Full brush and bath"
                        : `What should the team know about ${dogName}?`
            }
            placeholderTextColor={colors.faintText}
            style={styles.input}
            value={note}
          />

          <PrimaryButton
            accessibilityLabel={logLabel}
            title={logLabel}
            onPress={() => onLog(selectedType, note)}
            style={{ backgroundColor: selectedConfig.color }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.35)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    maxHeight: "86%",
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 4,
    marginBottom: spacing.lg,
    width: 44,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  closeText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  typeButton: {
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 2,
    minHeight: 86,
    padding: spacing.md,
    width: "31.8%",
  },
  typeSymbol: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  preview: {
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  previewSymbol: {
    fontSize: 30,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  previewMeta: {
    color: colors.mutedText,
    fontSize: 13,
    marginTop: 2,
  },
  label: {
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
    minHeight: 92,
    marginBottom: spacing.lg,
    padding: spacing.md,
    textAlignVertical: "top",
  },
});
