import { DogProfileScreen } from "@/screens/DogProfileScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function DogRoute() {
  const { state, openQuickLog } = useDogWatch();

  return (
    <DogProfileScreen
      dog={state.dog}
      activities={state.activities}
      onLogAction={() => openQuickLog()}
    />
  );
}
