import type { CreateActionState } from "../../shared/types";
import { EMAIL_REGEXP } from "../../shared/validation";
import { supabase } from "../lib/supabase";

const inputEmail = () => {
    return async (
        prevState: CreateActionState,
        formData: FormData,
    ): Promise<CreateActionState | true> => {
        const email = formData.get('email') as string;

        if(typeof email === 'string' && !EMAIL_REGEXP.test(email)) {
                return {
                    ...prevState,
                    error: 'Введите адрес электронной почты (email) в виде mail@email.ru',
                    email,
                }      
            } 
        const { data, error} = await supabase.auth.resetPasswordForEmail(email, {
            // redirectTo: `${window.location.origin}/update-password`
            redirectTo: 'http://localhost:5173/update-password/'
        });
         if (error) {
            console.error('Ошибка при запросе сброса пароля:', error);
        }
        if (data) {
            return true
        }
        return true; 
    }
}

export {inputEmail}