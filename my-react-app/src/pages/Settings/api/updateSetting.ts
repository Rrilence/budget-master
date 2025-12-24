import { supabase } from "../../../entities/lib/supabase";
import { notifyErrorSettings, notifySettings } from "../../../shared/toasts";
import type { Settings } from "../../../shared/types";


export const updateSettings = async(user_id: string, dataSetting: Settings): Promise<Settings | undefined> => {
    try {
        const { data, error  } = await supabase
        .from('settings')
        .update([
            {
                currency: dataSetting.currency,
                category: dataSetting.category,
                notifications: dataSetting.notifications,
                exchangeRate: dataSetting.exchangeRate,
                weather: dataSetting.weather,
            },
            ])
        .eq('user_id', user_id)
        .select()
    if (error) throw error
    if(data) {
        notifySettings();
        return data[0];
    }
    } catch (error) {
        console.error('Ошибка, настройки не применены', error);
        notifyErrorSettings();
    }
}