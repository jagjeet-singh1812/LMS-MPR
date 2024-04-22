import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
export default function UtilityPage() {
const router=useRouter();
  const features = [
    {
      title: "PDF Merge",
      description: "Merge multiple PDF files into one.",
      icon: require("../../assets/pdf_merge.png"),
      onPress: () => router.push("PdfMerge"),
    },
    {
      title: "Expense Tracker",
      description: "Track and manage your expenses.",
      icon: require("../../assets/expenses.png"),
      onPress: () => router.push("Expense"),
    },
    {
      title: "YouTube Summarizer",
      description: "Summarize YouTube videos.",
      icon: require("../../assets/summar.png"),
      onPress: () => router.push("Youtubesummary"),
    },
  ];

  return (
    <View style={styles.container}>
      {features.map((feature, index) => (
        <TouchableOpacity
          key={index}
          style={styles.featureItem}
          onPress={feature.onPress}
        >
          <Image source={feature.icon} style={styles.featureIcon} />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    marginTop:20
  },
  featureItem: {
    flexDirection: "column",
    alignItems: "center",
    height:'31%',
    marginBottom: 20,
    padding: 10, // Increased padding for larger card/tab
    borderRadius: 15, // Increased border radius for rounded corners
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: '30%', 
    height: '40%', 
    marginRight: 20, 
    borderRadius: 15,
    objectFit: "cover",
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20, 
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  featureDescription: {
    fontSize: 16, 
    color: "#666",
  },
});
