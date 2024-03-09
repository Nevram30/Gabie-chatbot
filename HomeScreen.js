import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { auth } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isloading, isSetLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  AsyncStorage.setItem("userEmail", userEmail);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleSignOut = () => {
    isSetLoading(true);
    auth
      .signOut()
      .then(() => {
        AsyncStorage.removeItem("sessionToken");
        setTimeout(() => {
          isSetLoading(false);
          navigation.replace("Login");
        }, 500);
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Chatbot");
    }, 500);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>
          {userEmail && (
            <Text style={styles.title}>Logged in as: {userEmail}</Text>
          )}
        </Text>
        <View style={{ paddingTop: 30 }}>
          <Text style={[styles.title, { fontSize: 18, fontWeight: "600" }]}>
            How to use
          </Text>
          <Text style={[styles.title, { marginTop: 4 }]}>
            Please scroll the image below to see User's Tuitorial's
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.subContainer}>
          <SafeAreaView>
            <Image
              source={require("./assets/images/user-guide-1.png")}
              style={{ width: 300, height: 300, borderRadius: 20 }}
              resizeMode="contain"
            />
            <Image
              source={require("./assets/images/user-guide-2.png")}
              style={{ width: 300, height: 300, borderRadius: 20 }}
              resizeMode="contain"
            />
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView style={styles.activeButtons}>
          <View
            style={{
              backgroundColor: "gray",
              borderRadius: 15,
              padding: 15,
            }}
          >
            <View style={styles.profileChat}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 60,
                  marginTop: 10,
                  width: 60,
                  height: 60,
                }}
              >
                <Image
                  source={require("./assets/images/avatar.png")}
                  style={{ borderRadius: 60, width: 60, height: 60 }}
                />
              </View>
              <View style={{ padding: 5, marginTop: 5, marginBottom: 10 }}>
                <Text
                  style={{ color: "white", fontSize: 17, fontWeight: "600" }}
                >
                  Gabby
                </Text>
                <Text style={styles.title}>
                  Hello! I'm Gabby let's start{"\n"}by clicking the button.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleGetStarted}
            >
              {loading ? (
                <ActivityIndicator color="#292C33" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Start Chat Now</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: "#D0291C" }]}
            onPress={handleSignOut}
          >
            {isloading ? (
              <ActivityIndicator color="#292C33" size="small" />
            ) : (
              <Text style={[styles.loginButtonText, { color: "white" }]}>
                Logout
              </Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#d3d3d3",
  },
  header: {
    justifyContent: "center",
    padding: 15,
    marginTop: 30,
    height: 150,
    backgroundColor: "#D0291C",
  },
  title: {
    color: "white",
  },
  buttonStart: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 20,
    width: "100%",
    height: 40,
  },
  loginButtonText: {
    color: "#292C33",
    fontSize: 16,
    fontWeight: "600",
  },
  subContainer: {
    backgroundColor: "white",
    top: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activeButtons: {
    top: 6,
  },
  profileChat: {
    flexDirection: "row",
    display: "flex",
    gap: 8,
  },
});
