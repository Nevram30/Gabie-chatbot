import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PrivacyCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {checked ? (
        <Text style={styles.checked}>✓</Text>
      ) : (
        <Text style={styles.unchecked}></Text>
      )}
      <Text style={styles.label}>I agree to the privacy policy</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default PrivacyCheckbox;