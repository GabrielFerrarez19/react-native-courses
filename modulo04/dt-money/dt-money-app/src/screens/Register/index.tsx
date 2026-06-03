import { Text, TouchableOpacity, View } from "react-native";

export const Register = () => {
  return (
    <View>
      <Text>Tela de registro</Text>
      <TouchableOpacity onPress={() => navigation.back()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};
