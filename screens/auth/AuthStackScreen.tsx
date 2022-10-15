import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
  const options = { headerShown: false };
  // #3: Navigation
  // how can we put appropriate screens within the navigator?
  // take a look at RootTabScreen.tsx for an example with a BottomTabNavigator
  return <></>;
};

export default AuthStackScreen;

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: "20%",
  },
  textInput: {
    marginVertical: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    padding: 15,
  },
  screenSwitchButton: {
    marginTop: 20,
  },
});
