import React, { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Flex,
  Center,
  NativeBaseProvider,
  Fab,
  Icon
} from "native-base";
import { AntDesign } from '@expo/vector-icons';

export default function RoomModal() {
  const [showModal, setShowModal] = useState(false);
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
              <Input />
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
                }}
              >
                만들기
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* </Center> */}
    </NativeBaseProvider>
  );
}
// import { Fab, Icon, Box, Center, NativeBaseProvider } from 'native-base';
// import React from 'react';
// import { AntDesign } from '@expo/vector-icons';

// const Example = () => {
//   return <Box height="200" w="400" shadow="2" rounded="lg" bg="white:alpha.20">
//       <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />} />
//     </Box>;
// };

//     export default () => {
//         return (
//           <NativeBaseProvider>
//             <Center flex={1} px="3">
//                 <Example />
//             </Center>
//           </NativeBaseProvider>
//         );
//     };

{/* <Center>
        <Button
          variant="ghost"
          colorScheme="blueGray"
          shadow={2}
          onPress={() => setShowModal(true)}
        >
          방 만들기
        </Button> */}
