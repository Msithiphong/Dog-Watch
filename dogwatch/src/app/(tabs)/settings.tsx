import { useRouter } from "expo-router";

import { SettingsScreen } from "@/screens/SettingsScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function SettingsRoute() {
  const router = useRouter();
  const { resetApp } = useDogWatch();

  return (
    <SettingsScreen
      onLogout={() => {
        resetApp();
        router.replace("/");
      }}
    />
  );
}
