import { authModalState, ModalView } from "@/atoms/AuthModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type SignUpProps = {
  toggleView: (view: ModalView) => void;
};

const Signup: React.FC<SignUpProps> = ({ toggleView }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setLoginForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("loginForm: ", signUpForm);
    if (error) setError("");
    if (signUpForm.password != signUpForm.confirmPassword) {
      setError("Passwords does not match.");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{ outline: "none" }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{ outline: "none" }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{ outline: "none" }}
        bg="gray.50"
      />
      {(error || userError) && (
        <Text textAlign="center" color="red" fontSize="10pt">
          {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
      <Button width="100%" height="36px" mt={2} mb={2} type="submit" isLoading={loading}>
        Sign Up
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text fontSize="9pt" color="blue.500" cursor="pointer" onClick={() => toggleView("resetPassword")}>
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent={"center"}>
        <Text mr={1}>Already a redditor?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() => toggleView("login")}>
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
