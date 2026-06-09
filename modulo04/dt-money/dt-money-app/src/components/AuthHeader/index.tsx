import { useKeybordVisible } from "@/shared/hooks/useKeybordVisible";
import { Image, View } from "react-native";

export const AuthHeader = () => {
  const keybordIsVisible = useKeybordVisible();

  if (keybordIsVisible) return <></>;
  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image source={require("@/assets/Logo.png")} />
    </View>
  );
};
