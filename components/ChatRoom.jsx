import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { NativeBaseProvider, Input, IconButton, Box, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function ChatRoom() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewTest}></View>
        <View style={styles.foot}>
          <Box flexDirection="row" p="5" alignItems="center">
            <IconButton
              icon={<Icon as={Entypo} name="plus" />}
              borderRadius="full"
              _icon={{
                color: "blue.500",
                size: "md",
              }}
              _hover={{
                bg: "yellow.400:alpha.20",
              }}
              _pressed={{
                bg: "yellow.300:alpha.30",
                _icon: {
                  name: "plus",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: "2xl",
                },
              }}
            />
            <Input
              variant="rounded"
              bg="white"
              w="250"
              h="10"
              ml="3"
              mr="3"
            ></Input>
            <IconButton
              icon={<Icon as={Entypo} name="paper-plane" />}
              borderRadius="full"
              _icon={{
                color: "blue.500",
                size: "md",
              }}
              _hover={{
                bg: "yellow.400:alpha.20",
              }}
              _pressed={{
                bg: "yellow.300:alpha.30",
                _icon: {
                  name: "paper-plane",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: "2xl",
                },
              }}
            />
          </Box>
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
    backgroundColor: "#FFF0F0",
  },
  foot: {
    backgroundColor: "white",
    alignItems: "center",
  },
});
