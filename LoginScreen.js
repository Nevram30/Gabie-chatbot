import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const unsubscribe = auth.onAuthStateChanged(() => {
          if (user) {
            navigation.replace("Home");
          }
        });

        return unsubscribe;
      })
      .catch(() => {
        alert("Please fill your username and password!");
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("./assets/images/gtcd.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Gabie Chatbot</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subHeader}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.accountHeader}>
          Do you have an account?{" "}
          <Text
            style={{ color: "white" }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#585E6C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subHeader:{
    padding: 20,
    fontSize: 26,
    marginRight: 200,
    marginTop: 10,
    color: "white"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "#D0291C",
    width: "80%",
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  loginModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  accountHeader:{
    color: "white"
  }
});
