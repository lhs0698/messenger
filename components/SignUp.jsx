import React from "react";
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

export default function SignUp() {
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
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
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
                  <Input type="password" variant="rounded" />
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
