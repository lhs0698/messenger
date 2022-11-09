import React from "react";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";

import RoomModal from "./RoomModal";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function Rooms() {
  return (
    <NativeBaseProvider>
      <Text>test</Text>
      <RoomModal></RoomModal>
    </NativeBaseProvider>
  );
}
