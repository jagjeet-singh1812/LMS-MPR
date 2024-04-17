import { View, Text ,StyleSheet} from "react-native";
import React from "react";
import { useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../Utils/Colors";
import { FontAwesome } from '@expo/vector-icons';
export default function Piechart() {
  const widthAndHeight = 150;
  const [values, setvalues] = useState([1]);
  const [color, setcolor] = useState([Colors.gray]);
  return (
    <View>
      <View style={{ marginTop:20,
    padding:20,
    backgroundColor:Colors.White,
    borderRadius:15,
    elevation:1}}>
        <Text style={{fontSize:20}}>Total Estimated : <Text style={{fontWeight:"bold"}}>₹ 0</Text></Text>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={color}
          coverRadius={0.75}
          coverFill={"#FFF"}
        />
        <View style={{display:'flex', flexDirection:'row',alignItems:'center'
        ,gap:5 }} >
        <FontAwesome name="circle" size={24} color={Colors.gray} />
        <Text>N/A</Text>
        </View>
      </View>

    </View>
  );
}

