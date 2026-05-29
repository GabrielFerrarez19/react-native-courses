import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { router } from "expo-router";
import { colors } from "@/theme";

type Props = {
  title: string;
  subtitle?: string;
  rightButtom?: {
    onPress: () => void;
    icon: keyof typeof MaterialIcons.glyphMap;
  };
};

export function PageHeader({ title, subtitle, rightButtom }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.black} />
        </TouchableOpacity>
        {rightButtom && (
          <TouchableOpacity onPress={rightButtom.onPress}>
            <MaterialIcons
              name={rightButtom.icon}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subTitle}>{subtitle}</Text>}
    </View>
  );
}
