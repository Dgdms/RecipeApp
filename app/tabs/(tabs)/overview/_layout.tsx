import React from "react";
import { Stack } from "expo-router";

export default function RecipeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="newRecipe" options={{headerShown: false}}/>
    </Stack>
  );
}