import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utils/Colors";
import { useRouter } from "expo-router";
export default function CategoryList({ items }) {
  const screenHeight = Dimensions.get("window").height;
  const router = useRouter();
  const handlecat = (category) => {
    router.push({
      pathname: "/Category_Details",
      params: { category_id: category.id },
    });
  };
  const [widthin, setwithin] = useState([]);
 

  useEffect(() => {
    const calallcost = async(items) => {
      setwithin([]);
      items.forEach((item, ind) => {
        let total = 0;
        const { assigned_budget, Categoryitems } = item;
        if (Categoryitems && Categoryitems.length > 0) {
          Categoryitems.forEach((_item) => {
            total += _item.cost;
          });
        }
        widthin.push(total>assigned_budget?1:0);
  
      });
      console.log(widthin)
    
    };
    calallcost(items);
  }, [items]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Latest Budget</Text>
      <View>
        {/* <ScrollView vertical={true} style={{ height: screenHeight}}> */}
        {/* <ScrollView style={{ height: screenHeight - 200 }}> */}
        {items.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginTop: 10,
                backgroundColor: Colors.White,
                padding: 10,
                elevation: 1,
                borderRadius: 15,
              }}
              onPress={() => handlecat(item)}
            >
              <View
                style={{ justifyContent: "center", alignItems: "baseline" }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    backgroundColor: item.color,
                    padding: 25,
                    borderRadius: 15,
                  }}
                >
                  {item.icon}
                </Text>
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "baseline" }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 19 }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {item?.Categoryitems?.length} Items
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  left: "85%",
                  top: "50%",
                  alignContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  ₹ {item.assigned_budget}
                </Text>
              </View>
              <View>
                { widthin[index]===1 ? (
                  <View
                    style={{
                      backgroundColor: Colors.red,
                      borderRadius: 10,
                      padding: 5,
                    }}
                  >
                    <Text>OverBuget</Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        {/* </ScrollView> */}
      </View>
    </View>
  );
}
