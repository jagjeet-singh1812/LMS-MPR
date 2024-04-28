import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import mlroad from "../../assets/mlroad.jpg"

const Front = () => {
  return (
    <>
    
        <View>
            <Image style={styles.roadimg} source={mlroad}></Image>
        </View>

    </>
  )
}

export default Front


const styles = StyleSheet.create({
    roadimg:{
        // marginTop:"50%",
        height: "80%",
        width: "100%",
    }
})