import { AppHeader } from "@/components/AppHeader";
import { useTransactionContext } from "@/context/transactions.contect";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./components/ListHeader";

export const Home = () => {
  const { fetchCategories, fetchTransactions } = useTransactionContext();
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
      await handleFetchCategories();
      await handleFetchTransactions();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        ListHeaderComponent={ListHeader}
        data={[]}
        renderItem={() => <></>}
      />
    </SafeAreaView>
  );
};
