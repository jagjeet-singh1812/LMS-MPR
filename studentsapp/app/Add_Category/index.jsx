import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
import ColorPicker from "../../Components/ColorPicker";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Services from "../../Utils/Services";
import { supabase } from "../../Utils/Config";
export default function Add_Category() {
  const [selectedicon, setselectedicon] = useState("IC");
  const [selectedcolor, setselectedcolor] = useState(Colors.primary);
  const [Name, setName] = useState("");
  const [Budget, setBudget] = useState(0);

  const handlecreate = async () => {
    const email = await Services.getData("email");
    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: Name,
          assigned_budget: Budget,
          color: selectedcolor,
          icon: selectedicon,
          created_by: email,
        }
      ])
      .select();
    console.log(data);
    if (data) {
    //   ToastAndroid.show("Category Created", ToastAndroid.SHORT);
      router.replace({pathname:"/Category_Details",params:{category_id:data[0].id}});
    }
  };
  return (
    <View style={{ margintop: 20, padding: 20 }}>
      {/* <AddItemModal/> */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.icoc, { backgroundColor: selectedcolor }]}
          maxLength={2}
          onChangeText={(value) => setselectedicon(value)}
        >
          {selectedicon}
        </TextInput>
        <ColorPicker
          selectedcolor={selectedcolor}
          setselectedcolor={setselectedcolor}
        />
      </View>

      <View style={styles.input}>
        <MaterialIcons
          name="local-offer"
          size={24}
          color={Name == "" ? Colors.gray : "black"}
        />
        <TextInput
          style={{
            padding: 10,
            width: "95%",
            fontSize: 15,
            overflow: "hidden",
          }}
          placeholder="Category Name"
          value={Name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.input}>
        <FontAwesome
          name="rupee"
          size={24}
          color={Budget == "" ? Colors.gray : "black"}
        />
        <TextInput
          style={{
            padding: 10,
            width: "95%",
            fontSize: 15,
            overflow: "hidden",
          }}
          placeholder="Total Budget"
          onChangeText={(text) => setBudget(Number(text))}
          keyboardType="numeric"
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.btn}
        disabled={Budget == 0 || Name == "" ? true : false}
        onPress={() => handlecreate()}
      >
        <Text style={styles.texty}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icoc: {
    textAlign: "center",
    fontSize: 30,
    borderRadius: 99,
    padding: 10,
    // paddingHorizontal: 25,
    paddingVertical: 25,
    color: Colors.White,
    width: "30%",
    marginTop: 20,
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.gray,
    backgroundColor: Colors.White,
    elevation: 1,
    marginTop: 20,
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 99,
    marginTop: 30,
  },
  texty: {
    color: Colors.White,
    textAlign: "center",
    fontSize: 20,
  },
});
