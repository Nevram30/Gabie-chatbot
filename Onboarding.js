import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  
  const navigation = useNavigation();

  return (
    <Swiper showsButtons={true}>
      {/* First Onboarding Screen */}
      <View style={styles.slide}>
        <Icon name="ios-information-circle" size={100} color="blue" />
        <Text style={styles.title}>Hi! Welcome to</Text>
        <Text style={styles.title}>Gabbie Chatbot App</Text>
        <Text style={styles.subtitle}>Discover amazing features</Text>
      </View>

      {/* Second Onboarding Screen */}
      <View style={styles.slide}>
        <Icon name="ios-heart" size={100} color="red" />
        <Text style={styles.title}>Like and Share</Text>
        <Text style={styles.subtitle}>Show your love for the app</Text>
      </View>

      {/* Third Onboarding Screen */}
      <View style={styles.slide}>
        <Icon name="ios-checkmark-circle" size={100} color="green" />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>Let's begin the journey</Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.replace("Login")} // Navigate to the Login screen
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

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
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
  getStartedButton: {
    backgroundColor: "blue",
    width: "80%",
    height: 40,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedText:{
    color: "white",
    fontSize: 16,
  }
});

export default OnboardingScreen;
