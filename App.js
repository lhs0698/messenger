import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SignUp />
      {/* <SignIn /> */}
    </SafeAreaView>
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
