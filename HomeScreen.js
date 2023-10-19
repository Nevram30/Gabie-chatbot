import React from 'react';
import { View, SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import CustomButton from './components/ButtonProps';

const HomeScreen = ({ navigation }) => {

  const handleGetStarted = () => {
    // Navigate to the Chatbot screen
    navigation.navigate('Chatbot');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to ChatBot</Text>
        </View>
        <View style={styles.header}>
        <CustomButton style={styles.buttonStart} title="Start Chat Now" onPress={handleGetStarted} />
        </View>
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 60,
  },
  title:{},
  buttonStart:{
    marginTop: 20,
  }
  
});

export default HomeScreen;
