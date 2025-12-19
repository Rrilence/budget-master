import { notifyErrorSaving, notifySaving } from "../../../shared/toasts";
import type { InfoGoal } from "../../../shared/types";
import { supabase } from "../../lib/supabase";


export const addSavings = async(id: string, user_id: string, value: number): Promise<InfoGoal | undefined> => {
    try {
        const { data, error  } = await supabase
        .from('goals')
        .update({
                amount: value,
            })
        .eq('id', id)
        .eq('user_id', user_id)
        .select()
    if (error) {throw error}
    if(data) {
        notifySaving();
        return data[0];
    }
    } catch (error) {
        console.error('Ошибка редактирования суммы накоплений', error);
        notifyErrorSaving();
    }
}
