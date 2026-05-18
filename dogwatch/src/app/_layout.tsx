import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QuickLogModal } from "@/components/QuickLogModal";
import { colors } from "@/design/tokens";
import { DogWatchProvider, useDogWatch } from "@/state/dogwatch";

export default function RootLayout() {
  return (
    <DogWatchProvider>
      <StatusBar style="dark" />
      <DogWatchRoot />
    </DogWatchProvider>
  );
}

function DogWatchRoot() {
  const {
    state,
    isQuickLogOpen,
    quickLogType,
    logActivity,
    closeQuickLog,
  } = useDogWatch();

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.surface },
          headerShown: false,
        }}
      />
      <QuickLogModal
        visible={isQuickLogOpen}
        initialType={quickLogType}
        dogName={state.dog.name}
        memberName={state.currentUser.name}
        onClose={closeQuickLog}
        onLog={(type, note) => {
          logActivity(type, note);
          closeQuickLog();
        }}
      />
    </>
  );
}
