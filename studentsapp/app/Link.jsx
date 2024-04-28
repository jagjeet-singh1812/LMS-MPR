import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from '@react-navigation/native';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { BASE_URL } from "../Utils/global";
  
  const ProfileLinks = () => {
  
    const navigation = useNavigation();
  
    const [id, setId] = useState('');
    const [stud, setStud] = useState({});
  
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
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
  
    return (
      <>
  
        <ScrollView>
          <View style={styles.Lcontainer}>
            <Text style={styles.textLarge}>Links</Text>
            <View>
              <Text style={styles.textSmall}>GitHub Link</Text>
              <TextInput
                placeholder="Enter your Github Link"
                value={stud.github}
                // onChangeText={(text) => setGithub(text)}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.textSmall}>LinkedIn Link</Text>
              <TextInput
                placeholder="Enter your LinkedIn Link"
                value={stud.linkedin}
                // onChangeText={(text) => setLinkedin(text)}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.textSmall}>Codechef Link</Text>
              <TextInput
                placeholder="Enter your CodeChef Link"
                value={stud.codechef}
                // onChangeText={(text) => setcc(text)}
                style={styles.textInput}
                keyboardType="email-address"
              />
            </View>
            <View>
              <Text style={styles.textSmall}>CodeForces Link</Text>
              <TextInput
                placeholder="Enter your Codeforces Link"
                value={stud.codeforces}
                // onChangeText={(text) => setcf(text)}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.textSmall}>Leetcode Link</Text>
              <TextInput
                placeholder="Enter your Leetcode Link"
                value={stud.leetcode}
                // onChangeText={(text) => setLeet(text)}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.textSmall}>Discord Link</Text>
              <TextInput
                placeholder="Enter your Discord Link"
                value={stud.discord}
                // onChangeText={(text) => setDiscord(text)}
                style={styles.textInput}
              />
            </View>
            
          </View>
        </ScrollView>
  
      </>
    )
  }
  
  export default ProfileLinks
  
  const styles = StyleSheet.create({
    Lcontainer: {
      flex: 1,
      alignContent: "center",
      padding: 20,
      paddingTop: 10,
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