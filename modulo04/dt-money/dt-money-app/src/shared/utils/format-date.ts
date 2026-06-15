import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date?: Date) => {
  if (!date || !isValid) {
    return undefined;
  }
  return format(date, "dd/mm/yyyy", {
    locale: ptBR,
  });
};
