import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import frontroad from "../../assets/frontroad.jpg"

const Front = () => {
  return (
    <>
    
        <View>
            <Image style={styles.roadimg} source={frontroad}></Image>
        </View>

    </>
  )
}

export default Front


const styles = StyleSheet.create({
    roadimg:{
        marginTop:120,
        height:'80%',
        width:'100%'
    }
})