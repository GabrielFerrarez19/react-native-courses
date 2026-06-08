import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <AppInput
        controll={control}
        name="email"
        lable="EMAIL"
        className="text-gray-500"
        placeholder="Email"
        leftIconName="email"
      />
      <AppInput
        controll={control}
        name="password"
        lable="SENHA"
        className="text-gray-500"
        placeholder="Sua senha"
        leftIconName="lock"
        secureTextEntry
      />
    </>
  );
};
