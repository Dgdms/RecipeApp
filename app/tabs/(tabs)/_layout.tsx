import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{

        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="overview"
        options={{
          title: "Rezepte",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
  
      <Tabs.Screen
        name="newRecipe"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />

    </Tabs>
  );
}
