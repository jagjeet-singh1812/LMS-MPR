import { View, Text, Image } from "react-native";
import React from "react";
import random from "../assets/pdf_merge.png";
import Colors from "../Utils/Colors";

import { Ionicons } from '@expo/vector-icons';
export default function Header() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Image
        source={{ random }}
        style={{ width: 50, height: 50, borderRadius: 99 }}
      ></Image>
      <View   style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-between',
        width:'85%'
      }}>
        <View>
          <Text style={{ color: Colors.White, fontSize: 16 }}>Welcome</Text>
          <Text
            style={{ color: Colors.White, fontSize: 20, fontWeight: "bold" }}
          >
            user
          </Text>
        </View>
        <Ionicons name="notifications" size={24} color="white" />
      </View>
      
    </View>
  );
}
