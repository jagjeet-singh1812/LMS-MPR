import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import datasciroad from "../../assets/dev.jpg"
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Front = () => {
  return (
    <>
    
        <View style={{display:'flex',alignItems:'center',justifyContent:'center',margin:0}}>
            <Image style={styles.roadimg} source={datasciroad}></Image>
        </View>

    </>
  )
}

export default Front


const styles = StyleSheet.create({
    roadimg:{
        marginTop:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        height:450,
        width:'100%'
    }
})