import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import RegisterAccount from "./RegisterAccount";
import Chatbot from "./Chatbot";
import OnboardingScreen from "./Onboarding";

const Stack = createStackNavigator();

const App = () => {
  // const [user, setUser] = useState(null);

  // // Check the user's authentication status
  // useEffect(() => {
  //   // const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
  //   //   setUser(authUser);
  //   // });
  //  Put this in the NavigationContainer
  // {user && user.admin ? (
  //   <Stack.Screen name="Admin" component={AdminScreen} />
  // ) : null}
  //   // return unsubscribe;
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterAccount} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
