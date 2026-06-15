import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { colors } from "@/shared/colors";

type AppButtonMode = "fill" | "outline";

interface AppButtomParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconsName?: keyof typeof MaterialIcons.glyphMap;
  widthFull?: boolean;
}

export const AppButton: FC<PropsWithChildren<AppButtomParams>> = ({
  children,
  mode = "fill",
  iconsName,
  className,
  widthFull = true,
  ...rest
}) => {
  const isFill = mode === "fill";

  return (
    <TouchableOpacity
      {...rest}
      className={twMerge(
        widthFull && "w-full",
        className,
        "rounded-xl px-5 flex-row items-center h-16 ",
        iconsName ? "justify-between" : "justify-center",
        isFill
          ? "bg-accent-brand"
          : "bg-transparent border border-accent-brand",
      )}
    >
      <Text
        className={twMerge(
          "text-base ",
          isFill ? "text-white" : "text-accent-brand",
        )}
      >
        {children}
      </Text>
      {iconsName && (
        <MaterialIcons
          name={iconsName}
          size={24}
          color={isFill ? colors.white : colors.accent.brand.DEFAULT}
        />
      )}
    </TouchableOpacity>
  );
};
