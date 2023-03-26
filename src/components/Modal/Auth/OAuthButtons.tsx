import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { auth } from "@/firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import React from "react";
import { FIREBASE_ERRORS, getFirebaseError } from "@/firebase/errors";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction={"column"} width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{getFirebaseError(error.message)}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
