import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { DateFilter } from "./DateFilter";
import { CategoryFilter } from "./CategoryFilter";
import { TypeFilter } from "./TypeFilter";
import { AppButton } from "@/components/AppButton";
import { useTransactionContext } from "@/context/transactions.contect";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";

export const TransactionFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext();

  const { fetchTransactions, handleLoadings, resetFilter } =
    useTransactionContext();

  const { handlerError } = useErrorHandler();

  const handleFetchTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await fetchTransactions(1);
    } catch (error) {
      handlerError(error, "Falha ao aplicar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  const handleResetTransactionsFilters = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await resetFilter();
    } catch (error) {
      handlerError(error, "Falha ao resetar filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  return (
    <View className="flex-1 bg-gray[1000] p-4">
      <View className="flex-row justify-between ">
        <Text className="text-xl font-bold mb-5 text-white">
          Filtrar Transações
        </Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>
      <DateFilter />
      <CategoryFilter />
      <TypeFilter />
      <View className="flex-row gap-4 mt-8">
        <AppButton
          onPress={handleResetTransactionsFilters}
          widthFull={false}
          className="flex-1"
          mode="outline"
        >
          Limpar filtros
        </AppButton>
        <AppButton
          onPress={handleFetchTransactions}
          widthFull={false}
          className="flex-1"
        >
          Filtrar
        </AppButton>
      </View>
    </View>
  );
};
