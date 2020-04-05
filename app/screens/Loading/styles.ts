import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: BaseColor.whiteColor,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120
  }
});
