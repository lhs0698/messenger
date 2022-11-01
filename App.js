import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase_config";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  initializeApp(firebaseConfig);

  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
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
