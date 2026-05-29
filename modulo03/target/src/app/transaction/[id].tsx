import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();

  const [type, setType] = useState<TransactionTypes>(TransactionTypes.Input);
  const [isCreating, setIsCreating] = useState(false);
  const [amount, setAmount] = useState<number | null>(0);
  const [observation, setObservation] = useState("");

  const transictionDataBase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      setIsCreating(true);
      if (!amount || (amount ?? 0) <= 0) {
        Alert.alert(
          "Atenção!",
          "Preencha o valor. A transação deve ser maior que 0",
        );
        setIsCreating(false);
      }

      await transictionDataBase.create({
        target_id: Number(params.id),
        amount:
          type === TransactionTypes.Output ? (amount ?? 0) * -1 : amount || 0,
        observation: observation,
      });

      Alert.alert("Sucesso", "Transação salva com sucesso", [
        {
          text: "ok",
          onPress: router.back,
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel salvar a transação");
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transações"
        subtitle="A cada valor guardado você fica mais proximo da sua meta. Se esforce para guardar e evitar retirar"
      />

      <View style={{ marginTop: 34, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput
          value={amount}
          label="Valor (R$)"
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (Opcional) "
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
