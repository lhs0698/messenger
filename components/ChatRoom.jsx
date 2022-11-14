import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import {
  NativeBaseProvider,
  Input,
  Button,
  useBreakpointValue,
  AddIcon,
  Box,
  FlatList,
  VStack,
} from "native-base";

export default function ChatRoom() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewTest}></View>
        <View style={styles.foot}>
          <Input variant="rounded" w="250px" style={styles.InputTest}></Input>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewTest: {
    width: "100%",
    height: "90%",
    backgroundColor: "#CCCCFF",
  },
  foot: {
    backgroundColor: "CC9966",
    height: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  InputTest: {
    backgroundColor: "white",
  },
});
