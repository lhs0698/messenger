import React from "react";
import { NativeBaseProvider } from "native-base";

import RoomModal from "./RoomModal";

import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default function Rooms() {
  return (
    <NativeBaseProvider>
      <Text></Text>
      <RoomModal></RoomModal>
    </NativeBaseProvider>
  );
}
