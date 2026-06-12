import { colors } from "@/shared/colors";
import { TransactionsType } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionCardsType } from "../SummaryTransactionCard";

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

interface CardData {
  label: string;
  bgColor: string;
}

export const ICONS: Record<TransactionCardsType, IconsData> = {
  [TransactionsType.REVENUE]: {
    color: colors.accent.brand.light,
    name: "arrow-circle-up",
  },
  [TransactionsType.EXPENSE]: {
    color: colors.accent.red.DEFAULT,
    name: "arrow-circle-down",
  },
  total: {
    name: "attach-money",
    color: colors.white,
  },
};

export const CARD_DATA: Record<TransactionCardsType, CardData> = {
  [TransactionsType.EXPENSE]: {
    label: "Saida",
    bgColor: "background-tertiary",
  },
  [TransactionsType.REVENUE]: {
    label: "Entrada",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};
