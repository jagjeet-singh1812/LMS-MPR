// import React, { useState, useRef } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import { FontAwesome } from "@expo/vector-icons";
// import * as FileSystem from "expo-file-system";
// import { WebView } from "react-native-webview";
// import PDFView from 'react-native-view-pdf';
// import Colors from "../../Utils/Colors";

// export default function DocumentPickerComponent() {
//   const [assignmentUri, setAssignmentUri] = useState(null);
//   const [codeUri, setCodeUri] = useState(null);
//   const webViewRef = useRef(null);
//   const [name,setname]=useState("");

//   const pickDocument = async (typ) => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "application/pdf"

//       });

//       console.log(result);
//       if (result.canceled==false) {
//         console.log(result.assets[0].name);
//         setname(result.assets[0].name);
//         const fileUri = result.assets[0].uri;

//         if (typ === "assignment") {
//           setAssignmentUri(fileUri);
//           console.log(fileUri);
//           console.log(assignmentUri)
//         } else if (typ=== "code") {
//           setCodeUri(fileUri);
//           console.log(fileUri);
//           console.log(assignmentUri);
//         }
//       }
//     } catch (error) {
//       console.log("Error picking document:", error);
//     }
//   };

//   const openDocument = async (uri) => {
//     try {
//       const fileInfo = await FileSystem.getInfoAsync(uri);
//       if (fileInfo.exists) {
//         setAssignmentUri(uri);
//         webViewRef.current.reload();
//       }
//     } catch (error) {
//       console.log("Error opening document:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {!assignmentUri ? (
//         <TouchableOpacity
//           style={styles.inputContainer}
//           onPress={() => pickDocument("assignment")}
//         >
//           <FontAwesome
//             name="file-pdf-o"
//             size={24}
//             color="black"
//             style={styles.icon}
//           />
//           <Text style={styles.inputText}>Select Written Assignment PDF</Text>
//         </TouchableOpacity>
//       ) : (
//         <View style={{width: "80%"}}>
//           <View style={styles.inner}>

//             <Text>{name}</Text>
//           </View>
//         </View>
//       )}

//       <TouchableOpacity
//         style={styles.inputContainer}
//         onPress={() => pickDocument("code")}
//       >
//         <FontAwesome
//           name="file-pdf-o"
//           size={24}
//           color="black"
//           style={styles.icon}
//         />
//         <Text style={styles.inputText}>Select Code/Output PDF</Text>
//       </TouchableOpacity>

//       {codeUri && (
//         <>
//           <TouchableOpacity
//             style={styles.viewButton}
//             onPress={() => openDocument(codeUri)}
//           >
//             <Text style={styles.viewButtonText}>View Code/Output PDF</Text>
//           </TouchableOpacity>
//           <WebView
//             ref={webViewRef}
//             source={{ uri: codeUri }}
//             style={{ flex: 1, width: "100%" }}
//           />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   inner:{
//     borderColor:Colors.Black,
//     borderWidth:2,
//     padding:10,
//     height:'50%',
//     elevation:2,
//     borderRadius:25
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     borderRadius: 10,
//     width: "100%",
//     marginBottom: 20,
//   },
//   inputText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   viewButton: {
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   viewButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ChatFaceData from "../../Utils/chatface.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Utils/Colors.jsx";
export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState([]);
  const navgitaion = useNavigation();
  useEffect(() => {
    setChatFaceData(ChatFaceData);
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem("chatFaceId");
    id
      ? setSelectedChatFace(ChatFaceData[id])
      : setSelectedChatFace(ChatFaceData[0]);

    console.log(selectedChatFace);
  };

  const onChatFacePress = async (id) => {
    setSelectedChatFace(ChatFaceData[id - 1]);
    await AsyncStorage.setItem("chatFaceId", (id - 1).toString());
  };
  return (
    <View style={{ alignItems: "center", paddingTop: 90 }}>
      <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30 }]}>
        Hello,
      </Text>
      <Text
        style={[
          { color: selectedChatFace?.primary },
          { fontSize: 30, fontWeight: "bold" },
        ]}
      >
        I am {selectedChatFace.name}
      </Text>
      <Image
        source={{ uri: selectedChatFace.image }}
        style={{ height: 150, width: 150, marginTop: 20 }}
      />
      <Text style={{ marginTop: 30, fontSize: 25 }}>How Can I help you? </Text>
      <Text style={{ fontSize: 16, color: "#666" }}>{selectedChatFace.description}</Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: Colors.White,
          elevation: 4,
          alignItems: "center",
          height: 110,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            item.id != selectedChatFace.id && (
              <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => onChatFacePress(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            )
          }
        />
        <Text style={{ marginTop: 5, fontSize: 17, color: "#B0B0B0" }}>
          Choose Your Fav ChatBuddy
        </Text>
      </View>
      <TouchableOpacity
        style={[
          { backgroundColor: selectedChatFace.primary },
          {
            marginTop: 40,
            padding: 17,
            width: Dimensions.get("screen").width * 0.6,
            borderRadius: 100,
            alignItems: "center",
          },
        ]}
        onPress={() => navgitaion.navigate("Chatscreen/index")}
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
