import { notifyTransaction } from "../../../shared/toasts";
import { supabase } from "../../lib/supabase";

export const deleteExpenses = async(id: string, user_id: string) => {
    try {
        const { error  } = await supabase
      .from('expenses')
      .delete()
      .match({id, user_id})
      if (error) {throw error}
    } catch (error) {
        console.error('Ошибка удаления статьи расходов', error);
        notifyTransaction();
    }
}