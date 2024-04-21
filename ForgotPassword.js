import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getAuth } from "firebase/auth";

export default function ForgotPassword({ userEmail }) {
  const [email, setEmail] = useState(userEmail);
  const [message, setMessage] = useState("");

  const handleForgotPassword = () => {
    const auth = getAuth();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setMessage("Password reset email sent!");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#D0291C",
    width: "80%",
    height: 55,
    borderRadius: 20,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    color: "red",
  },
});
