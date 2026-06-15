import { useTransactionContext } from "@/context/transactions.contect";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./components/ListHeader";
import { TransactionCard } from "./components/TransactionCard";
import { RefreshControl } from "react-native-gesture-handler";
import { EmptyList } from "@/components/EmptyList";
import { colors } from "@/shared/colors";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadings,
    loadMoreTransaction,
    handleLoadings,
  } = useTransactionContext();
  const { handlerError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handlerError(error, "Falha ao buscar as categorias");
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({
        key: "initial",
        value: true,
      });
      await fetchTransactions(1);
    } catch (error) {
      handlerError(error, "Falha ao buscar as transações");
    } finally {
      handleLoadings({
        key: "initial",
        value: false,
      });
    }
  };

  const handleloadMoreTransaction = async () => {
    try {
      handleLoadings({
        key: "loadMore",
        value: true,
      });
      await loadMoreTransaction();
    } catch (error) {
      handlerError(error, "Falha ao caregar novas transações");
    } finally {
      handleLoadings({
        key: "loadMore",
        value: false,
      });
    }
  };

  const handlerefreshTransactions = async () => {
    try {
      handleLoadings({
        key: "refresh",
        value: true,
      });
      await refreshTransactions();
    } catch (error) {
      handlerError(error, "Erro ao recarregar as transações");
    } finally {
      handleLoadings({
        key: "refresh",
        value: false,
      });
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
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
        onEndReached={handleloadMoreTransaction}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator color={colors.accent.brand.light} />
          ) : null
        }
        onEndReachedThreshold={0.5}
        ListEmptyComponent={loadings.initial ? null : EmptyList}
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handlerefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
};
