import { StyleSheet } from "react-native";
import * as Utils from "@utils";
import { BaseColor } from "@config";
export default StyleSheet.create({
  imageBanner: {
    height: Utils.scaleWithPixel(200),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
  },
  tagGirdStatus: {
    position: "absolute",
    top: Utils.scaleWithPixel(-180),
    left: 5
  },
  buttonAction: {
    position: "absolute",
    height:Utils.scaleWithPixel(25),
    bottom: Utils.scaleWithPixel(10),
    right:  Utils.scaleWithPixel(10)
  },
});
