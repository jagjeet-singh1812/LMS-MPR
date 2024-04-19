import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { supabase } from "../../Utils/Config";
import Services from "../../Utils/Services";
import Colors from "../../Utils/Colors";
import Header from "../../Components/Header";
import Piechart from "../../Components/Piechart";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import CategoryList from "../../Components/CategoryList";
export default function Expense() {
  const [Data, setData] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const fetchcategory = async () => {
    let useremail = await Services.getData("email");
    console.log(`email is ${useremail}`);
    setloading(true);
    let { data, error } = await supabase
      .from("Category")
      .select("*,Categoryitems(*)")
      .eq("created_by", `${useremail}`)
      .order("created_at", { ascending: false });
    console.log(data);
    setData(data);
    setloading(false);
  };
  useEffect(() => {
    fetchcategory();
  }, []);
  return (
    <View
      style={{
        marginTop: 5,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchcategory} />
        }
      >
        <View
          style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: Colors.primary,
            height: 150,
          }}
        >
          <Header />
        </View>
        <View style={{ margin: 20, marginTop: -95 }}>
          <Piechart items={Data}/>
          <CategoryList items={Data} />
        </View>
      </ScrollView>
      <Link href={"/Add_Category"} style={styles.adbtn}>
        <AntDesign name="pluscircle" size={60} color={Colors.primary} />
      </Link>
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
