import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { Register } from "@/screens/Register";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/schema/LoginForm";
import { useAuthContext } from "@/context/auth.context";
import { AxiosError } from "axios";
import { AppError } from "@/shared/helpers/AppError";
import { useSnacbarContext } from "@/context/snackbar.context";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { colors } from "@/shared/colors";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
  });

  const { notify } = useSnacbarContext();

  const { handleAuthenticate } = useAuthContext();

  const { handlerError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async (userData: FormLoginParams) => {
    try {
      await handleAuthenticate(userData);
      console.log("userData", userData);
    } catch (error) {
      handlerError(error, "Falha ao logar");
    } finally {
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="email"
        lable="EMAIL"
        className="text-gray-500"
        placeholder="Email"
        leftIconName="email"
      />
      <AppInput
        control={control}
        name="password"
        lable="SENHA"
        className="text-gray-500"
        placeholder="Sua senha"
        leftIconName="lock"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton iconsName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          {isSubmitted ? (
            <ActivityIndicator color={colors.white}></ActivityIndicator>
          ) : (
            "Login"
          )}
        </AppButton>

        <View>
          <Text className="mb-4 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            mode="outline"
            iconsName="arrow-forward"
            onPress={() => navigation.navigate("Register")}
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
