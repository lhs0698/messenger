import React from "react";
import { NativeBaseProvider } from "native-base";
import {Text} from "react-native"
import RoomModal from "./RoomModal";

export default function List() {
  return (
    <NativeBaseProvider>
      <Text>test</Text>
      <RoomModal></RoomModal>
    </NativeBaseProvider>
  );
}
