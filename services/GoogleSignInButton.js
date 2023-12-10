import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as GoogleSignIn from 'expo-google-app-auth';
import firebase from 'firebase';

const GoogleSignInButton = () => {
  const signInWithGoogleAsync = async () => {
    try {
      const result = await GoogleSignIn.logInAsync({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        // Get Google user data
        const { idToken, accessToken } = result;

        // Create a Google credential
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

        // Sign in with the credential
        await firebase.auth().signInWithCredential(credential);

        console.log('Google sign-in successful!');
      } else {
        console.log('Google sign-in canceled or failed.');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={signInWithGoogleAsync}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#4285F4',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Image
            source={require('./path/to/your/google-icon.png')}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Text style={{ color: 'white', fontSize: 16 }}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInButton;
