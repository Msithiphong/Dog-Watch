import { Tabs } from "expo-router";

import { AppIcon } from "@/components/AppIcon";
import { colors } from "@/design/tokens";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.faintText,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.softBorder,
          minHeight: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              name={{ ios: "house.fill", android: "home" }}
              fallback="H"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              name={{ ios: "list.bullet.rectangle", android: "list_alt" }}
              fallback="A"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dog"
        options={{
          title: "Luna",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              name={{ ios: "pawprint.fill", android: "pets" }}
              fallback="L"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "Team",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              name={{ ios: "person.2.fill", android: "group" }}
              fallback="T"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              name={{ ios: "gearshape.fill", android: "settings" }}
              fallback="S"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
