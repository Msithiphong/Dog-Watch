import { HouseholdMembersScreen } from "@/screens/HouseholdMembersScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function MembersRoute() {
  const { state } = useDogWatch();

  return (
    <HouseholdMembersScreen
      members={state.members}
      activities={state.activities}
      dogName={state.dog.name}
    />
  );
}
