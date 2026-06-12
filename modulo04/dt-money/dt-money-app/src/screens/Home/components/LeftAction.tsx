import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { colors } from "@/shared/colors";
import { Transaction } from "@/shared/interfaces/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

interface Params {
  transaction: Transaction;
}

export const LeftAction = ({ transaction }: Params) => {
  const { openBottomSheet } = useBottomSheetContext();
  console.log("chegou aqui");
  return (
    <TouchableOpacity
      onPress={() => {
        openBottomSheet(
          <View>
            <Text>Teste</Text>
          </View>,
          1,
        );
      }}
      activeOpacity={0.8}
      className="h-140 bg-accent-blue-background-primary w-[80] rounded-l-[6] items-center justify-center"
    >
      <View>
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};
