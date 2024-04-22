import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import * as Speech from "expo-speech";
import { GoogleGenerativeAI } from "@google/generative-ai";
export default function YouTubeSummarizer() {
  const API_KEY = "AIzaSyAqu8gVHmRu4z0ZR3CszNf1n6dScysDkJ4";

  const genAI = new GoogleGenerativeAI(API_KEY);
   const [changedit, setchangedit] = useState(false);
  const [textd, settext] = useState("");
  const [sum, setSum] = useState("");
  const [t, st] = useState(false);
  const [speakingTask, setSpeakingTask] = useState(null);
  const genSum = async (video_id) => {
    await axios
      .get(`http://192.168.1.8:3001//?video_id=${video_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setSum("Response:", response.data.text);
        summarizeText(response.data.text);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const speak = async (text) => {
    try {
      const speaking = Speech.speak(text, {
        onDone: () => {
          console.log("Speech finished");
          setSpeakingTask(null);
        },
        onStopped: () => {
          console.log("Speech stopped");
          setSpeakingTask(null);
        },
        onError: (error) => {
          console.error("Error speaking text:", error);
          setSpeakingTask(null);
        },
      });
      setSpeakingTask(speaking);
    } catch (error) {
      console.error("Error speaking text:", error);
    }
  };
  
  const stopSpeaking = () => {
      Speech.stop();
  };
  
  
  
  const summarizeText = async (text) => {
    try {
      st(false);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `give summary of the text such that could be understand by 5 years child the text is ${text}.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const textt = response.text();
      console.log(textt);
      settext(textt);
      st(true);
    } catch (error) {
      console.error("Error generating summary:", error.message);
    }
  };

  const [videoIdx, setVideoIdx] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const extractVideoId = (url) => {
    const match = url.match(
      /(?:\?v=|\/embed\/|\/\d+\/|\/v\/|\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

 

  const fetchThumbnailAndSummary = async () => {
    setLoading(true);
    // stopSpeaking();
    const id = extractVideoId(videoIdx);
    console.log(id);
    try {
      await genSum(id);
      //   const response =genSum(id);
      //   const { thumbnailUrl, videoSummary } = response.data;
      await summarizeText(sum);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      speak(textd);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
     
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YouTube Summarizer</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter YouTube Video Link"
        value={videoIdx}
        onChangeText={(text) => setVideoIdx(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={fetchThumbnailAndSummary}
      >
        <Text style={styles.buttonText}>Summarize</Text>
      </TouchableOpacity>
      {textd && (
        <TouchableOpacity
          onPress={() => {
            console.log("stop");
            stopSpeaking();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Stop the Speech</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={{height:'50%'}}>
            {textd ? (
              <Animated.Text style={[styles.summary, { opacity: fadeAnim }]}>
                {textd}
              </Animated.Text>
            ) : null}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: "20%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  thumbnail: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  summary: {
    fontSize: 20,
    textAlign: "center",
  },
  loader: {
    marginTop: 20,
  },
});
