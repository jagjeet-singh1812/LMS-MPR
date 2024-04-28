import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const Registration3 = () => {
   const router=useRouter();
    const { fname, lname, email, phone, pass, college, branch, collegeEmail, roll, prn } = useLocalSearchParams();

    const [sem1, setSem1] = useState("")
    const [sem2, setSem2] = useState("")
    const [sem3, setSem3] = useState("")
    const [sem4, setSem4] = useState("")
    const [sem5, setSem5] = useState("")
    const [sem6, setSem6] = useState("")
    const [sem7, setSem7] = useState("")
    const [sem8, setSem8] = useState("")

    const next = () => {
        router.push({
            pathname: "/Signup/Registration4",
            params: { fname: fname,
                lname: lname,
                email: email,
                phone: phone,
                pass: pass,
                college: college,
                branch: branch,
                collegeEmail: collegeEmail,
                roll: roll,
                prn: prn,
                sem1: sem1,
                sem2: sem2,
                sem3: sem3,
                sem4: sem4,
                sem5: sem5,
                sem6: sem6,
                sem7: sem7,
                sem8: sem8},
          });
    }

    return (
        <>

            <ScrollView>
                <View style={styles.Lcontainer}>
                    <Text style={styles.textLarge}>CGPA Details</Text>
                    <View>
                        <Text style={styles.textSmall}>SEM 1</Text>
                        <TextInput
                            placeholder="Enter your SEM 1 CGPA"
                            value={sem1}
                            onChangeText={(text) => setSem1(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 2</Text>
                        <TextInput
                            placeholder="Enter your SEM 2 CGPA"
                            value={sem2}
                            onChangeText={(text) => setSem2(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 3</Text>
                        <TextInput
                            placeholder="Enter your SEM 3 CGPA"
                            value={sem3}
                            onChangeText={(text) => setSem3(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 4</Text>
                        <TextInput
                            placeholder="Enter your SEM 4 CGPA"
                            value={sem4}
                            onChangeText={(text) => setSem4(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 5</Text>
                        <TextInput
                            placeholder="Enter your SEM 5 CGPA"
                            value={sem5}
                            onChangeText={(text) => setSem5(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 6</Text>
                        <TextInput
                            placeholder="Enter your SEM 6 CGPA"
                            value={sem6}
                            onChangeText={(text) => setSem6(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 7</Text>
                        <TextInput
                            placeholder="Enter your SEM 7 CGPA"
                            value={sem7}
                            onChangeText={(text) => setSem7(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textSmall}>SEM 8</Text>
                        <TextInput
                            placeholder="Enter your SEM 8 CGPA"
                            value={sem8}
                            onChangeText={(text) => setSem8(text)}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => router.push('Signup/Registration2')}
                        >
                            <Text style={styles.btnText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={next}
                        >
                            <Text style={styles.btnText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </>
    )
}

export default Registration3


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
        fontSize: 15,
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