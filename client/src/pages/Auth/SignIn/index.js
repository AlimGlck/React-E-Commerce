import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import validationSchema from "./validations.js";
import { fetchLogin } from "../../../api.js";
import { useAuth } from "../../../contexts/Authcontext.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);

        navigate("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
            <Box my={5}>
              {formik.errors.general && (
                <Alert status="error">{formik.errors.general}</Alert>
              )}
            </Box>
            <Box my={5} textAlign="left">
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                </FormControl>

                <FormControl mt="4">
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </FormControl>

                <Button mt={4} width="full" type="submit">
                  Sign Up
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignIn;
