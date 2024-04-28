import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import backroad from "../../assets/backendroad.jpg";

const Back = () => {
  return (
    <>
        <View>
      {/* <ScrollView> */}
          <Image style={styles.roadimg} source={backroad}></Image>
      {/* </ScrollView> */}
        </View>
    </>
  );
};

export default Back;

const styles = StyleSheet.create({
  roadimg: {
    // marginTop: 50,
    height: "100%",
    width: "100%",
  },
});
