import axios from "axios";
import type { Valute, ValuteItem } from "../../shared/types";
import { formatDateExchange } from "../../shared/formatting";

export const defaultExchange: Valute = {
    data: [],
    dateExchange: '',
    error: null,
}

export async function submitCourse(_prevState: Valute): Promise<Valute> {
    try {
        const res = await axios
        .get('https://www.cbr-xml-daily.ru/daily_json.js')
        const date = formatDateExchange(res.data.Date);
        const courseData: ValuteItem[] = Object.values(res.data.Valute)
        return {data: courseData, dateExchange: date, error: null}
    } catch (error) {
        console.error("Ошибка при получении данных Курса Валют", error);
    }
    return { ..._prevState,
        error: 'Данные Курса Валют не получены'
    }
}