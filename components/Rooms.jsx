import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
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
  HStack,
  Spinner,
  Center,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { db } from "../firebase_config";
// firebase_config 에서 export한 db import
import {
  addDoc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid"; // id의 고유한 값을 주기위한 라이브러리 uuid

export default function Rooms({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [loginEmail, setLoginEmail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const roomRef = collection(db, "Rooms");

  const inputChange = (text) => {
    setRoomName(text);
  };
  // 현재 로그인한 사용자 가져오기
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoginEmail(user.email);
    }
  });

  // 방 추가하기
  const addRoom = async () => {
    try {
      const newRoomName = roomName;
      const roomUUID = uuidv4();
      // 데이터 추가
      await addDoc(collection(db, "Rooms"), {
        name: newRoomName,
        id: roomUUID,
        createdAt: new Date().toString(),
        creator: loginEmail,
      });
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

  // firestore list Up
  useEffect(() => {
    setIsLoading(true);
    const getRoomList = async () => {
      const initRoomList = [];

      const q = query(roomRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        initRoomList.push(doc.data());
      });

      setRoomList((state) => [...state, ...initRoomList]);
      setIsLoading(false);
    };
    getRoomList();
  }, []);

  // 채팅 list를 가져오는 동안 보여지는 로딩화면
  if (isLoading)
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <HStack space={8} display="flex" justifyContent="center">
            <Spinner color="indigo.500" size="lg" />
          </HStack>
        </Center>
      </NativeBaseProvider>
    );

    const moveChatRoom = () => {
      navigation.navigate('ChatRoom')  
    }
  return (
    <NativeBaseProvider>
      <SafeAreaView>
      
        {roomList.map((eachroom) => {
          return (
            <View style={styles.container} key={eachroom.id}>
              <Text style={styles.texts}>{eachroom.name}</Text>
              <Box style={styles.icon}>
                <IconButton
                  icon={<Icon as={Entypo} name="check" />}
                  onPress={moveChatRoom}
                />
                <IconButton
                  icon={<Icon as={Entypo} name="pencil" />}
                  onPress={() => setUpdateModal(true)}
                />
                <IconButton
                  icon={<Icon as={Entypo} name="trash" />}
                  // onPress={onClickRemove}
                />
              </Box>
            </View>
          );
        })}
        
      </SafeAreaView>
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
              <Input onChangeText={inputChange} value={roomName} />
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
      <Modal isOpen={updateModal} onClose={() => setUpdateModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>방 이름 수정하기</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>방 이름</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setUpdateModal(false);
                }}
              >
                취소
              </Button>
              <Button>수정하기</Button>
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
    height: 60,
    backgroundColor: "#eeff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  loadingCotainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

// const listUp = async () => {
//   const querySnapshot = await getDocs(collection(db, "Rooms"));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     roomList.map((eachroom) => {
//       return (
//         <View style={styles.container} key={eachroom.id}>
//           <Text>{eachroom.name}</Text>
//           <Box w="30px">
//             <IconButton
//               icon={<Icon as={Entypo} name="trash" />}
//               // onPress={roomDelete}
//             />
//           </Box>
//         </View>
//       );
//     });
//   });
// };
