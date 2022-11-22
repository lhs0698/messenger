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
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase_config";
// firebase_config 에서 export한 db import
import { addDoc, collection, doc, getDoc, getDocs, where, query } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // id의 고유한 값을 주기위한 라이브러리 uuid


// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

export default function Rooms() {
  const [showModal, setShowModal] = useState(false);
  // modal state
  const [roomName, setRoomName] = useState("");

  const [roomList, setRoomList] = useState([]);


  const inputChange = (text) => {
    setRoomName(text);
  };

  const addRoom = async () => {
    try {
      console.log("roomname:" + roomName);
      // 데이터 추가

      const newRoomName = roomName;
      const roomUUID = uuidv4();
      console.log('roomUUID: ', roomUUID);

      await addDoc(collection(db, "Rooms"), {
        name: newRoomName,
        id: roomUUID,
        createdAt: new Date().toString(),
      });
      
      const roomRef = collection(db, "Rooms");

      // 새로생성한 방 데이터 가져오기
      const q = query(roomRef, where('id', '==', roomUUID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());

        const roomDoc = doc.data();
        // setRoomList([
        //   ...roomList,
        //   roomDoc
        // ]);

        
        setRoomList((state) => [...state, roomDoc]);
      });

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // const Test2 = async () => {
  //   const docRef = doc(collection(db, "Rooms"));
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };
  // // 문서 가져오기 실패

  // const Test = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Rooms"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };
  // // 모든 문서 가져오기

  return (
    <NativeBaseProvider>
      {
        
        roomList.map((eachRoom) => {
          return(
          <View key={eachRoom.id} style={styles.container}>
            <Text>{eachRoom.name}</Text>
          </View>
          )
        })
      }

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
    backgroundColor: "#fff",
    border: "solid",
  },
});
