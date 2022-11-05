import React from "react";
import { StyleSheet } from "react-native";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import List from "./components/List";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase_config";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Center } from "native-base";

const Stack = createStackNavigator();

export default function App() {
  initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
