import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminScreen = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <Text>
        This is the admin's dashboard. You can add admin-specific content here.
      </Text>
      <Button title="Logout" onPress={handleLogout} />
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
});

export default AdminScreen;
