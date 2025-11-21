import type { CreateActionState } from "../../shared/types";
import { EMAIL_REGEXP } from "../../shared/validation";
import { supabase } from "../lib/supabase";

const inputEmail = () => {
    return async (
        prevState: CreateActionState,
        values: CreateActionState,
    ): Promise<CreateActionState | true> => {
        const email = values.email?.trim();
        if(email) {
            if(typeof email === 'string' && !EMAIL_REGEXP.test(email)) {
                    return {
                        ...prevState,
                        error: 'Введите адрес электронной почты (email) в виде mail@email.ru',
                        email,
                    }      
                } 
                try {
                    const { data, error} = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: 'http://localhost:5173/update-password/'
                    });
                     if (error) {throw error}
                    if (data) {
                        return true
                    }
                    return true; 
                    
                } catch (error) {
                    console.error('Ошибка при запросе сброса пароля:', error);
                    return {error: 'Ошибка при запросе сброса пароля, обновите страницу'}
                }
        }
         return {
            ...prevState,
            error: 'Ошибка при запросе сброса пароля, обновите страницу'
         } 
    }
}

export {inputEmail}