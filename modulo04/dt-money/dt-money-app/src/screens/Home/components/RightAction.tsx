import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { DeleteModal } from "./DeleteModal";
import { deleteTransaction } from "@/shared/services/dt-money/transaction.service";
import { useErrorHandler } from "@/shared/hooks/useErrorhandler";
import { useSnacbarContext } from "@/context/snackbar.context";

interface Params {
  transactionId: number;
}

export const RightAction = ({ transactionId }: Params) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useSnacbarContext();

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const { handlerError } = useErrorHandler();

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);
      await deleteTransaction(transactionId);
      notify({
        message: "Transação deletada com sucesso",
        messageType: "SUCCESS",
      });
    } catch (error) {
      notify({ message: "Falha ao deletar a transação", messageType: "ERROR" });
      handlerError(error, "Falha ao deletar a transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-140 bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
      >
        <MaterialIcons name="delete-outline" color={colors.white} size={30} />
      </TouchableOpacity>
      <DeleteModal
        visible={modalVisible}
        hideModal={hideModal}
        handleDeleteTransaction={handleDeleteTransaction}
        loading={loading}
      />
    </>
  );
};
