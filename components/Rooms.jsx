import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Button,
  Modal,
  FormControl,
  Input,
  NativeBaseProvider,
  Fab,
  Icon,
  Box,
  IconButton,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { db } from "../firebase_config";
// firebase_config 에서 export한 db import
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid"; // id의 고유한 값을 주기위한 라이브러리 uuid

// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

export default function Rooms() {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [loginEmail, setLoginEmail] = useState();

  const inputChange = (text) => {
    setRoomName(text);
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoginEmail(user.email);
    }
  });

  const addRoom = async () => {
    try {
      // 데이터 추가
      const newRoomName = roomName;
      const roomUUID = uuidv4();

      await addDoc(collection(db, "Rooms"), {
        name: newRoomName,
        id: roomUUID,
        createdAt: new Date().toString(),
        creator: loginEmail,
      });

      const roomRef = collection(db, "Rooms");
      // 새로생성한 방 데이터 가져오기
      const q = query(roomRef, where("id", "==", roomUUID));
      // collection의 문서를 query하여 여러문서를 검색한다, where()을 사용해서 특정 조건을 충족하는 문서를 가져온다. ex) id와 roomUUID와 같으면 가져온다.
      // where 을 생략하면 collection의 모든 문서를 검색할 수 있다.

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        const roomDoc = doc.data();
        setRoomList((state) => [...state, roomDoc]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // roomList 삭제
  const roomDelete = async () => {
    try {
      // collection의 모든 문서 가져오기

      const querySnapshot = await getDocs(collection(db, "Rooms"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      // 문서 삭제
      // Rooms의 문서 id를 가져와서 해당하는 문서를 삭제한다.
    } catch (e) {
      console.log("Error message :", e);
    }
  };

  return (
    <NativeBaseProvider>
      {roomList.map((eachroom) => {
        return (
          <View style={styles.container} key={eachroom.id}>
            <Text>{eachroom.name}</Text>
            <Box w="30px">
              <IconButton
                icon={<Icon as={Entypo} name="trash" />}
                onPress={roomDelete}
              />
            </Box>
          </View>
        );
      })}
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "#feff",
    border: "solid",
  },
});
