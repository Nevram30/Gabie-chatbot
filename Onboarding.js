import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import Poppins from "./assets/fonts/Poppins-Regular.ttf";

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <Swiper showsButtons={true}>
      <View style={styles.slide}>
        <Image source={require("./assets/images/animation1.png")} />
        <Text style={styles.title}>Hi! Welcome to GTCD Chatbot App</Text>
        <Text style={styles.subtitle}>Discover chatbot app</Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("./assets/images/animation2.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>The name of the chatbot is Gabie</Text>
        <Text style={styles.subtitle}>
          Gabie is the chatbot app for Gabriel Taborin College of Davao for
          school inqueries
        </Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("./assets/images/animation3.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>
          just click the get started to chat with me see you then
        </Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    padding: 25,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  getStartedButton: {
    backgroundColor: "#D0291C",
    width: "80%",
    height: 50,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedText: {
    color: "white",
    fontSize: 16,
  },
});
