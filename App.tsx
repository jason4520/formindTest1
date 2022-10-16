import { EntryStackScreen } from "./screens/EntryHandler";
import { initializeApp } from 'firebase/app';
import { View, StyleSheet } from "react-native";
import  getAuth from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import firebaseConfig from "./keys.json";

const app = initializeApp(firebaseConfig);

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
