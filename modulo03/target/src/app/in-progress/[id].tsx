import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View, Alert } from "react-native";

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();
  const [isFetching, setIsFetching] = useState(true);
  const targetDataBase = useTargetDatabase();
  const [transaction, setTransaction] = useState<TransactionProps[]>([]);

  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  const transactionDataBase = useTransactionsDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDataBase.show(Number(params.id));

      setDetails({
        name: response?.name || "",
        current: numberToCurrency(response?.current || 0),
        target: numberToCurrency(response?.amount || 0),
        percentage: response?.percentage || 0,
      });
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Não foi possivel carregar os detalhes da meta");
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionDataBase.listByTargetID(
        Number(params.id),
      );

      setTransaction(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format("DD/MM/YYYY [ás] HH:mm"),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        })),
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel carregar as transações");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchTargetDetails();
    const fetcgTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetcgTransactionsPromise]);

    setIsFetching(false);
  }

  function handleTransactionsRemove(id: string) {
    Alert.alert("Transação", "Deseja mesmo remover a transação", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => transactionRemove(id),
      },
    ]);
  }

  async function transactionRemove(id: string) {
    try {
      await transactionDataBase.remove(Number(id));
      fetchData();
      Alert.alert("Sucesso", "Transação removida com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel remover a transação");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButtom={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={transaction}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleTransactionsRemove(item.id)}
          />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui"
      />
      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
