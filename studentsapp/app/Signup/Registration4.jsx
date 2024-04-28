import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../../Utils/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Services from "../../Utils/Services";
const Registration4 = () => {
const router=useRouter();
    const { fname, lname, email, phone, pass, college, branch, collegeEmail, roll, prn, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8 } = useLocalSearchParams();

    const [github, setGithub] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [cf, setcf] = useState("")
    const [cc, setcc] = useState("")
    const [leet, setLeet] = useState("")
    const [discord, setDiscord] = useState("")

    const submit = async () => {
        const fromData = {
            "fname": fname,
            "lname": lname,
            "email": email,
            "phone": phone,
            "password": pass,
            "collegename": college,
            "branch": branch,
            "rollno": roll,
            "prn": prn,
            "collegeemail": collegeEmail,
            "sem1": sem1,
            "sem2": sem2,
            "sem3": sem3,
            "sem4": sem4,
            "sem5": sem5,
            "sem6": sem6,
            "sem7": sem7,
            "sem8": sem8,
            "github": github,
            "linkedin": linkedin,
            "codechef": cc,
            "codeforces": cf,
            "leetcode": leet,
            "discord": discord
        };

        console.log(fromData);

        try {
            const response = await axios.post(
                `${BASE_URL}/signup`,
                fromData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            Alert.alert("Successful",response.data.inserted_id);
            router.push('/Loginform');
        } catch (error) {
            Alert.alert('Error occurred:', error.message);
        }
    };

    return (
        <>

            <ScrollView>
                <View style={styles.Lcontainer}>
                    <Text style={styles.textLarge}>Links</Text>
                    <View>
                        <Text style={styles.textSmall}>GitHub Link</Text>
                        <TextInput
                            placeholder="Enter your Github Link"
                            value={github}
                            onChangeText={(text) => setGithub(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>LinkedIn Link</Text>
                        <TextInput
                            placeholder="Enter your LinkedIn Link"
                            value={linkedin}
                            onChangeText={(text) => setLinkedin(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>Codechef Link</Text>
                        <TextInput
                            placeholder="Enter your CodeChef Link"
                            value={cc}
                            onChangeText={(text) => setcc(text)}
                            style={styles.textInput}
                            keyboardType="email-address"
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>CodeForces Link</Text>
                        <TextInput
                            placeholder="Enter your Codeforces Link"
                            value={cf}
                            onChangeText={(text) => setcf(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>Leetcode Link</Text>
                        <TextInput
                            placeholder="Enter your Leetcode Link"
                            value={leet}
                            onChangeText={(text) => setLeet(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>Discord Link</Text>
                        <TextInput
                            placeholder="Enter your Discord Link"
                            value={discord}
                            onChangeText={(text) => setDiscord(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => router.push('Signup/Registration3')}
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={submit}
                        >
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </>
    )
}

export default Registration4

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
        // marginRight: 10,
        marginLeft:5
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
        fontSize: 13,
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