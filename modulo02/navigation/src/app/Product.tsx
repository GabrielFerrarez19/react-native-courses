import { ButtonIcon } from "@/components/ButtonIcon";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { BottomRoutesProps } from "@/routes/BottomRoutes";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { useRoute } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

// type RouteParam = StackRoutesProps<"product">;

export function Product({ navigation, route }: BottomRoutesProps<"product">) {
  // const navigation = useNavigation();
  // const { params } = useRoute<RouteParam["route"]>();
  return (
    <View style={{ flex: 1, padding: 32, paddingTop: 54 }}>
      <Header>
        <ButtonIcon
          name="arrow-circle-left"
          onPress={() => navigation.goBack()}
        />
        <Title>Product {route.params?.id}</Title>
        {/* <Title>Product {params?.id}</Title> */}
      </Header>
    </View>
  );
}
