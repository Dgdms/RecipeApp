import React from "react";
import Gradient from "@/assets/Icons/Gradient";
import DocumentData from "@/assets/Icons/DocumentData";
import LightBulbPerson from "@/assets/Icons/LightbulbPerson";
import Rocket from "@/assets/Icons/Rocket";
import Logo from "@/assets/Icons/Logo";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";

import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";


export default function Home() {
  return (
    <Box style= {{backgroundColor: useThemeColor({}, "background")}}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
      </ScrollView>
    </Box>
  );
}
