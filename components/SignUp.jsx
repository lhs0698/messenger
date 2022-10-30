import React, { useState } from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { Formik } from "formik";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider ,signInWithPopup } from "firebase/auth";

export default function SignUp() {
  const auth = getAuth();
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("성공")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignUp = () => {

    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
        alert("구글 로그인성공")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  

  return (
    <NativeBaseProvider>
      <Center w="350px" flex={1}>
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <Formik
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    variant="rounded"
                    name="email"
                    placeholder="Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    // type="password"
                    variant="rounded"
                    name="password"
                    placeholder="PASSWORD"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input
                    // type="password"
                    variant="rounded"
                    name="passwordConfirm"
                    placeholder="passwordConfirm"
                    onChangeText={handleChange("passwordConfirm")}
                    onBlur={handleBlur("passwordConfirm")}
                    value={values.passwordConfirm}
                  />
                </FormControl>
                <Button
                  mt="3"
                  colorScheme="indigo"
                  borderRadius="20px"
                  onPress={handleSubmit}
                  title="Submit"
                >
                  Sign up
                </Button>
                <Button
                  mt="1"
                  colorScheme="indigo"
                  borderRadius="20px"
                  onPress={googleSignUp}
                  title="Submit"
                >
                  google Login
                </Button>
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
