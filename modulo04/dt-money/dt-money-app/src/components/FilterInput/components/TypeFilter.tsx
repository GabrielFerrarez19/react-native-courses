import { useTransactionContext } from "@/context/transactions.contect";
import { TransactionsType } from "@/shared/enums/transaction-types";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export const TypeFilter = () => {
  const { filters, handleFilters } = useTransactionContext();

  const selectType = (typeId: TransactionsType) => {
    handleFilters({
      key: "typeId",
      value: typeId,
    });
  };
  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Tipo de transação
      </Text>

      <TouchableOpacity
        onPress={() => selectType(TransactionsType.REVENUE)}
        className="flex-row items-center py-2"
      >
        <Checkbox
          value={filters.typeId === TransactionsType.REVENUE}
          className="mr-4"
          onValueChange={() => selectType(TransactionsType.REVENUE)}
        />
        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectType(TransactionsType.EXPENSE)}
        className="flex-row items-center py-2"
      >
        <Checkbox
          value={filters.typeId === TransactionsType.EXPENSE}
          className="mr-4"
          onValueChange={() => selectType(TransactionsType.EXPENSE)}
        />
        <Text className="text-lg text-white">Saida</Text>
      </TouchableOpacity>
    </View>
  );
};
