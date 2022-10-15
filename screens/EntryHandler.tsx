import { useEffect, useState } from "react";
import AuthStackScreen from "./auth/AuthStackScreen";
import RootTabScreen from "./root/RootTabScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../App";

export function EntryStackScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser: any) => {
      // #4: Firebase Auth
      // what happens when the auth state changes?
    });
  }, [setUser]);

  // #4: Firebase Auth
  // how can we handle switching between the AuthStack and the RootTab?
  return <RootTabScreen />;
}
