import Toast from "react-native-root-toast";
import { OtherColor, GreenColor } from "app/config/color";

export const toastError = (text: string) => {
  toast(text, OtherColor.errorColor);
};
export const toastSuccessful = (text: string) => {
  toast(text, GreenColor.primaryColor);
};

const toast = (text: string, backgroundColor) => {
  let toast = Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    backgroundColor: backgroundColor,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });
};
