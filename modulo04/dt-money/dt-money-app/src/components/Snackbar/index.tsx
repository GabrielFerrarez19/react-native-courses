import { useSnacbarContext } from "@/context/snackbar.context";
import { Text, View } from "react-native";

export const Snackbar = () => {
  const { type, message } = useSnacbarContext();

  if (!message || !type) {
    return <></>;
  }

  const bgColor = `${type === "SUCCESS" ? "bg-accent-brand-background-primary" : "bg-accent-red-background-primary "}`;

  return (
    <View
      className={`absolute bottom-10 self-center w-11/12 h-12 rounded-xl ${bgColor} justify-center z-10 p-2`}
    >
      <Text className="text-white text-base font-bold">{message}</Text>
    </View>
  );
};
