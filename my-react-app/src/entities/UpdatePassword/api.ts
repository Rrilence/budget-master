import { notifyUpdatePasswordError } from "../../shared/toasts";
import type { CreateActionState } from "../../shared/types";
import { supabase } from "../lib/supabase";


const updateUserPassword = () => {
     return async (
        prevState: CreateActionState,
        values:  CreateActionState,
    ): Promise<CreateActionState> => {
        const password = values.password?.trim();
        const passwordRepeat = values.passwordRepeat?.trim();

        if(typeof password === 'string' && password.length < 8) {
            return {
                error: 'Пароль должен содержать не менее 8 символов',
                password: prevState.password,
            } 
        } else if(typeof passwordRepeat === 'string' && passwordRepeat != password) {
            return {
                error: 'Пароли не совпадают',
                password,
                passwordRepeat: '',
            } 
        } else {
            try {
                 const {data, error} = await supabase.auth.updateUser( 
                    {password: password}
            ) 
                if (error) throw error   
                if(data) {
                    return {
                        password: '',
                        passwordRepeat: '',
                        success: true,
                    }
                }
                return {
                        password: '',
                        passwordRepeat: '',
                        success: true,
                    }
                
            } catch (error) {
                console.error('Ошибка при обновлении пароля', error);
                notifyUpdatePasswordError()
                return {...prevState,
                    password: '',
                    passwordRepeat: '',
                    error: 'Не удалось обновить пароль. Попробуйте еще раз.'
                }
            }
        }      
    }
}

export {updateUserPassword}