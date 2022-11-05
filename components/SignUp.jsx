import React, { useState } from "react";
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";

export default function SignUp() {
  const auth = getAuth();
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("성공!!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("required!!!")
      .email("이메일 형식이 아닙니다!"),
    password: yup
      .string()
      .required("required!!!")
      .matches(
        /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()?_~]).{8,24}$/,
        "영문,숫자,특수문자[!@#$%^&*()?_~]를 모두 포함한 8~24자리 사용 가능."
      ),
    passwordConfirm: yup
      .string()
      .required("required!!!")
      .oneOf([yup.ref("password"), null], "비밀번호가 다릅니다!"),
  });

  return (
    <NativeBaseProvider>
      <Center w="100%" flex={1}>
        <Box safeArea p="2" w="90%" maxW="290" py="8" alignSelf="center">
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
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <VStack space={3} mt="5">
                <FormControl isRequired isInvalid={"email" in errors}>
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
                  <FormControl.ErrorMessage>
                    {errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={"password" in errors}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    variant="rounded"
                    name="password"
                    placeholder="PASSWORD"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={"passwordConfirm" in errors}>
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input
                    type="password"
                    variant="rounded"
                    name="passwordConfirm"
                    placeholder="passwordConfirm"
                    onChangeText={handleChange("passwordConfirm")}
                    onBlur={handleBlur("passwordConfirm")}
                    value={values.passwordConfirm}
                  />
                  <FormControl.ErrorMessage>
                    {errors.passwordConfirm}
                  </FormControl.ErrorMessage>
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
              </VStack>
            )}
          </Formik>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
