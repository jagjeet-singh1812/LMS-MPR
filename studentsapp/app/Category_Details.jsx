import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Services from "../Utils/Services";
import { supabase } from "../Utils/Config";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import ItemList from "../Components/ItemList";
export default function Category_Details() {
  const router = useRouter();
  const calculattotalprice = (Datacat) => {
    let total = 0;
    // console.log("from cal")
    // console.log(Datacat);

    for (let i = 0; i < Datacat.length; i++) {
      const { cost } = Datacat[i];
      console.log(cost);
      if (null != cost) total += cost;
    }
    console.log("totol", total);
    return total;
  };
  const { category_id } = useLocalSearchParams();
  const [Datacat, setDatacat] = useState([]);
  const [whole, setwhole] = useState([]);
  const [totalprice, settotalprice] = useState(0);
  const [perc, setperc] = useState(0);
  const cal = () => {
    let c = (totalprice / whole.assigned_budget) * 100;
    if (c > 100) setperc(100);
    else if (c < 0) setperc(0);
    else setperc(Math.floor(c));
    console.log(perc);
  };
  useEffect(() => {
    console.log(category_id);
    category_id && fetchcategoryitems();
  }, [category_id]);
  useEffect(() => {
    settotalprice(calculattotalprice(Datacat));
    // cal();
  }, [Datacat]);
  const deleteit = async (category_id) => {
    Alert.alert("Are You sure", "Do You really want to delete this category?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          // Delete records from Categoryitems first
          await supabase
            .from("Categoryitems")
            .delete()
            .eq("category_id", category_id);

          // Then delete the Category record
          let { data, error } = await supabase
            .from("Category")
            .delete()
            .eq("id", category_id);

          console.log(data);
          ToastAndroid.show("Category Deleted", ToastAndroid.SHORT);
          router.replace("/Expense");

          if (error) {
            alert("Error in deleting category");
          }
        },
      },
    ]);
  };

  const fetchcategoryitems = async () => {
    let { data, error } = await supabase
      .from("Category")
      .select("*,Categoryitems(*)")
      .eq("id", category_id)
      .order("created_at", { ascending: false });
    // console.log(data[0].Categoryitems);
    // console.log(data.length);
    setDatacat(data[0].Categoryitems);
    const [{ color, assigned_budget, icon, name }] = data;
    const formData = {
      color,
      assigned_budget,
      icon,
      name,
      datalength: data[0]?.Categoryitems?.length,
    };
    setwhole(formData);
    console.log(whole);
  };

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "baseline" }}>
          <Text
            style={{
              fontSize: 25,
              backgroundColor: whole.color,
              padding: 20,
              borderRadius: 15,
            }}
          >
            {whole.icon}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "baseline",
            flex: 1,
            marginLeft: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>{whole.name}</Text>
          <Text style={{ fontSize: 20 }}>{whole.datalength} Items</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <TouchableOpacity onPress={() => deleteit(category_id)}>
            <MaterialIcons name="delete" size={34} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹ {totalprice}</Text>
        <Text style={{ fontSize: 20 }}>
          Total Budget : ₹ {whole.assigned_budget}
        </Text>
      </View>
      <View style={styles.progressbarcont}>
        {(totalprice / whole.assigned_budget) * 100 > 100 ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: Colors.red,
              borderRadius: 99,
            }}
          ></View>
        ) : (
          <View
            style={{
              width: (totalprice / whole.assigned_budget) * 100 + "%",
              height: "100%",
              backgroundColor: Colors.primary,
              borderRadius: 99,
            }}
          ></View>
        )}
      </View>
      {totalprice > whole.assigned_budget && (
        <View
          style={{
            backgroundColor: Colors.red,
            borderRadius: 10,
            padding: 5,
            marginTop: 10,
            width:'25%',
            position:'absolute',
            right:0,
            top:'30%'
          }}
        >
          <Text style={{color:Colors.White}}>OverBuget</Text>
        </View>
      )}
      <ItemList data={Datacat} re={() => fetchcategoryitems()}></ItemList>
    </View>
  );
}

const styles = StyleSheet.create({
  progressbarcont: {
    width: "100%",
    height: 15,
    backgroundColor: Colors.gray,
    borderRadius: 99,
    marginTop: 10,
    elevation: 3,
  },
});
