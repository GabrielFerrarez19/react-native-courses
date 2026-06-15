import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { useTransactionContext } from "@/context/transactions.contect";
import { colors } from "@/shared/colors";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TransactionFilters } from "./components/TransactionsFilters";

export const FilterInput = () => {
  const { pagination, setSearchText, searchText, fetchTransactions } =
    useTransactionContext();

  const { openBottomSheet } = useBottomSheetContext();

  const { handlerError } = useErrorHandler();

  const [text, setText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    (async () => {
      try {
        await fetchTransactions(1);
        console.log(searchText);
      } catch (error) {
        handlerError(error, "Erro ao filtrar transações");
      }
    })();
  }, [searchText]);

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center mt-4 mb-3">
        <Text className="text-white text-xl font-bold">Transações</Text>
        <Text className="text-gray-700 text-base">
          {pagination.totalRows} {pagination.totalRows === 1 ? "Item" : "Items"}
        </Text>
      </View>
      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput
          value={text}
          onChangeText={setText}
          className="h-[50px] text-white w-full bg-background-primary text-lg pl-4"
          placeholderTextColor={colors.gray[600]}
          placeholder="Busque uma transação"
        />
        <TouchableOpacity
          className="absolute right-0"
          onPress={() => openBottomSheet(<TransactionFilters />, 1)}
        >
          <MaterialIcons
            name="filter-list"
            color={colors.accent.brand.light}
            size={26}
            className="mr-3"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
