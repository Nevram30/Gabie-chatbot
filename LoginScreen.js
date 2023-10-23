import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { auth } from "./firebaseConfig"; 
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
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
    .catch((error) => console.error("Login Error:", error));
  };

const handleSignup = () => {
  createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    const user = userCredential.user;
          useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(() => {
          if (user) {
            navigation.replace("Home");
          }
        });
    
        return unsubscribe;
      }, []);
  })
  .catch((error) => console.error("Login Error:", error));
};

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/images/chat-bot.jpg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login to Chatbot</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
});

export default LoginScreen;
