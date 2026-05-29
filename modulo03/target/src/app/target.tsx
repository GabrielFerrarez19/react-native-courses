import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { Alert, View } from "react-native";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | null>(0);

  const params = useLocalSearchParams<{ id?: string }>();

  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || (amount ?? 0) <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha nome e o valor precisa ser maior que 0",
      );
    }

    setIsProcessing(true);
    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount });

      Alert.alert("Sucesso!", "Meta atualizada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Não foi possivel atualizar a ameta");
      setIsProcessing(false);
    }
  }

  async function create() {
    try {
      await targetDatabase.create({
        name,
        amount,
      });

      Alert.alert("Nova meta", "Meta criada com sucesso!", [
        {
          text: "ok",
          onPress: () => router.back(),
        },
      ]);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel criar a meta");
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);

      setName(response?.name || "");
      setAmount(response?.amount || 0);
    } catch (error) {
      Alert.alert("Error", "Não foi possivel carregar os detahles da meta.");
    }
  }

  async function hadleRemove() {
    if (!params.id) {
      return;
    }

    Alert.alert("Remover", "Deseja realmente remover", [
      { text: "Não", style: "cancel" },
      { text: "sim", onPress: remove },
    ]);
  }

  async function remove() {
    try {
      setIsProcessing(true);

      await targetDatabase.remove(Number(params.id));
      Alert.alert("Meta", "Meta removida", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert("Erro", "nâo foi possivel remover a meta");
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar seu meta financeira."
        rightButtom={
          params.id ? { icon: "delete", onPress: hadleRemove } : undefined
        }
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Aplle Watch"
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          label="Valor alvo(R$)"
          placeholder="R$ 00,00"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
