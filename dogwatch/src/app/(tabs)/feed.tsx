import { ActivityFeedScreen } from "@/screens/ActivityFeedScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function FeedRoute() {
  const { state, openQuickLog } = useDogWatch();

  return (
    <ActivityFeedScreen
      activities={state.activities}
      dogName={state.dog.name}
      onLogAction={() => openQuickLog()}
    />
  );
}
