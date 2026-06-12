import { useTransactionContext } from "@/context/transactions.contect";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./components/ListHeader";
import { TransactionCard } from "./components/TransactionCard";

export const Home = () => {
  const { fetchCategories, fetchTransactions, transactions } =
    useTransactionContext();
  const { handlerError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handlerError(error, "Falha ao buscar as categorias");
    }
  };

  const handleFetchTransactions = async () => {
    try {
      await fetchTransactions();
    } catch (error) {
      handlerError(error, "Falha ao buscar as transações");
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), handleFetchTransactions()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        className="bg-background-secondary"
      />
    </SafeAreaView>
  );
};
