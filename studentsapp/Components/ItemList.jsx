import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Colors from "../Utils/Colors";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
export default function ItemList({ data }) {
  return (
    <View style={{ height: "75%" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Item List</Text>
          {data.length ? (
            data.map((item, ind) => (
              <View key={ind}>
                <View key={item.id} style={styles.itemContainer}>
                  <View style={styles.cc}>
                    {item.icon ? (
                      <Image
                        source={{ uri: item.icon }}
                        style={styles.image}
                        resizeMode="cover"
                        onError={(error) => console.log("Image Error", error)}
                        onLoadStart={() => console.log("Image Loading")}
                        onLoadEnd={() => console.log("Image Loaded")}
                      />
                    ) : (
                      <Text style={{ width: "25%" ,marginTop:10,marginLeft:10}}>No Image</Text>
                    )}
                    <View style={styles.ss}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          width: "60%",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{color:Colors.darkgrey,width:'80%'}}>{item.url}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      left: "78%",
                      top: "50%",
                      alignContent: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      ₹ {item.cost}
                    </Text>
                  </View>
                </View>
                {data.length - 1 !== ind && (
                  <View
                    style={{
                      // borderWidth: 1,
                      marginTop: 10,
                      marginBottom:10,
                      borderColor: Colors.darkgrey,
                    }}
                  ></View>
                )}
              </View>
            ))
          ) : (
            <View style={{ height: "70" }}>
              <View
                style={{
                  borderWidth: 0.5,
                  marginTop: 4,
                  borderColor: Colors.darkgrey,
                  width: "100%",
                }}
              ></View>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                No items available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Link href={"/Add_item"} style={styles.adbtn}>
        <AntDesign name="pluscircle" size={60} color={Colors.primary} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  ss: {
    width: "50%",
  },
  adbtn: {
    position: "absolute",
    right: 0,
    top: "85%",
  },
  cc: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  container: {
    // position:'relative',
    height: "80%",
    marginTop: 20,
    display: "flex",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 20,
    width: "100%",
    backgroundColor: Colors.White,
    elevation: 2,
    borderRadius: 15,
    alignContent: "center",
      height:'auto'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    margin: 10,
  },
});
