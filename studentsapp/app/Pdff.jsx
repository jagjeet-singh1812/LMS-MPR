import { View, Text, Touchable, TouchableOpacity,Linking } from 'react-native'
import React from 'react'
const openurl = (url) => {
    if (url) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (urlPattern.test(url)) {
        Linking.openURL(url);
      } else {
        Alert.alert("Invalid URL", "Please enter a valid URL for the item.");
      }
    }
  };

export default function Pdff() {
  return (
    <View style={{marginTop:20}}>
      <TouchableOpacity onPress={()=>openurl("https://pdf-merger-wnbq.onrender.com")}>
        <Text>Go to merge it</Text>
      </TouchableOpacity>
    </View>
   
  )
}