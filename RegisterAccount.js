import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import PrivacyCheckbox from "./PrivacyCheckbox";

const RegisterAccount = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyErrorModalVisible, setPrivacyErrorModalVisible] =
    useState(false);
  const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const auth = getAuth();

  const handleSignup = () => {
    if (isLoading) {
      return;
    }

    if (!username || !password || password !== confirmpassword) {
      alert("Signup Error: Username and password are required.");
      return;
    }

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidUsername = (username) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(username);
    };

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber
    ) {
      setPasswordError(
        "Signup Error: Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    } else {
      setPasswordError("");
    }

    if (!isValidUsername(username)) {
      setUsernameError("Signup Error: Invalid email format.");
      return;
    } else {
      setUsernameError("");
    }

    if (!privacyChecked) {
      setPrivacyErrorModalVisible(true);
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Signup Successful: Your account has been created.");

        // Directly log in after successful account creation
        signInWithEmailAndPassword(auth, username, password)
          .then(() => {
            alert("Login Successful: You have been logged in.");
            // Navigate to the desired screen after login (replace 'Home' with your screen name)
            navigation.replace("Login");
          })
          .catch((error) => {
            alert("Login Error!" + error.message);
          });
      })
      .catch((error) => {
        alert("Account Not Created!" + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleContinuePrivacy = () => {
    setHasAgreedToPrivacy(true); // Update the state to indicate the user has agreed to the privacy policy
    setPrivacyErrorModalVisible(false); // Close the modal
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.mainContainer}>
        <Image
          source={require("./assets/images/gtcd.png")}
          style={{ width: 130, height: 130 }}
        />
      </View>
      <View style={styles.signupcontainer}>
        <Text style={styles.signupHeader}>Signup</Text>
        <Text style={styles.label1}>Email:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          placeholderTextColor="gray"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setUsernameError("");
          }}
        />
        <Text style={styles.errorText}>{usernameError}</Text>

        <Text style={styles.label1}>Password:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
        />
        <Text style={styles.errorText}>{passwordError}</Text>

        <Text style={styles.label1}>Confirm Password:</Text>
        <TextInput
          style={styles.input1}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmpassword}
          onChangeText={setConfirmpassword}
        />

        {!hasAgreedToPrivacy && ( // Render the PrivacyCheckbox only if the user hasn't agreed to the privacy policy
          <PrivacyCheckbox
            checked={privacyChecked}
            onPress={() => setPrivacyChecked(!privacyChecked)}
          />
        )}

        <TouchableOpacity
          style={styles.createbutton}
          disabled={isLoading}
          onPress={handleSignup}
        >
          {isLoading ? (
            <ActivityIndicator color="#292C33" size="small" />
          ) : (
            <Text style={styles.createtext}>Create Account</Text>
          )}
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={privacyErrorModalVisible}
          onRequestClose={() => setPrivacyErrorModalVisible(false)}
        ></Modal>
      </View>
    </ScrollView>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signupcontainer: {
    padding: 30,
    marginTop: 50,
    backgroundColor: "#A9A9A9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  signupHeader: {
    fontWeight: "bold",
    color: "white",
    fontSize: 26,
    paddingTop: 5,
    paddingBottom: 20,
  },
  label1: {
    fontWeight: "normal",
    fontSize: 15,
    marginTop: 0,
    color: "white",
    justifyContent: "center",
  },
  input1: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 5,
    padding: 15,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "white",
  },
  createbutton: {
    backgroundColor: "#D0291C",
    height: 50,
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  createtext: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  errorText: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: 250,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  modalCloseButton: {
    backgroundColor: "#D0291C",
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "white",
  },
});
