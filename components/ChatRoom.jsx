import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { NativeBaseProvider, Input, Button } from "native-base";

export default function ChatRoom() {

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}></SafeAreaView>
      <Input 
        variant="outline" 
        />
      <Button style={styles.submitBtn}>전송</Button>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  submitBtn : {
  }
});