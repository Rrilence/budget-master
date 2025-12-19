import type { User } from "@supabase/supabase-js";
import type { InfoGoal } from "../../../shared/types";
import { supabase } from "../../lib/supabase";
import { regExpression } from "../../../shared/validation";
import { notifyCreateErrorGoal, notifyCreateGoal } from "../../../shared/toasts";


export const defaultState: InfoGoal = {
    user_id: null,
    name: '',
    totalAmount: 0,
    amount: 0,
    date: '',
    icon: '',
    error: null,
}

export const createGoal = (user: User) => {
    return async (
        prevState: InfoGoal,
        values: InfoGoal,
    ): Promise<InfoGoal> => {
        let name = values.name;
        const totalAmount = values.totalAmount;
        const amount = 0;
        const date = values.date;
        const icon = values.icon;
        
         if(regExpression.test(name.trim())) {
            name = name[0].toUpperCase() + name.slice(1)
        } else {
            return {
                ...prevState,
                error: 'Введите название на русском языке'}
        } 
            try {
                const { data, error } = await supabase
                .from('goals')
                .insert([
                {
                    user_id: user.id,
                    name: name,
                    totalAmount,
                    amount,
                    date,
                    icon,
                },
                ]).select()
                if (error) {throw error}
                if(data) {
                    notifyCreateGoal();
                    return data[0];
                }
                return {
                    ...prevState,
                    error: 'Не удалось создать запись',
                 };
            } catch (error) {
                console.error("Ошибка при добавлении цели", error); 
                notifyCreateErrorGoal();
                return {
                   ...prevState,
                };     
            }
    }
}
