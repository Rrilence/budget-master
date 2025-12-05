import type { User } from "@supabase/supabase-js";
import type { InfoBudget } from "../../../shared/types";
import { supabase } from "../../lib/supabase";
import { notifyCreateBudget, notifyCreateErrorBudget } from "../../../shared/toasts";
import dayjs from 'dayjs';
import { LineHeightOutlined } from "@ant-design/icons";

export const defaultState: InfoBudget = {
    user_id: null,
    category: '',
    amount: 0,
    period: '',
    dateStart: '',
    dateEnd: '',
    description: '',
    error: null,
}

const formatDate = (date: dayjs.Dayjs) => {
  return dayjs(date).format('DD.MM.YYYY'); 
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
        const description = values.description;

        const insertPromises: Promise<InfoBudget>[] = [];
        const start = dayjs(dateStart, 'DD.MM.YYYY');
        const end = dayjs(dateEnd, 'DD.MM.YYYY');
        if(period === "Еженедельно") {
            const startDate2 = start.add(7, 'day');
            const endDate2 = end.add(7, 'day');
            const startDate3 = start.add(14, 'day');
            const endDate3 = end.add(14, 'day');
            console.log(dateStart, formatDate(startDate2), formatDate(startDate3), dateEnd, formatDate(endDate2), formatDate(endDate3));
            
            insertPromises.push(insertBudgets(dateStart, dateEnd));
            insertPromises.push(insertBudgets(formatDate(startDate2), formatDate(endDate2)));
            insertPromises.push(insertBudgets(formatDate(startDate3), formatDate(endDate3)));

        } else if(period === "Ежемесячно") {
            const startDate2 = start.add(1, 'month');
            const endDate2 = end.add(1, 'month');
            const startDate3 = start.add(2, 'month');
            const endDate3 = end.add(2, 'month');

            insertPromises.push(insertBudgets(dateStart, dateEnd));
            insertPromises.push(insertBudgets(formatDate(startDate2), formatDate(endDate2)));
            insertPromises.push(insertBudgets(formatDate(startDate3), formatDate(endDate3)));

        } else  if(period === "Ежеквартально") {
            const startDate2 = start.add(3, 'month');
            const endDate2 = end.add(3, 'month');
            const startDate3 = start.add(6, 'month');
            const endDate3 = end.add(6, 'month');
            console.log(dateStart, formatDate(startDate2), formatDate(startDate3), dateEnd, formatDate(endDate2), formatDate(endDate3));

            insertPromises.push(insertBudgets(dateStart, dateEnd));
            insertPromises.push(insertBudgets(formatDate(startDate2), formatDate(endDate2)));
            insertPromises.push(insertBudgets(formatDate(startDate3), formatDate(endDate3)));

        } else  if(period === "Ежегодно") {
            const startDate2 = start.add(1, 'year');
            const endDate2 = end.add(1, 'year');
            const startDate3 = start.add(2, 'year');
            const endDate3 = end.add(2, 'year');

            insertPromises.push(insertBudgets(dateStart, dateEnd));
            insertPromises.push(insertBudgets(formatDate(startDate2), formatDate(endDate2)));
            insertPromises.push(insertBudgets(formatDate(startDate3), formatDate(endDate3)));
        }
        else {
            insertPromises.push(insertBudgets(dateStart, dateEnd));
        }

        async function insertBudgets (startDate: string, endDate: string) {
            try {
                const { data, error } = await supabase
                .from('budgets')
                .insert([
                    {
                    user_id: user.id,
                    category,
                    amount,
                    period,
                    dateStart: startDate,
                    dateEnd: endDate,
                    description,
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
        try {
            const results = await Promise.all(insertPromises);
            return results[0];
        } catch (error) {
            console.error("Ошибка при создании бюджета", error);
            return {
                ...prevState,
            };
        }
    }
}
