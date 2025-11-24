import { notifyTransaction } from "../../../shared/toasts";
import { supabase } from "../../lib/supabase";

export const deleteIncome = async(id: string, user_id: string) => {
    try {
        const { error  } = await supabase
      .from('incomes')
      .delete()
      .match({id, user_id})
      if (error) {throw error}
    } catch (error) {
        console.error('Ошибка удаления статьи доходов', error);
        notifyTransaction();
    }
}