import React from "react";
import { NativeBaseProvider } from "native-base";


import RoomModal from "./RoomModal";


export default function Rooms() {
  return (
    <NativeBaseProvider>
      <RoomModal></RoomModal>
    </NativeBaseProvider>
  );
}