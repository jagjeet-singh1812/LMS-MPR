import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="Add_Category/index"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Add New Category",
        }}
      />
      <Stack.Screen
        name="Add_item/index"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Add New Item",
        }}
      />
       <Stack.Screen
        name="Updateitem/index"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Update Item",
        }}
      />
    </Stack>
  );
}
