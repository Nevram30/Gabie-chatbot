import React, { useState, useEffect} from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const RegisterAccount = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const auth = getAuth();

  const handleSignup = () => {
    if (!username || !password) {
      // Check for empty username or password fields
      alert('Signup Error: Username and password are required.');
      return;
    }
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('Signup Successful: Your account has been created.');
      useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged(() => {
            if (user) {
              <Text style={styles.label1}>${user.email}</Text>
              navigation.replace("Login");
            }
          });
      
          return unsubscribe;
        }, []);
    })
    .catch((error) => {
      alert("Account Not Created!"+ error.message);
    });
  };

  return (
    <ScrollView>
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

        <TouchableOpacity
          style={styles.createbutton}
          onPress={handleSignup}
        >
          <Text style={styles.createtext}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  label1: {
    fontWeight: "normal",
    fontSize: 15,
    marginTop: 9,
    justifyContent: "center",
  },
  signupcontainer: {
    padding: 10,
    marginTop: 1,
    margin: 15,
  },
  input1: {
    height: 45,
    borderColor: "gray",
    borderWidth: 2,
    marginTop: 10,
    padding: 15,
    fontSize: 13,
    borderRadius: 10,
  },
  createbutton: {
    backgroundColor: "blue",
    height: 40,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  createtext: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
});
