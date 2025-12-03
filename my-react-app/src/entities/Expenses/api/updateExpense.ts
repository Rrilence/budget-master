import { notifyTransaction, notifyUpdateExpense } from "../../../shared/toasts";
import type { InfoExpense } from "../../../shared/types";
import { regExpression } from "../../../shared/validation";
import { supabase } from "../../lib/supabase";

export const updateExpenses = async(id: string, user_id: string, prevState: InfoExpense, values: InfoExpense): Promise<InfoExpense | undefined> => {
            let name = values.name;
            const category = values.category;
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
            .from('expenses')
            .update([
                {
                    name: name,
                    category: category,
                    amount: amount,
                    date: date,
                },
                ])
            .eq('id', id)
            .eq('user_id', user_id)
            .select()
        if (error) {throw error}
        if(data) {
                    notifyUpdateExpense();
                    return data[0];
                }
        } catch (error) {
            console.error('Ошибка редактирования статьи расходов', error);
            notifyTransaction();
        }
    }
