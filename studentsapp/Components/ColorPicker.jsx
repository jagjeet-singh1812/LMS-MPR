import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

export default function ColorPicker(props) {
  return (
    <View style={{display:'flex',flexDirection:'row',margin:'auto',gap:20,marginTop:20}}>
        {Colors.color_list.map((color, index) => {
            return (
                <TouchableOpacity onPress={() => {props.setselectedcolor(color)}}
                key={index}
                style={[{
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    borderRadius: 99,
                    margin: 5,
                },props.selectedcolor==color&&{borderWidth:1.5}]}
                ></TouchableOpacity>
            );
            })
        }
    </View>
  )
}