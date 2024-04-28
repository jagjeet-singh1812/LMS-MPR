import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View ,Text} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import Middle from '../../Components/Middle';
import DocumentPickerComponent from '../../Components/Upload';
import Services from '../../Utils/Services';
import { useRouter } from 'expo-router';
const ProfilePage = () => {
const router=useRouter();
    const doit=async()=>{
         await Services.clearLocalStorage();
         router.push('/login');
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {/* <DocumentPickerComponent/> */}
                    <View style={styles.icons}>
                        <TouchableOpacity style={styles.back}>
                            <AntDesign name="back" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.setting} onPress={()=>doit()}>
                           <Text style={{}}>Logout</Text>
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
    setting:{

    },
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