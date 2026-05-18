import { Href, useRouter } from "expo-router";

import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { useDogWatch } from "@/state/dogwatch";

export default function Index() {
  const router = useRouter();
  const { state } = useDogWatch();

  return (
    <WelcomeScreen
      dog={state.dog}
      onGetStarted={() => router.push("/auth" as Href)}
    />
  );
}
