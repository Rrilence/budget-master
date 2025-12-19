import { notifyTransaction } from "../../../shared/toasts";
import { supabase } from "../../lib/supabase";

export const deleteGoals = async(id: string, user_id: string) => {
    try {
        const { error  } = await supabase
      .from('goals')
      .delete()
      .match({id, user_id})
      if (error) {throw error}
    } catch (error) {
        console.error('Ошибка удаления цели', error);
        notifyTransaction();
    }
}