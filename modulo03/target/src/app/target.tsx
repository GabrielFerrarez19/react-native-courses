import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar seu meta financeira."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Aplle Watch"
        />
        <CurrencyInput
          label="Valor alvo(R$)"
          placeholder="R$ 00,00"
          value={24000.73}
        />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
