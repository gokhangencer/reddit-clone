import { authModalState, ModalView } from "@/atoms/AuthModalAtom";
import { auth } from "@/firebase/clientApp";
import { getFirebaseError } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {
  toggleView: (view: ModalView) => void;
};

const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
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
      {error && (
        <Text textAlign="center" color="red" fontSize="10pt">
          {getFirebaseError(error.message)}
        </Text>
      )}
      <Button width="100%" height="36px" mt={2} mb={2} type="submit" isLoading={loading}>
        Log In
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
        <Text mr={1}>New Here?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() => toggleView("signup")}>
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
