import type { User } from "@supabase/supabase-js";
import { supabase } from "../../../entities/lib/supabase";
import type { InfoIncome } from "../../../shared/types"
import { regExpression } from "../../../shared/validation";
import { notifyCreateErrorIncome, notifyCreateIncome } from "../../../shared/toasts";

export const defaultState: InfoIncome = {
    user_id: null,
    name: '',
    amount: 0,
    date: '',
    error: null,
}

export const createIncomes = (user: User) => {
    return async (
        prevState: InfoIncome,
        values: InfoIncome,
    ): Promise<InfoIncome> => {
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
                const { data, error } = await supabase
                .from('incomes')
                .insert([
                {
                    user_id: user.id,
                    name: name,
                    amount,
                    date,
                },
                ]).select()
                if (error) {throw error}
                if(data) {
                    notifyCreateIncome();
                    return data[0];
                }
                return {
                    ...prevState,
                    error: 'Не удалось создать запись',
                 };
            } catch (error) {
                console.error("Ошибка при добавлении статьи дохода", error); 
                notifyCreateErrorIncome();
                return {
                   ...prevState,
                };     
            }
    }
}
