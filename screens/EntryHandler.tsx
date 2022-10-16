import { useEffect, useState } from "react";
import AuthStackScreen from "./auth/AuthStackScreen";
import RootTabScreen from "./root/RootTabScreen";

export function EntryStackScreen() {
  const [initializing, setInitializing] = useState(true);

  // #4: Firebase Auth
  // how can we handle switching between the AuthStack and the RootTab?
  return <RootTabScreen />;
}
