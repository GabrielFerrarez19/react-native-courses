import { Control, Controller, FieldValues, Path, set } from "react-hook-form";
import { Text, TextInputProps, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "@/shared/colors";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage } from "../ErrorMessage";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  lable?: string;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  lable,
  leftIconName,
  secureTextEntry,
  ...rest
}: AppInputParams<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [showText, setShowText] = useState(secureTextEntry);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        console.log(error);
        return (
          <View className="w-full mt-4">
            {lable && (
              <Text
                className={clsx(
                  "mb-2 mt-3 text-base",
                  isFocused ? "text-accent-brand" : "text-gray-600",
                )}
              >
                {lable}
              </Text>
            )}

            <TouchableOpacity className="flex-row items-center border-b-[1px] border-gray-600 px-3 py-2 h-16">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  color={clsx(
                    isFocused ? colors.accent.brand.DEFAULT : colors.gray[600],
                  )}
                  size={24}
                  className="mr-2"
                />
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                {...rest}
                placeholderTextColor={colors.gray[700]}
                ref={inputRef}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                className="flex-1 text-base text-gray-500"
                secureTextEntry={showText}
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowText((value) => !value)}
                >
                  <MaterialIcons
                    name={showText ? "visibility" : "visibility-off"}
                    color={colors.gray[600]}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        );
      }}
    />
  );
};
