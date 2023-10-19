// HomeScreen.js
import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import Chatbot from './Chatbot';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text>Welcome to ChatBot</Text>
        </View>
      </SafeAreaView>
      <Chatbot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default HomeScreen;
