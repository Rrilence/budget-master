import { notifyTransaction, notifyUpdateIncome } from "../../../shared/toasts";
import type { InfoIncome } from "../../../shared/types";
import { regExpression } from "../../../shared/validation";
import { supabase } from "../../lib/supabase";

export const updateIncome = async(id: string, user_id: string, prevState: InfoIncome, values: InfoIncome): Promise<InfoIncome | undefined> => {
   
            let name = values.name;
            const amount = values.amount;
            const date = values.date;
            if(regExpression.test(name.trim())) {
            name = name[0].toUpperCase() + name.slice(1)
        } else {
            return {
                ...prevState,
                error: 'Введите название на русском языке'}
            } 
        try {
            const { data, error  } = await supabase
            .from('incomes')
            .update([
                {
                    name: name,
                    amount: amount,
                    date: date,
                },
                ])
            .eq('id', id)
            .eq('user_id', user_id)
            .select()
        if (error) {throw error}
        if(data) {
                    notifyUpdateIncome();
                    return data[0];
                }
        } catch (error) {
            console.error('Ошибка редактирования статьи доходов', error);
            notifyTransaction();
        }
    }
