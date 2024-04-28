import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { supabase } from "../Utils/Config";
import * as ExpoFileSystem from "expo-file-system";
import { Platform } from "react-native"
import { decode } from "base-64";
export default function DocumentPickerComponent() {
  const [selectedFileURI, setSelectedFileURI] = useState(null);
  const [base, setbase] = useState(null);

  const addit = async (base64Data) => {
    const nn = Date.now();
    try {
      // const bytes = decode(base64Data);
      const { data, error } = await supabase.storage
        .from("Items_Image")
        .upload(nn + ".pdf", base64Data, {
          contentType: "application/pdf",
        });
      console.log("File uploaded successfully:", data);
      if (data) console.log(data);
      else console.log("error", error);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const [assignmentUri, setAssignmentUri] = useState(null);
  const [codeUri, setCodeUri] = useState(null);
  const webViewRef = useRef(null);
  const [isloaded, setloaded] = useState(false);
  const readPdfAsBase64 = async (fileUri) => {
    try {
      // const base64Data = await FileSystem.readAsStringAsync(fileUri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      const base64Data = await ExpoFileSystem.readAsStringAsync(fileUri);
      console.log(base64Data);
      return base64Data;
    } catch (error) {
      console.log("Error reading PDF file:", error);
      throw error;
    }
  };

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      

      console.log(result);
      if (result.canceled === false) {
        let fileContent = null;
      if (Platform.OS === "android") {
        fileContent = await ExpoFileSystem.readAsStringAsync(
          result.assets[0].uri,
          { encoding: ExpoFileSystem.EncodingType.UTF8 }
        );
        console.log(fileContent);
      }
        const fileUri = result.assets[0].uri;
        const base64Data = await readPdfAsBase64(fileUri);
        // console.log(base64Data);
        setbase(base64Data);

        if (type === "assignment") {
          setAssignmentUri(fileUri);
        } else if (type === "code") {
          setCodeUri(fileUri);
        }
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const openDocument = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      console.log(fileInfo, uri);
      if (fileInfo.exists) {
        const pdfUri = fileInfo.uri;
        setCodeUri(pdfUri);
        setloaded(true);
      } else {
        console.log("File does not exist:", uri);
      }
    } catch (error) {
      console.log("Error opening document:", error);
    }
  };

  const upload = async () => {
    await addit(base);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => pickDocument("assignment")}
      >
        <FontAwesome
          name="file-pdf-o"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.inputText}>Select Written Assignment PDF</Text>
      </TouchableOpacity>

      {assignmentUri && (
        <>
          <Text>ha ha you found the assignment!</Text>
          <TouchableOpacity style={styles.viewButton} onPress={() => upload()}>
            <Text style={styles.viewButtonText}>Upload</Text>
          </TouchableOpacity>
        </>
      )}

      {/* <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => pickDocument("code")}
      >
        <FontAwesome
          name="file-pdf-o"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.inputText}>Select Code/Output PDF</Text>
      </TouchableOpacity> */}

      {codeUri && (
        <WebView
          source={{
            uri: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
          }}
          style={{ flex: 1, width: "100%" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  viewButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  viewButtonText: {
    color: "white",
    fontSize: 16,
  },
});
