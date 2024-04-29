import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerIconHeading}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require("./assets/images/arrow.png")}
            style={{ width: 55, height: 55 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.containerIconTitle}>About GTCD</Text>
      </View>
      <ScrollView>
        <View>
          <Image
            source={require("./assets/images/image1.jpg")}
            style={{ width: 355, height: 255 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <View>
            <Image
              source={require("./assets/images/avatar.png")}
              style={{ borderRadius: 60, width: 60, height: 60 }}
            />
          </View>
          <Text style={styles.aboutHeading}>
            Gabriel Taborin College of Davao
          </Text>
          <Text>
            Gabriel Taborin College of Davao Foundation, Inc. is a private,
            Catholic school located in Lasang, Davao City. It was established
            through the Brothers of the Holy Family in 2001. {"\n"} {"\n"}The
            school values fostering relationships among its members and aspires
            to produce graduates who also value harmony within their community.
          </Text>
          <View>
            <Image
              source={require("./assets/images/image2.jpg")}
              style={{ width: 355, height: 255 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  aboutHeading: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
  containerIconHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  containerIconTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AboutScreen;
