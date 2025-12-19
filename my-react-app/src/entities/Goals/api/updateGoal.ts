import { notifyTransaction, notifyUpdateGoal } from "../../../shared/toasts";
import type { InfoGoal } from "../../../shared/types";
import { supabase } from "../../lib/supabase";


export const updateGoal = async(id: string, user_id: string, values: InfoGoal): Promise<InfoGoal | undefined> => {
    const name = values.name;
    const totalAmount = values.totalAmount;
    const amount = values.amount;
    const date = values.date;
    const icon = values.icon;

    try {
        const { data, error  } = await supabase
        .from('goals')
        .update([
            {
                name,
                totalAmount,
                amount,
                date,
                icon,
            },
            ])
        .eq('id', id)
        .eq('user_id', user_id)
        .select()
    if (error) {throw error}
    if(data) {
                notifyUpdateGoal();
                return data[0];
            }
    } catch (error) {
        console.error('Ошибка редактирования цели', error);
        notifyTransaction();
    }
}
