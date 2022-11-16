import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  Button,
  Modal,
  FormControl,
  Input,
  NativeBaseProvider,
  Fab,
  Icon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { db } from "../firebase_config";
// firebase_config 에서 export한 db import
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // id의 고유한 값을 주기위함

// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

export default function Rooms() {
  const [showModal, setShowModal] = useState(false);
  // modal state
  const [roomName, setRoomName] = useState("");

  const inputChange = (text) => {
    setRoomName(text);
  };

  const addRoom = async () => {
    try {
      console.log("roomname:" + roomName);
      await addDoc(collection(db, "rooms"), {
        name: roomName,
        id: uuidv4(),
        createdAt: new Date().toString(),
        // creator: AUTH("내꺼")
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <NativeBaseProvider>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => setShowModal(true)}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Room 만들기</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>방 이름</FormControl.Label>
              <Input onChangeText={inputChange} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                취소
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  addRoom();
                }}
              >
                만들기
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
}
