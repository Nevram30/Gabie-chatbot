import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => (alert = { error, message }));
  };

  const handleGetStarted = () => {
    navigation.navigate("Chatbot");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>
            Welcome to Gabriel Taborin Colege of Davao
            User's Tuitorial's
          </Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity style={styles.loginButton} onPress={handleGetStarted}>
        <Text style={styles.loginButtonText}>Start Chat Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignOut}>
        <Text style={styles.loginButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 60,
  },
  title: {},
  buttonStart: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "blue",
    width: "100%",
    height: 40,
    borderRadius: 20,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});

