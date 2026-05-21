import { Text, TextProps } from "react-native";

export function Title({ children, ...rest }: TextProps) {
  return (
    <Text {...rest} style={{ fontSize: 22, fontWeight: 700 }}>
      {children}
    </Text>
  );
}
