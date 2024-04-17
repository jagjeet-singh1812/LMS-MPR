import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import Services from "../../Utils/Services";
export default function Home() {
  const router = useRouter();
  const checkauth = async () => {
    // await Services.clearLocalStorage();
    const token = await Services.getData("login");
    console.log(token);
    if (!token) {
      // router.push("/login");
    }
  };
  
  useEffect(() => {
    checkauth();
  }, []);
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
}
// rns
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
