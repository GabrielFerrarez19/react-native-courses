import { colors } from "@/shared/colors";
import { TransactionsType } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  setTrnsactionType: (type: TransactionsType) => void;
  typeId?: number;
}

export const TransactionTypeSelector: FC<Props> = ({
  setTrnsactionType,
  typeId,
}) => {
  return (
    <View className="flex-row justify-between gap-2 mt-2">
      <TouchableOpacity
        onPress={() => setTrnsactionType(TransactionsType.REVENUE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 rounded-lg justify-center h-[58]",
          typeId === TransactionsType.REVENUE
            ? "bg-accent-brand"
            : "bg-background-tertiary",
        )}
      >
        <MaterialIcons
          name="arrow-circle-up"
          color={
            typeId === TransactionsType.REVENUE
              ? colors.white
              : colors.accent.brand.light
          }
          size={30}
          className="mr-2"
        />
        <Text className="text-white font-bold">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTrnsactionType(TransactionsType.EXPENSE)}
        className={clsx(
          "flex-row items-center p-2 flex-1 rounded-lg justify-center h-[58]",
          typeId === TransactionsType.EXPENSE
            ? "bg-accent-red"
            : "bg-background-tertiary",
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          color={
            typeId === TransactionsType.EXPENSE
              ? colors.white
              : colors.accent.red.DEFAULT
          }
          size={30}
          className="mr-2"
        />
        <Text className="text-white font-bold">Saida</Text>
      </TouchableOpacity>
    </View>
  );
};
