import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Redirect, Slot } from "expo-router";

import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync(); // Direkt nach dem Start den SplashScreen beenden
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </GluestackUIProvider>
    </>
  );
}
