import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../Utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
export default function Piechart({ items }) {
  const widthAndHeight = 150;
  const [values, setvalues] = useState([1]);
  const [color, setcolor] = useState([Colors.gray]);
  //
  const [sum,setsum]=useState(0);
  const calallcost = () => {
    setcolor([Colors.gray]);
    setvalues([1]);
    // console.log("from pie");
    items.forEach((item, ind) => {
      let total = 0;
      const { assigned_budget, Categoryitems } = item;
      // console.log(Categoryitems);
      if (Categoryitems && Categoryitems.length > 0) {
        Categoryitems.forEach((_item) => {
          total += _item.cost;
        });
      }
      setcolor((color) => [...color, Colors.color_list[ind]]);
      setvalues((values) => [...values, total]);
    });
    let check = 0;
    for (let i = 0; i < values.length; i++) {
      check += values[i];
    }
    if (color.length === 0 || values.length === 0 || check === 0) {
      setcolor([Colors.gray]);
      setvalues([1]);
    }
   
  };
  useEffect(() => {
    let check = 0;
    for (let i = 0; i < values.length; i++) {
      check += values[i];
    }
    setsum(check);
  }, [values]);

  // const calallcost = () => {
  //   let totalValues = 0;
  //   let newColors = [];
  //   let newValues = [];

  //   items.forEach((item, ind) => {
  //     let total = 0;
  //     console.log(item.CategoryItems);
  //     item.CategoryItems.forEach((_item) => {
  //       total += _item.cost;
  //       consol
  //     });
  //     console.log(total);c
  //     totalValues += total;
  //     newColors.push(Colors.color_list[ind]);
  //     newValues.push(total);
  //   });

  //   if (totalValues === 0) {
  //     newColors = [Colors.gray];
  //     newValues = [1];
  //   }

  //   setcolor(newColors);
  //   setvalues(newValues);
  // };

  useEffect(() => {
    calallcost();
  }, [items]);
  return (
    <View>
      <View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: Colors.White,
          borderRadius: 15,
          elevation: 1,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          Total Estimated : <Text style={{ fontWeight: "bold" }}>₹ {sum}</Text>
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={color}
            coverRadius={0.75}
            coverFill={"#FFF"}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            {items.length == 0 ? (
              <View>
                <FontAwesome name="circle" size={24} color={Colors.gray} />
                <Text>N/A</Text>
              </View>
            ) : (
              <View>
                {items.map((item, ind) => {
                  return (
                    <View key={ind}
                      style={{ display: "flex", flexDirection: "row", gap: 5 }}
                    >
                      <FontAwesome
                        name="circle"
                        size={24}
                        color={Colors.color_list[ind]}
                      />
                      <Text>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
