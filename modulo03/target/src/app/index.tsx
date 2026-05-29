import { Button } from "@/components/Button";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { Target, TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const [summary, setSummary] = useState<HomeHeaderProps>({
    total: "R$ 0,00",
    input: { label: "Entrada", value: "R$ 0,00" },
    output: { label: "Saída", value: "R$ 0,00" },
  });

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listByPercentageValue();

      console.log(response);

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: `${item.percentage.toFixed(0)}%`,
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Error", "Não foi possivel carregar as metas");
      console.log(error);
      throw error;
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await transactionsDatabase.summary();

      return {
        total: numberToCurrency(
          (response?.input || 0) + (response?.output || 0),
        ),
        input: {
          label: "Entrada",
          value: numberToCurrency(response?.input || 0),
        },
        output: {
          label: "Saida",
          value: numberToCurrency(response?.output || 0),
        },
      };
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel carregar o resumo");
      return {
        total: numberToCurrency(0),
        input: {
          label: "Entrada",
          value: numberToCurrency(0),
        },
        output: {
          label: "Saida",
          value: numberToCurrency(0),
        },
      };
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const fetchSummaryPromise = fetchSummary();

    const [targetData, dataSummay] = await Promise.all([
      targetDataPromise,
      fetchSummaryPromise,
    ]);

    setTargets(targetData);
    setSummary(dataSummay);
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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        title="Metas"
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 34 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
