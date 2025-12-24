import { notifyErrorSettings, notifySettings } from "../../shared/toasts";
import type { ThemeState } from "../../shared/types";
import { supabase } from "../lib/supabase";


export const updateTheme = async(user_id: string, theme: ThemeState): Promise<ThemeState | undefined> => {
    try {
        const { data, error  } = await supabase
        .from('settings')
        .update([
            {theme},
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