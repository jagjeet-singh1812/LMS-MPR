import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Image } from 'react-native'
import axios from 'axios';
import { BASE_URL } from "../../Utils/global";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import LoginImage from "../../assets/loginform.jpg";
import Services from '../../Utils/Services';
import { useRouter } from 'expo-router';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Login = () => {
    const Router=useRouter();

    const navigation = useNavigation();

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => { setExpoPushToken(token) })
            .catch((err) => console.log(err))
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            token = (await Notifications.getExpoPushTokenAsync({ projectId: 'b9b37ab2-d745-4af9-9af0-701bc847fa6b' })).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    const pushnotify = async () => {
        const message = {
            to: expoPushToken,
            sound: "default",
            title: "Hey Buddy...",
            body: "You are in your college..So please put your phone on silent"
        };

        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "accept-encoding": "gzip, deflate",
                "content-type": "application/json"
            },
            body: JSON.stringify(message)
        });

        // Assuming you want to do something with the response, you can await and process it accordingly
        const responseData = await response.json();
        console.log(responseData);
    }

    const submit = async () => {
        const fromData = {
            "email": email,
            "password": pass
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                fromData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            await AsyncStorage.setItem('userId', (response.data.id));
            await Services.storeData('login', 'true');
            await Services.storeData('email', response.data.email);
            Alert.alert("Successful", response.data.id);
            pushnotify()
            Router.push('/(tabs)')
        } catch (error) {
            Alert.alert('Error occurred:', error.message);
        }
    }

    return (
        <>

            <ScrollView>
                <View style={styles.Lcontainer}>
                    {/* <Text style={styles.textLarge}>Login</Text> */}
                    <View style={styles.container}>
                        <Image source={LoginImage} style={styles.loginImg} />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.textInput}
                            keyboardType="email-address"
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            value={pass}
                            onChangeText={(text) => setPass(text)}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={submit}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.textNew}>New to this App?</Text>
                    <TouchableOpacity style={styles.btn} onPress={()=>{Router.push('Signup/Registration1')}}>
                        <Text style={styles.btnText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </>
    )
}

export default Login

const styles = StyleSheet.create({
    Lcontainer: {
        flex: 1,
        alignContent: "center",
        padding: 20,
        paddingTop: 10,
        backgroundColor: "white",
        height:'100%'
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30,
        marginTop:60
    },
    loginImg: {
        width: 230, // Adjust this based on your image size
        height: 300, // Adjust this based on your image size
    },
    textSmall: {
        fontSize: 16,
        fontWeight: "600",
    },
    textNew: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom:5,
        marginLeft:3,
        marginTop:5
    },
    textLarge: {
        fontSize: 32,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 30,
        marginTop: 30,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        padding: 20,
    },
    progreeBar: {
        marginTop: 20,
        padding: 20,
    },
    titleCont: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        borderWidth: 0.5,
        borderColor: "#d3d3d3",
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        marginTop: 5,
        width: '99%',
        borderRadius: 10,
        shadowOffset: { width: -3, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 30,
    },
    btn: {
        backgroundColor: "rgb(110, 142, 251)",
        paddingHorizontal: 70,
        paddingVertical: 12,
        borderRadius: 5,
        marginRight: 10,
        marginBottom:10
    },
    btnN: {
        backgroundColor: "rgb(110, 142, 251)",
        paddingHorizontal: 70,
        paddingVertical: 12,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 40,
    },
    btnText: {
        fontWeight: "600",
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    radioGroup: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    radioText: {
        marginLeft: 8,
    },
    radioDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "rgb(110, 142, 251)",
        marginLeft: 8,
    },
});