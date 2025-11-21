import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../entities/lib/supabase";
import type { InfoExpense } from "../../../shared/types"
import { regExpression } from "../../../shared/validation";
import { notifyCreateErrorExpense, notifyCreateExpense } from "../../../shared/toasts";

export const defaultState: InfoExpense = {
    user_id: null,
    name: '',
    category: '',
    amount: 0,
    date: '',
    error: null,
}

export const createExpenses = (user: User) => {
    return async (
        prevState: InfoExpense,
        values: InfoExpense,
    ): Promise<InfoExpense> => {
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
                const { data, error } = await supabase
                .from('expenses')
                .insert([
                {
                    user_id: user.id,
                    name: name,
                    category,
                    amount,
                    date,
                },
                ]).select()
                if (error) {throw error}
                if(data) {
                    notifyCreateExpense();
                    console.log(data);
                    
                    return data[0];
                }
                return {
                    ...prevState,
                    error: 'Не удалось создать запись',
                 };
            } catch (error) {
                console.error("Ошибка при добавлении статьи расхода", error); 
                notifyCreateErrorExpense();
                return {
                   ...prevState,
                };     
            }
    }
}
