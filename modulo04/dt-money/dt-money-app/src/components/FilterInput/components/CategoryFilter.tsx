import { useTransactionContext } from "@/context/transactions.contect";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export const CategoryFilter = () => {
  const { categories, handleCategoryFilter, filters } = useTransactionContext();

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Categorias
      </Text>
      {categories.map((category) => (
        <TouchableOpacity
          onPress={() => handleCategoryFilter(category.id)}
          key={`category-${category.id}`}
          className="flex-row items-center py-2"
        >
          <Checkbox
            onValueChange={() => handleCategoryFilter(category.id)}
            value={Boolean(filters.categoryIds[category.id])}
            className="mr-4"
          />
          <Text className="text-lg text-white">{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
