import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("E-mail invalido").required("E-mail é obrigatorio"),
  password: yup
    .string()
    .min(6, "A senha deve ser maior que 6 caracteres")
    .required("A senha é obrigatoria"),
});
