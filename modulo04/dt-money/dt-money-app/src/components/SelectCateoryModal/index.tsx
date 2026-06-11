import { useTransactionContext } from "@/context/transactions.contect";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CheckBox from "expo-checkbox";

interface Props {
  selectCategory: number;
  onSelect: (categoryId: number) => void;
}

export const SelectCategoryModal = ({ onSelect, selectCategory }: Props) => {
  const [showModal, setshowModal] = useState(false);

  const { categories } = useTransactionContext();

  const handleModal = () => {
    setshowModal((prevState) => !prevState);
  };

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectCategory),
    [categories, selectCategory],
  );

  const handleSelect = (categoryId: number) => {
    onSelect(categoryId);
    setshowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleModal}
        className="h-[50px] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
      >
        <Text
          className={clsx(
            "text-gray-300 text-lg",
            selected ? "text-white" : "text-gray-700",
          )}
        >
          {selected?.name ?? "Categoria"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="text-white text-lg mb-4">
                Seleione uma categoria
              </Text>
              <FlatList
                keyExtractor={(item) => `categori=${item.id}`}
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row bg-gray-800 rounded-lg mb-2 p-4"
                    onPress={() => handleSelect(item.id)}
                  >
                    <CheckBox
                      value={selected?.id === item.id}
                      onValueChange={() => handleSelect(item.id)}
                      className="mr-2"
                    />
                    <Text className="text-white text-center text-lg">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
