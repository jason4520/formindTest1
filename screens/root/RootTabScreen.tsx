import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import VotingScreen from "./VotingScreen";
import ResultsScreen from "./ResultsScreen";
import { auth } from "../../App";
import { signOut } from "firebase/auth";
import { StyleSheet } from "react-native";

export type RootTabParamList = {
  VotingScreen: undefined;
  ResultsScreen: undefined;
};

const RootTab = createBottomTabNavigator();

const RootTabScreen = () => {
  // pressing the sign out button before auth has been implemented will lad
  // to an error showing in the console
  const SignOutButton = () => (
    <Ionicons
      style={styles.icon}
      name="exit-outline"
      onPress={() => signOut(auth)}
      size={25}
    />
  );
  // #3: Navigation
  // check out the following for an example of a bottom tab navigation system
  // note that there's frequent use of options to customize appearance, and there's even more available
  // as listed in the React Navigation docs for your own projects
  return (
    <RootTab.Navigator initialRouteName="VotingScreen">
      <RootTab.Screen
        name="VotingScreen"
        component={VotingScreen}
        options={{
          tabBarLabel: "Voting",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="ballot" color={color} size={size} />
          ),
          title: "Voting",
          headerRight: SignOutButton,
        }}
      />
      <RootTab.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{
          tabBarLabel: "Results",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="poll" color={color} size={size} />
          ),
          title: "Results",
          headerRight: SignOutButton,
        }}
      />
    </RootTab.Navigator>
  );
};

export default RootTabScreen;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});
