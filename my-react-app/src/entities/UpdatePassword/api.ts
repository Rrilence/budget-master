import { notifyUpdatePasswordError } from "../../shared/toasts";
import type { CreateActionState } from "../../shared/types";
import { supabase } from "../lib/supabase";


const updateUserPassword = () => {
     return async (
        prevState: CreateActionState,
        formData: FormData,
    ): Promise<CreateActionState> => {
        let errors: CreateActionState = {}
        const password = formData.get('password') as string;
        const passwordRepeat = formData.get('passwordRepeat') as string;

        if(typeof password === 'string' && password.length < 8) {
            errors = {
                ...errors,
                error: 'Пароль должен содержать не менее 8 символов',
                password: prevState.password,
            } 
        }
        
        if(typeof passwordRepeat === 'string' && passwordRepeat != password) {
            console.log('пароли не совпадают');
            errors = {
                ...errors,
                error: 'Пароли не совпадают',
                password,
                passwordRepeat: '',
            } 
        }       

        if (Object.keys(errors).length > 0) {
            return {
                ...prevState,
                ...errors,
            };
        }

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

export {updateUserPassword}