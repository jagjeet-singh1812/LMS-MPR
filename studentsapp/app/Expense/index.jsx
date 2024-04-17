import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { supabase } from "../../Utils/Config";
import Services from "../../Utils/Services";
import Colors from "../../Utils/Colors";
import Header from "../../Components/Header";
import Piechart from "../../Components/Piechart";
import { AntDesign } from "@expo/vector-icons";
export default function Expense() {
  const fetchcategory = async () => {
    let useremail = await Services.getData("email");
    console.log(`email is ${useremail}`);
    let { data: Category, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", `${useremail}`);
    console.log(Category);
  };
  useEffect(() => {
    fetchcategory();
  }, []);
  return (
    <View style={{
      marginTop: 20,flex:1}}>
      <View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: Colors.primary,
          height: 150,
        }}
      >
        <Header />
        <Piechart />
      </View>
      <View style={styles.adbtn}>
        <AntDesign name="pluscircle" size={60} color={Colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adbtn: {
    position: "absolute",
    bottom: 10,
    right: 16,
  },
});
