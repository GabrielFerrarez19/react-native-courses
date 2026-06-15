import { EditTransaction } from "@/components/EditTransaction";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { colors } from "@/shared/colors";
import { Transaction } from "@/shared/interfaces/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Params {
  transaction: Transaction;
}

export const LeftAction = ({ transaction }: Params) => {
  const { openBottomSheet } = useBottomSheetContext();
  return (
    <TouchableOpacity
      onPress={() => {
        openBottomSheet(<EditTransaction transaction={transaction} />, 0);
      }}
      activeOpacity={0.8}
    >
      <View className="h-[140] bg-accent-blue-background-primary w-[80] rounded-l-[6] items-center justify-center">
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};
