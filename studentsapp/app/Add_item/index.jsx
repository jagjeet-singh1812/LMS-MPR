import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import { decode } from "base64-arraybuffer";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Services from "../../Utils/Services";
import { supabase } from "../../Utils/Config";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
export default function Add_item() {
  const { category_id } = useLocalSearchParams();
  const [loading, setloading] = useState(false);
  const [selectedimage, setselectedimage] = useState(
    "https://t3.ftcdn.net/jpg/04/60/01/36/240_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
  );
  const [selectedimage2, setselectedimage2] = useState(
    "https://t3.ftcdn.net/jpg/04/60/01/36/240_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
  );
  let url =
    "https://yjdzxpauugigjlpzomoo.supabase.co/storage/v1/object/sign/Items_Image/";
  const [Name, setName] = useState("");
  const [cost, setcost] = useState(0);
  const [note, setnote] = useState("");
  const [uri, seturi] = useState("");

  const addit = async () => {
    const nn = Date.now();
    const { data, error } = await supabase.storage
      .from("Items_Image")
      .upload(nn + ".png", decode(selectedimage2), {
        contentType: "image/png",
      });
    url = url + nn + ".png";
    // setselectedimage(url);
    console.log(url);
    if (data) console.log(data);
    else console.log("error", error);
  };
  const handleimage = async () => {
    console.log("clicked");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setselectedimage(result.assets[0].uri);
      setselectedimage2(result.assets[0].base64);

      // console.log(selectedimage2);
    }
  };

  const handlecreate = async () => {
    const email = await Services.getData("email");
    addit();
    const { data, error } = await supabase
      .from("Categoryitems")
      .insert([
        {
          name: Name,
          cost: cost,
          note: note,
          url: uri,
          icon: selectedimage,
          category_id: category_id,
        },
      ])
      .select();
    console.log(data);
    if (data) {
      ToastAndroid.show("Item Added", ToastAndroid.SHORT);
      router.replace({
        pathname:'/Category_Details',
        params:{category_id:category_id}
      });
    }
    console.log(error);
  };
  return (
    <View style={{ margintop: 20, padding: 20 }}>
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={handleimage}>
              <Image
                source={{ uri: selectedimage }}
                style={{ width: 150, height: 150, borderRadius: 15 }}
              ></Image>
            </TouchableOpacity>
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
              placeholder="Item Name"
              value={Name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.input}>
            <FontAwesome
              name="rupee"
              size={24}
              color={cost == "" ? Colors.gray : "black"}
            />
            <TextInput
              style={{
                padding: 10,
                width: "95%",
                fontSize: 15,
                overflow: "hidden",
              }}
              placeholder="Cost"
              onChangeText={(text) => setcost(Number(text))}
              keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.input}>
            <Entypo
              name="link"
              size={24}
              color={uri == "" ? Colors.gray : "black"}
            />
            <TextInput
              style={{
                padding: 10,
                width: "95%",
                fontSize: 15,
                overflow: "hidden",
              }}
              placeholder="Enter url if any"
              onChangeText={(text) => seturi(text)}
            ></TextInput>
          </View>
          <View style={styles.input}>
            <FontAwesome
              name="sticky-note"
              size={24}
              color={note === "" ? Colors.gray : "black"}
            />
            <TextInput
              style={{
                padding: 10,
                width: "95%",
                fontSize: 15,
                overflow: "hidden",
              }}
              placeholder="Note"
              onChangeText={(text) => setnote(text)}
              numberOfLines={3}
            ></TextInput>
          </View>

          <TouchableOpacity
            style={styles.btn}
            disabled={Name == "" || !cost || loading ? true : false}
            onPress={() => handlecreate()}
          >
            {loading && <ActivityIndicator size="large" color={Colors.White} />}
            <Text style={styles.texty}>Add</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
