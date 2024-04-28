import React from "react";
import { Image, StyleSheet, View } from "react-native";
import blockroad from "../../assets/blockchainroad.jpg";

const Front = () => {
  return (
    <>
      <View>
        <Image style={styles.roadimg} source={blockroad}></Image>
      </View>
    </>
  );
};

export default Front;

const styles = StyleSheet.create({
  roadimg: {
    marginTop: 50,
    height: "100%",
    width: "100%",
  },
});
