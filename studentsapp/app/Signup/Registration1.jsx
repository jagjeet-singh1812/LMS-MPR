import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from "react";
import { useRouter } from "expo-router";

const Registration1 = () => {
    const Router=useRouter();
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [pass, setPass] = useState("")
    const [conPass, setConPass] = useState("")

    const next = () => {
        if (conPass === pass) {
            Router.push({
                pathname: "/Signup/Registration2",
                params: { fname: fname,
                    lname: lname,
                    email: email,
                    phone: phone,
                    pass: pass},
              });
        }
        else {
            Alert.alert("Check Password")
        }
    }

    return (
        <>

            <ScrollView>
                <View style={styles.Lcontainer}>
                    <Text style={styles.textLarge}>Student Sign Up</Text>
                    <View>
                        <Text style={styles.textSmall}>First Name</Text>
                        <TextInput
                            placeholder="Enter your first name"
                            value={fname}
                            onChangeText={(e) => setFname(e)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>Last Name</Text>
                        <TextInput
                            placeholder="Enter your last name"
                            value={lname}
                            onChangeText={(text) => setLname(text)}
                            style={styles.textInput}
                        />
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
                        <Text style={styles.textSmall}>Phone</Text>
                        <TextInput
                            placeholder="Enter your phone number"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={styles.textInput}
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
                    <View>
                        <Text style={styles.textSmall}>Confirm Password</Text>
                        <TextInput
                            placeholder="Confirm password"
                            value={conPass}
                            onChangeText={(text) => setConPass(text)}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={next}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </>
    )
}

export default Registration1

const styles = StyleSheet.create({
    Lcontainer: {
        flex: 1,
        alignContent: "center",
        padding: 20,
        paddingTop: 50,
    },
    textSmall: {
        fontSize: 16,
        fontWeight: "600",
    },
    textLarge: {
        fontSize: 32,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 20,
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
        marginTop: 20,
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