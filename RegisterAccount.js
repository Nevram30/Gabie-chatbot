import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import PrivacyCheckbox from "./PrivacyCheckbox";

const RegisterAccount = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const auth = getAuth();

  const handleSignup = () => {
    if (!username || !password) {
      alert("Signup Error: Username and password are required.");
      return;
    }

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber
    ) {
      alert(
        "Signup Error: Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (!privacyChecked) {
      alert("Signup Error: You must agree to the privacy policy.");
      return;
    }

    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Signup Successful: Your account has been created.");
        useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged(() => {
            if (user) {
              navigation.replace("Login");
            }
          });
          return unsubscribe;
        }, []);
      })
      .catch((error) => {
        alert("Account Not Created!" + error.message);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.signupHeader}>Create Account</Text>
      </View>
      <View style={styles.signupcontainer}>
        <Text style={styles.label1}>Email:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label1}>Password:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label1}>Confirm Password:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmpassword}
          onChangeText={setConfirmpassword}
        />

        <PrivacyCheckbox
          checked={privacyChecked}
          onPress={() => setPrivacyChecked(!privacyChecked)}
        />

        <TouchableOpacity style={styles.createbutton} onPress={handleSignup}>
          <Text style={styles.createtext}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
  },
  signupcontainer: {
    padding: 10,
    marginTop: 5,
    margin: 15,
  },
  signupHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 50,
    marginLeft: 22,
  },
  label1: {
    fontWeight: "normal",
    fontSize: 15,
    marginTop: 9,
    justifyContent: "center",
  },
  input1: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 15,
    fontSize: 13,
    borderRadius: 10,
  },
  createbutton: {
    backgroundColor: "blue",
    height: 40,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  createtext: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
});
