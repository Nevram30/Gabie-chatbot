import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";

const PrivacyCheckbox = ({ checked, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleContinue = () => {
    toggleModal();
    onPress(); // Invoke the onPress callback provided by the parent component
  };

  const handleCancel = () => {
    toggleModal(); // Invoke the onPress callback provided by the parent component
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.container}>
        {checked ? (
          <Text style={styles.checked}>✓</Text>
        ) : (
          <Text style={styles.unchecked}></Text>
        )}
        <Text style={styles.label}>I agree to the privacy policy</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalText}>
              <Text style={styles.modalHeader1}>
                Privacy Policy Last updated:
              </Text>
              April 20, 2024 This Privacy Policy describes Our policies and
              procedures on the collection, use and disclosure of Your
              information when You use the Service and tells You about Your
              privacy rights and how the law protects You. We use Your Persona l
              data to provide and improve the Service. By using the Service, You
              agree to the collection and use of information in accordance with
              this Privacy Policy. April 20, 2024 This Privacy Policy describes
              Our policies and procedures on the collection, use and disclosure
              of Your information when You use the Service and tells You about
              Your privacy rights and how the law protects You. We use Your
              Persona l data to provide and improve the Service. By using the
              Service, You agree to the collection and use of information in
              accordance with this Privacy Policy. April 20, 2024 This Privacy
              Policy describes Our policies and procedures on the collection,
              use and disclosure of Your information when You use the Service
              and tells You about Your privacy rights and how the law protects
              You. We use Your Persona l data to provide and improve the
              Service. By using the Service, You agree to the collection and use
              of information in accordance with this Privacy Policy. April 20,
              2024 This Privacy Policy describes Our policies and procedures on
              the collection, use and disclosure of Your information when You
              use the Service and tells You about Your privacy rights and how
              the law protects You. We use Your Persona l data to provide and
              improve the Service. By using the Service, You agree to the
              collection and use of information in accordance with this Privacy
              Policy. April 20, 2024 This Privacy Policy describes Our policies
              and procedures on the collection, use and disclosure of Your
              information when You use the Service and tells You about Your
              privacy rights and how the law protects You. We use Your Persona l
              data to provide and improve the Service. By using the Service, You
              agree to the collection and use of information in accordance with
              this Privacy Policy.
            </Text>
            <View style={styles.containerAgreedButtons}>
              <Button title="Agree" onPress={handleContinue} />
              <Button title="Cancel" onPress={handleCancel} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checked: {
    fontSize: 20,
    marginRight: 10,
    backgroundColor: "white",
  },
  unchecked: {
    fontSize: 5,
    marginRight: 10,
    padding: 8,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    color: "white",
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
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  modalText: {
    marginBottom: 20,
  },
  containerAgreedButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  modalHeader1: {},
});

export default PrivacyCheckbox;
