import { Href, useRouter } from "expo-router";

import { HomeScreen } from "@/screens/HomeScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function HomeRoute() {
  const router = useRouter();
  const { state, openQuickLog } = useDogWatch();

  return (
    <HomeScreen
      dog={state.dog}
      activities={state.activities}
      onLogAction={openQuickLog}
      onViewFeed={() => router.push("/feed" as Href)}
      onViewReminders={() => router.push("/reminders" as Href)}
    />
  );
}
