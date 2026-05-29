import { useSQLiteContext } from "expo-sqlite";

export type TransactionsCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export type TransactionResponse = {
  id: number;
  target_id: number;
  amount: number;
  observation: string;
  created_at: Date;
  updated_at: Date;
};

export type Summary = {
  input: number;
  output: number;
};

export function useTransactionsDatabase() {
  const database = useSQLiteContext();

  async function create(params: TransactionsCreate) {
    const statement = await database.prepareAsync(`
        
        INSERT INTO transactions (target_id, amount, observation) 
        VALUES ($target_id, $amount, $observation)

    `);

    statement.executeAsync({
      $target_id: params.target_id,
      $amount: params.amount,
      $observation: params.observation || "",
    });
  }

  async function listByTargetID(id: number) {
    return database.getAllAsync<TransactionResponse>(`
        SELECT  id, target_id, amount, observation, created_at, updated_at 
        FROM transactions 
        WHERE target_id = ${id} 
        ORDER BY created_at DESC
    `);
  }

  async function remove(id: number) {
    await database.runAsync("DELETE FROM transactions WHERE id = ?", id);
  }

  async function summary() {
    return database.getFirstAsync<Summary>(`
      
      SELECT 
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END),0) AS input,
        COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END),0) AS output
        FROM transactions

    `);
  }

  return {
    create,
    listByTargetID,
    remove,
    summary,
  };
}
