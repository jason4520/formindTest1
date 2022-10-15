import { EntryStackScreen } from "./screens/EntryHandler";
import { initializeApp } from "firebase/app";
import { View, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import firebaseConfig from "./keys.json";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <EntryStackScreen />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
