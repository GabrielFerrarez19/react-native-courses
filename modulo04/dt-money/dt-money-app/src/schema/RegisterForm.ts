import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  email: yup.string().email("E-mail invalido").required("E-mail é obrigatorio"),
  password: yup
    .string()
    .min(6, "A senha deve ser maior que 6 caracteres")
    .required("A senha é obrigatoria"),
  name: yup.string().required("Nome é obrigatorio"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatoria"),
});
