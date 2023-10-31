import React, { useEffect, useState } from "react";
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
      .catch(() => {
        alert("Please fill your username and password!");
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/images/chat-bot.jpg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome! Hi I'm Gabie</Text>
      <Text style={{marginBottom: 10}}>
        Login and register to help you answer your queries
      </Text>
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
        <Text style={styles.loginButtonText}>Login as User</Text>
      </TouchableOpacity>
      <View style={{marginBottom: 10}}>
        <Text style={{ color: "blue" }}>Login as admin</Text>
      </View>
      <Text>
        Do you have an account?{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
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
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
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
