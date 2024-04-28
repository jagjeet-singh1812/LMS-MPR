import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Utils/global";

const Cgpa = () => {


    const [id, setId] = useState('');
    const [stud, setStud] = useState({});
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        getid();
    }, []);

    useEffect(() => {
        if (id !== '') {
            fetchStud();
        }
    }, [id]);

    const getid = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                setId(userId);
            }
        } catch (error) {
            console.error('Error getting user ID from AsyncStorage:', error);
        }
    }

    const fetchStud = async () => {
        try {
            const response = await fetch(`${BASE_URL}/getStudent/${id}`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setStud(data);
                setAvg(((parseFloat(data.sem1) + parseFloat(data.sem2) + parseFloat(data.sem3) + parseFloat(data.sem4) + parseFloat(data.sem5) + parseFloat(data.sem6) + parseFloat(data.sem7) + parseFloat(data.sem8)) / 8).toFixed(1))
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const calPercent = (cgpa) => {
        const percent = (7.4 * parseFloat(cgpa)) + 12;
        return percent.toFixed(1)
    }

    return (
        <>
            <ScrollView>
                <View style={styles.Lcontainer}>
                    {/* <Text style={styles.textLarge}>CGPA Details</Text> */}
                    <View style={styles.headView}>
                        <Text style={styles.textSmall}>SEMES</Text>
                        <Text style={styles.textSmall}>CGPA</Text>
                        <Text style={styles.textSmall}>PERCENT</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 1</Text>
                        <Text style={styles.textSmall}>{stud.sem1}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem1)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 2</Text>
                        <Text style={styles.textSmall}>{stud.sem2}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem2)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 3</Text>
                        <Text style={styles.textSmall}>{stud.sem3}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem3)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 4</Text>
                        <Text style={styles.textSmall}>{stud.sem4}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem4)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 5</Text>
                        <Text style={styles.textSmall}>{stud.sem5}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem5)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 6</Text>
                        <Text style={styles.textSmall}>{stud.sem6}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem6)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 7</Text>
                        <Text style={styles.textSmall}>{stud.sem7}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem7)}%</Text>
                    </View>
                    <View style={styles.singleView}>
                        <Text style={styles.textSmall}>SEM 8</Text>
                        <Text style={styles.textSmall}>{stud.sem8}</Text>
                        <Text style={styles.textSmall}>{calPercent(stud.sem8)}%</Text>
                    </View>
                    <View style={styles.headView}>
                        <Text style={styles.textSmall}>  AVG     </Text>
                        <Text style={styles.textSmall}>{avg}   </Text>
                        <Text style={styles.textSmall}>{calPercent(avg)}%</Text>
                    </View>


                    
                </View>
            </ScrollView>

        </>
    )
}

export default Cgpa

const styles = StyleSheet.create({
    Lcontainer: {
        flex: 1,
        alignContent: "center",
        padding: 20,
        paddingTop: 80,
    },
    textSmall: {
        fontSize: 20,
        fontWeight: "600",
    },
    textLarge: {
        fontSize: 32,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 40,
        marginTop: 20
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
    singleView: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 10,
        gap: 80,
        marginTop: 20,
        marginBottom: 20
    },
    headView: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 10,
        gap: 65,
        // marginTop: 20,
        marginBottom: 20
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
        width: 375,
        borderRadius: 10,
        shadowOffset: { width: -3, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 30,
    },
    btn: {
        backgroundColor: "rgb(110, 142, 251)",
        paddingHorizontal: 170,
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