import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ForgotPassword from "./ForgotPassword";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const sessionToken = await AsyncStorage.getItem("sessionToken");
    if (sessionToken) {
      navigation.replace("Home");
    }
  };

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const unsubscribe = auth.onAuthStateChanged(() => {
          setTimeout(() => {
            setLoading(false);
            if (user) {
              AsyncStorage.setItem("sessionToken", "your_session_token_here");
              navigation.replace("Home");
            }
          }, 500);
        });

        return unsubscribe;
      })
      .catch(() => {
        alert("Please fill in your username and password!");
        setLoading(false);
      });
  };

  // const handleForgotPassword = () => {
  //   auth
  //     .sendPasswordResetEmail(username)
  //     .then(() => {
  //       alert("Password reset email sent!");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("./assets/images/gtcd.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>GabbY Chatbot</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subHeader}>Sign In</Text>
        <TextInput
          style={styles.inputname}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.inputpass}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.forgotPass}
          onPress={() =>
            navigation.navigate("ForgotPassword", { userEmail: username })
          }
        >
          <Text style={styles.forgotPassText}>Forgot your Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#ffff" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.accountHeader}>
          Do you have an account?{" "}
          <Text
            style={{ color: "#D0291C" }}
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
    backgroundColor: "#A9A9A9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subHeader: {
    padding: 20,
    fontSize: 26,
    marginRight: 200,
    marginTop: 10,
    color: "white",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  inputname: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: "white",
    fontSize: 15,
  },
  inputpass: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 0,
    padding: 8,
    backgroundColor: "white",
    fontSize: 15,
  },
  forgotPass: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: 10,
  },
  forgotPassText: {
    color: "white",
  },
  loginButton: {
    backgroundColor: "#D0291C",
    width: "80%",
    height: 55,
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
  accountHeader: {
    color: "white",
  },
});
