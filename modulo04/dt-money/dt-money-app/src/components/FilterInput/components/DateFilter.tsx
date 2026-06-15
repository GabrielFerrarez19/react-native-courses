import { Text, TouchableOpacity, View } from "react-native";
import DateTimePiker from "react-native-modal-datetime-picker";
import { useState } from "react";
import { useTransactionContext } from "@/context/transactions.contect";
import { formatDate } from "@/shared/utils/format-date";
import clsx from "clsx";

export const DateFilter = () => {
  const { filters, handleFilters } = useTransactionContext();

  const [showStartDatePiker, setShowStartDatePiker] = useState(false);
  const [showEndDatePiker, setShowEndDatePiker] = useState(false);

  const onStartCancel = () => {
    setShowStartDatePiker(false);
  };

  const onStartConfirm = (selectedDate: Date) => {
    setShowStartDatePiker(false);
    handleFilters({ key: "from", value: selectedDate });
  };

  const onEndCancel = () => {
    setShowEndDatePiker(false);
  };

  const onEndConfirm = (selectedDate: Date) => {
    setShowEndDatePiker(false);
    handleFilters({ key: "to", value: selectedDate });
  };

  return (
    <>
      <Text className="text-base font-medium mb-5 text-gray-600">Data</Text>
      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity
            onPress={() => setShowStartDatePiker(true)}
            className="rounded-md p-2 border-b border-gray-800"
          >
            <Text
              className={clsx(
                "text-lg",
                filters.from ? "text-white" : "text-gray-700",
              )}
            >
              {formatDate(filters.from) || "De"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-[48%]">
          <TouchableOpacity
            onPress={() => setShowEndDatePiker(true)}
            className="rounded-md p-2 border-b border-gray-800"
          >
            <Text
              className={clsx(
                "text-lg",
                filters.to ? "text-white" : "text-gray-700",
              )}
            >
              {formatDate(filters.to) || "Até"}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePiker
          isVisible={showStartDatePiker}
          date={filters.from}
          onConfirm={onStartConfirm}
          onCancel={onStartCancel}
          mode="date"
          confirmTextIOS="Comfirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
        <DateTimePiker
          isVisible={showEndDatePiker}
          date={filters.to}
          onConfirm={onEndConfirm}
          onCancel={onEndCancel}
          mode="date"
          confirmTextIOS="Comfirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
      </View>
    </>
  );
};
