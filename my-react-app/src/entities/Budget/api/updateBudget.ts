import { notifyTransaction, notifyUpdateBudget } from "../../../shared/toasts";
import type { InfoBudget} from "../../../shared/types";
import { supabase } from "../../lib/supabase";

export const updateBudgets = async(id: string, user_id: string, values: InfoBudget): Promise<InfoBudget | undefined> => {
            const category = values.category;
            const amount = values.amount;
            const dateStart = values.dateStart;
            const dateEnd = values.dateEnd;
 
        try {
            const { data, error  } = await supabase
            .from('budgets')
            .update([
                {
                    category,
                    amount,
                    dateStart,
                    dateEnd
                },
                ])
            .eq('id', id)
            .eq('user_id', user_id)
            .select()
        if (error) {throw error}
        if(data) {
                    notifyUpdateBudget();
                    return data[0];
                }
        } catch (error) {
            console.error('Ошибка редактирования бюджета', error);
            notifyTransaction();
        }
    }
