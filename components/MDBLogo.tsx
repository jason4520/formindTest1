import { Image, StyleSheet } from "react-native";
// note: usually bad practice to include @ts-ignore, however, there's a typing error that can be ignored
// for more info: https://stackoverflow.com/questions/57127606/ts2307-cannot-find-module-images-logo-png
// @ts-ignore
import logo from "../assets/icon.png";

const MDBLogo = () => <Image source={logo} style={styles.image} />;

export default MDBLogo;

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    margin: 10,
    height: "15%",
    width: "100%",
    resizeMode: "contain",
  },
});
