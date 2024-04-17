import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import login from "../../assets/start.png";
import Colors from "../../Utils/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Services from "../../Utils/Services";
import { useRouter } from "expo-router";
export default function Login() {
  const router=useRouter();
  const features = [
    { text: "Personalized Timetables", icon: "calendar" },
    { text: "PDF Merging", icon: "file-pdf-o" },
    { text: "YouTube Summaries", icon: "youtube-play" },
    { text: "Budget Tracking", icon: "dollar" },
    { text: "Learning System", icon: "book" },
  ];

  const handlesignin=async()=>{
    await Services.storeData("login","true");
    await Services.storeData("email","sappaljagjeet@gmail.com");
    alert("You have login in successfully");
    router.push('/');
  }
  return (
    <View style={styles.container}>
      <Image source={login} style={styles.bgimage} />
      <View style={styles.overlay}>
        <Text style={styles.title}>StudApp</Text>
        <Text style={styles.subtitle}>
          Streamline Your Student Life: Your All-in-One Study Companion!
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>handlesignin()}>
          <Text style={styles.buttonText}>Login/Signup</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <TouchableOpacity key={index} style={styles.featureItem}>
                <Icon name={feature.icon} size={20} color={Colors.White} style={styles.featureIcon} />
                <Text style={styles.featureText}>{feature.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  bgimage: {
    width: 200,
    height: 400,
    marginTop: 30,
    borderWidth: 5,
  },
  overlay: {
    backgroundColor: "#8B42FC",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -60,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: Colors.Primary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    color: Colors.White,
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.White,
    padding: 15,
    borderRadius: 50,
    marginTop: 30,
    width: 200,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 15,
    textAlign: "center",
    backgroundColor: Colors.White,
    borderRadius: 50,
  },
  scrollViewContent: {
    marginTop: 30,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%"
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "50%", 
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    color: Colors.White,
    fontSize: 16,
    flexWrap: "wrap",
    width: "80%",
  },
});
