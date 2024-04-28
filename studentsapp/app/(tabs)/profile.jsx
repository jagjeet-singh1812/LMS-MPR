import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import Middle from '../../Components/Middle';

const ProfilePage = () => {

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.icons}>
                        <TouchableOpacity style={styles.back}>
                            <AntDesign name="back" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.setting}>
                            <AntDesign name="setting" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Middle></Middle>
                </View>
            </ScrollView>
        </>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        marginHorizontal: 20,
        marginTop: 55,
    },
    icons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    back: {
        width: 45,
        height: 45,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }

});