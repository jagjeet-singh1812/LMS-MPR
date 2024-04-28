import React, { useState } from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import { BASE_URL } from '../Utils/global';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Colors from '../Utils/Colors';

const TimeTable = (props) => {
  const navigation =useRouter();

  const [image, setImage] = useState(null);
  const [bs64, setbs64] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    //   aspect: [4, 3],
      quality: 1,
      base64: true
    });


    if (!result.canceled) {
      setbs64(result.assets[0].base64)
      setImage(result.assets[0].uri);
    }
  };

  const onPress = () => {

    try {
      
      // Convert JSON object to JSON string
      fromData={"image":bs64}

      const response = axios.post(
        `${BASE_URL}/timetable`,
        fromData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      props.setissubmitted(true);
      props.reload=true;
    //   navigation.push("/Scheduler")
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <View style={styles.Lcontainer}>
      <View>
        <Text style={styles.textLarge}>Add TimeTable</Text>
        <View>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>Add TimeTable</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TimeTable;

const styles = StyleSheet.create({
  Lcontainer: {
    backgroundColor: "#f0f0f0",
    alignContent: "center",
    padding: 20,
    paddingTop: 80,
  },
  textSmall: {
    fontSize: 16,
    fontWeight: "600",
  },
  textLarge: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 40,
    textAlign: "center",
    color:Colors.Black
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    padding: 20,
  },
  progreeBar: {
    marginTop: 20,
    padding: 20,
  },
  titleCont: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 20,
    width: 300,
    borderRadius: 10,
    shadowOffset: { width: -3, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "rgb(110, 142, 251)",
    paddingHorizontal: 70,
    paddingVertical: 12,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 50,
  },
  btnN: {
    backgroundColor: "#0484ac",
    paddingHorizontal: 70,
    paddingVertical: 12,
    borderRadius: 5,
  },
  btnText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});