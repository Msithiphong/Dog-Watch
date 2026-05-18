import { useRouter } from "expo-router";

import { RemindersScreen } from "@/screens/RemindersScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function RemindersRoute() {
  const router = useRouter();
  const { state, toggleReminder } = useDogWatch();

  return (
    <RemindersScreen
      reminders={state.reminders}
      dogName={state.dog.name}
      onBack={() => router.back()}
      onToggle={toggleReminder}
    />
  );
}
