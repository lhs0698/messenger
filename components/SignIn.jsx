import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik } from "formik";

export default function SignIn({ navigation }) {
  const auth = getAuth();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.loginEmail, data.loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("성공!");
        navigation.navigate("Rooms");
      })
      .catch((error) => {
        console.log(error);
        alert("fail");
        location.reload();
      });
  };

  const googleSignUp = () => {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
        alert("구글 로그인성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NativeBaseProvider>
      <Center w="100%" flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290" alignSelf="center">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>
          <Formik
            initialValues={{ loginEmail: "", loginPassword: "" }}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <Input
                    variant="rounded"
                    name="loginEmail"
                    placeholder="Email"
                    onChangeText={handleChange("loginEmail")}
                    onBlur={handleBlur("loginEmail")}
                    value={values.loginEmail}
                    keyboardType="email-address"
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    variant="rounded"
                    type="password"
                    placeholder="Password"
                    name="loginPassword"
                    onChangeText={handleChange("loginPassword")}
                    onBlur={handleBlur("loginPassword")}
                    value={values.loginPassword}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                  <Link
                    _text={{
                      fontSize: "xs",
                      fontWeight: "500",
                      color: "indigo.500",
                    }}
                    alignSelf="flex-end"
                    mt="1"
                  >
                    Forget Password?
                  </Link>
                </FormControl>
                <Button
                  mt="2"
                  colorScheme="indigo"
                  borderRadius="20px"
                  onPress={handleSubmit}
                >
                  Sign In
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
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    I'm a new user.{" "}
                  </Text>
                  <Link
                    _text={{
                      color: "indigo.500",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
