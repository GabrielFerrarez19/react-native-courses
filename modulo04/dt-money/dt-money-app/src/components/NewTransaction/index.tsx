import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { colors } from "@/shared/colors";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CurrencyInput from "react-native-currency-input";
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCateoryModal";
import { transactionSchema } from "@/schema/TransactionForm";
import * as yup from "yup";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";
import { useTransactionContext } from "@/context/transactions.contect";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";

type ValidationsErrors = Record<keyof CreateTransactionInterface, string>;

export const NewTransaction = () => {
  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });

  const [validationErrors, setValidationErros] = useState<ValidationsErrors>();
  const { createTransaction } = useTransactionContext();
  const { handlerError } = useErrorHandler();

  const [isLoading, setIsLoaging] = useState(false);

  const handleCreateTransaction = async () => {
    try {
      setIsLoaging(true);
      await transactionSchema.validate(transaction, {
        abortEarly: false,
      });
      await createTransaction(transaction);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationsErrors;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionInterface] = err.message;
          }
        });

        setValidationErros(errors);
      } else {
        handlerError(error, "Falha ao criar transação");
      }
    } finally {
      setIsLoaging(false);
      closeBottomSheet();
    }
  };

  console.log(validationErrors);

  const setTrnsactionsData = (
    key: keyof CreateTransactionInterface,
    value: string | number,
  ) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  };

  const { closeBottomSheet } = useBottomSheetContext();
  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>
      <View className="flex-1 mt-8 mb-8">
        <TextInput
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(value) => setTrnsactionsData("description", value)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors?.description}</ErrorMessage>
        )}
        <CurrencyInput
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTrnsactionsData("value", value ?? 0)}
          value={transaction.value}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors?.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          onSelect={(categoryId) =>
            setTrnsactionsData("categoryId", categoryId)
          }
          selectCategory={transaction.categoryId}
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors?.categoryId}</ErrorMessage>
        )}
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTrnsactionType={(typeId) => setTrnsactionsData("typeId", typeId)}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors?.typeId}</ErrorMessage>
        )}

        <View className="my-4">
          <AppButton onPress={handleCreateTransaction}>
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              "Registrar"
            )}
          </AppButton>
        </View>
      </View>
    </View>
  );
};
