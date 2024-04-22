import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function DocumentPickerComponent() {
  const [assignmentUri, setAssignmentUri] = useState(null);
  const [codeUri, setCodeUri] = useState(null);
  const webViewRef = useRef(null);

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      console.log(result.assets[0].uri)
      if (result.type === 'success') {
          const fileUri =result.assets[0].uri;
        if (type === 'assignment') {
          setAssignmentUri(fileUri);
        } else if (type === 'code') {
          setCodeUri(fileUri);
        }
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const openDocument = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        webViewRef.current.reload();
      }
    } catch (error) {
      console.log('Error opening document:', error);
    }
  };

  return (
    <View style={styles.container}>
        {assignmentUri==""&&
      <TouchableOpacity style={styles.inputContainer} onPress={() => pickDocument('assignment')}>
        <FontAwesome name="file-pdf-o" size={24} color="black" style={styles.icon} />
        <Text style={styles.inputText}>Select Written Assignment PDF</Text>
      </TouchableOpacity>
}
      {assignmentUri && (
        <>
        <Text>ha  ha you found the assignment!</Text>
          <TouchableOpacity style={styles.viewButton} onPress={() => openDocument(assignmentUri)}>
            <Text style={styles.viewButtonText}>View Assignment PDF</Text>
          </TouchableOpacity>
          <WebView
            ref={webViewRef}
            source={{ uri: assignmentUri }}
            style={{ flex: 1, width: '100%' }}
          />
        </>
      )}
      <WebView
            ref={webViewRef}
            source={{ uri: assignmentUri }}
            style={{ flex: 1, width: '100%' }}
          />

      <TouchableOpacity style={styles.inputContainer} onPress={() => pickDocument('code')}>
        <FontAwesome name="file-pdf-o" size={24} color="black" style={styles.icon} />
        <Text style={styles.inputText}>Select Code/Output PDF</Text>
      </TouchableOpacity>

      {codeUri && (
        <>
          <TouchableOpacity style={styles.viewButton} onPress={() => openDocument(codeUri)}>
            <Text style={styles.viewButtonText}>View Code/Output PDF</Text>
          </TouchableOpacity>
          <WebView
            ref={webViewRef}
            source={{ uri: codeUri }}
            style={{ flex: 1, width: '100%' }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    width: '100%',
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
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
