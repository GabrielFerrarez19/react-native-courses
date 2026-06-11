import * as yup from "yup";

export const transactionSchema = yup.object().shape({
  description: yup.string().required("Descrição é obrigatoria"),
  value: yup
    .number()
    .min(0.01, "Deve ser no minimo 0,01")
    .required("Valor é obrigatorio"),
  typeId: yup
    .number()
    .min(1, "Selecione um tipo de transação")
    .required("Tipo da transação é obrigatorio"),
  categoryId: yup
    .number()
    .min(1, "Selecione um categoria de transação")
    .required("Categoria da transação é obrigatoria"),
});
