import React, { createContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "./firebase";
import { addUser, getUser, usernameExists } from "./firestore";
const AuthContext = createContext();

function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (name, username, email, password) => {
    if (await usernameExists(username)) {
      return "Username already exists";
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      addUser(response.user.uid, name, username, email);
      setCurrentUser({ uid: response.user.uid, name, username, email });
      return "success";
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return "Email already in use";
        case "auth/invalid-email":
          return "Invalid email";
        case "auth/weak-password":
          return "Password is too weak";
        default:
          return "Something went wrong";
      }
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response.user === null) {
        return false;
      }
      const user = await getUser(response.user.uid);
      setCurrentUser(user);

      return true;
    } catch (error) {
      return false;
    }
  };

  const signout = () => {
    signOut(auth);
  };

  const setUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        currentUser,
        setUser,
        signout,
      }}
      {...props}
    />
  );
}
function RequireAuth({ children }) {
  const { currentUser } = React.useContext(AuthContext);
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

const isLoggedIn = () => {
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const newUser = await getUser(user.uid);
        unsub();
        resolve(newUser);
      } else {
        unsub();
        resolve(null);
      }
    });
  });
};
export { AuthContext, AuthProvider, RequireAuth, isLoggedIn };
