import { Href, useRouter } from "expo-router";

import { HouseholdSetupScreen } from "@/screens/HouseholdSetupScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function HouseholdRoute() {
  const router = useRouter();
  const { state } = useDogWatch();

  return (
    <HouseholdSetupScreen
      dog={state.dog}
      onBack={() => router.back()}
      onJoin={() => router.replace("/home" as Href)}
    />
  );
}
