import { useTransactionContext } from "@/context/transactions.contect";
import { colors } from "@/shared/colors";
import { TransactionsType } from "@/shared/enums/transaction-types";

import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Text, View } from "react-native";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CARD_DATA, ICONS } from "./strategies/transactions-card";

export type TransactionCardsType = TransactionsType | "total";

interface Props {
  type: TransactionCardsType;
  amount: number;
}

export const SummaryTransactionCard: FC<Props> = ({ amount, type }) => {
  const iconData = ICONS[type];

  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: TransactionsType }) => TransactionsType.id === type,
  );

  return (
    <View
      className={`bg-${cardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
      </View>
      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  { locale: ptBR },
                )
              : "Nem uma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
};
