import type { User } from "@supabase/supabase-js";
import type { InfoBudget } from "../../../shared/types";
import { supabase } from "../../lib/supabase";
import { notifyCreateBudget, notifyCreateErrorBudget } from "../../../shared/toasts";


export const defaultState: InfoBudget = {
    user_id: null,
    category: '',
    amount: 0,
    period: '',
    dateStart: '',
    dateEnd: '',
    error: null,
}

export const createBudget = (user: User) => {
    return async (
        prevState: InfoBudget,
        values: InfoBudget,
    ): Promise<InfoBudget> => {
        const category = values.category;
        const amount = values.amount;
        const period = values.period;
        const dateStart = values.dateStart;
        const dateEnd = values.dateEnd;

            try {
                const { data, error } = await supabase
                .from('budgets')
                .insert([
                    {
                    user_id: user.id,
                    category,
                    amount,
                    period,
                    dateStart,
                    dateEnd,
                    },
                ]).select()
                if (error) {throw error}
                if(data) {
                    notifyCreateBudget();
                    return data[0];
                }
                return {
                    ...prevState,
                    error: 'Не удалось создать запись',
                };
                
            } catch (error) {
                console.error("Ошибка при добавлении статьи расхода", error); 
                notifyCreateErrorBudget();
                return {
                   ...prevState,
                };     
            }
    }
}
