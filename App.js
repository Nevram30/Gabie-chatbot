import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import RegisterAccount from "./RegisterAccount";
import Chatbot from "./Chatbot";
import OnboardingScreen from "./Onboarding";

const Stack = createStackNavigator();
// const [isfirstLaunch, setIsFirstLaunch] = useState(false);

// // Check if the user has already seen the onboarding screens
// useEffect(() => {
//   // You can use AsyncStorage or any other method to determine isFirstLaunch
//   // For simplicity, we'll set isFirstLaunch to true initially
//   // In a real app, you would set it based on whether the user has seen the onboarding
//   setIsFirstLaunch(true);
// }, []);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
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
