import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, Alert } from "react-native";

const transaction: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 300,00",
    date: "12/04/2025",
    description: "CDB de 110% no banco XPT)",
    type: TransactionTypes.Input,
  },
  {
    id: "2",
    value: "R$ 20,00",
    date: "12/04/2025",
    type: TransactionTypes.Output,
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();
  const [isFetching, setIsFetching] = useState(true);
  const targetDataBase = useTargetDatabase();

  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  async function fetchDetails() {
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

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);

    setIsFetching(false);
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
          icone: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={transaction}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
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
