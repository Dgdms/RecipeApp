import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot } from "expo-router";

import "../global.css";

// Splash Screen verhindern, bis alles bereit ist
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Beende den SplashScreen direkt, da keine Fonts mehr geladen werden
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav onLayout={onLayoutRootView} />;
}

function RootLayoutNav({ onLayout }: { onLayout: () => void }) {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
