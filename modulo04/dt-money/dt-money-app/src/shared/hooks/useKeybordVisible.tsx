import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeybordVisible = () => {
  const [isKeybordVisible, setIsKeybordVisible] = useState(false);

  useEffect(() => {
    const keybordShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeybordVisible(true);
    });

    const keybordDidMideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeybordVisible(false);
      },
    );

    return () => {
      keybordDidMideListener.remove();
      keybordShowListener.remove();
    };
  });

  return isKeybordVisible;
};
