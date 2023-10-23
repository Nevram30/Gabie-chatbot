import React from "react";
import { View, SafeAreaView, Text, Button, StyleSheet } from "react-native";
import CustomButton from "./components/ButtonProps";
import { auth } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
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
    // Navigate to the Chatbot screen
    navigation.navigate("Chatbot");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to ChatBot</Text>
        </View>
        <View style={styles.header}>
          <CustomButton
            style={styles.buttonStart}
            title="Start Chat Now"
            onPress={handleGetStarted}
          />
        </View>
      </SafeAreaView>

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
    width: "80%",
    height: 40,
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HomeScreen;
