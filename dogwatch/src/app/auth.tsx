import { Href, useRouter } from "expo-router";

import { AuthScreen } from "@/screens/AuthScreen";

export default function AuthRoute() {
  const router = useRouter();

  return (
    <AuthScreen
      onBack={() => router.back()}
      onAuth={() => router.push("/household" as Href)}
    />
  );
}
