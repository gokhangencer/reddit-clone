export const FIREBASE_ERRORS = {
  "Firebase: Error (auth/email-already-in-use).":
    "A user with that email already exists",

  "Firebase: Error (auth/user-not-found).": "Invalid email or password",
  "Firebase: Error (auth/wrong-password).": "Invalid email or password",
};

export const getFirebaseError = (errorMessage: string) => {
  return FIREBASE_ERRORS[errorMessage as keyof typeof FIREBASE_ERRORS];
};
