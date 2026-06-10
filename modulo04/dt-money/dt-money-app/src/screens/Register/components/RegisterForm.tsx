import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/RegisterForm";
import { useAuthContext } from "@/context/auth.context";
import { AxiosError } from "axios";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { colors } from "@/shared/colors";

export interface FormRegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(RegisterSchema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const { handleRegister } = useAuthContext();

  const { handlerError } = useErrorHandler();

  const onSubmit = async (userData: FormRegisterParams) => {
    try {
      await handleRegister(userData);
    } catch (error) {
      handlerError(error, "Erro ao cadastrar usuario");
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        lable="NAME"
        placeholder="Seu nome "
      />
      <AppInput
        control={control}
        name="email"
        leftIconName="alternate-email"
        lable="EMAIL"
        placeholder="email@example.br"
      />
      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        lable="SENHA"
        placeholder="sua senha"
        secureTextEntry
      />
      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        lable="CONFIRME A SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconsName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          {isSubmitted ? (
            <ActivityIndicator color={colors.white}></ActivityIndicator>
          ) : (
            "Cadastrar"
          )}
        </AppButton>

        <View>
          <Text className="mb-4 text-gray-300 text-base">
            Já possui uma conta
          </Text>
          <AppButton
            mode="outline"
            iconsName="arrow-forward"
            onPress={() => navigation.navigate("Login")}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  );
};
