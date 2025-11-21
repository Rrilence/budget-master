import type { CreateActionState } from "../../shared/types";
import { EMAIL_REGEXP } from "../../shared/validation";
import { supabase } from "../lib/supabase";

const entrance = () => {
    return async (
        prevState: CreateActionState,
        values: CreateActionState,
    ): Promise<CreateActionState> => {
        const email = values.email?.trim();
        const password = values.password?.trim();

        if(email && password) {
            if(typeof email === 'string' && !EMAIL_REGEXP.test(email)) {
                return {
                    error: 'Введите адрес электронной почты (email) в виде mail@email.ru',
                    email,
                }
            } else if(typeof password === 'string' && password.length < 8) {
                return {
                    error: 'Пароль должен содержать не менее 8 символов',
                    email,
                    password: prevState.password,
                } 
            } else {
                try {
                     const {data, error} = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    }) 
                    if (error) throw error
                    if(data) {
                        return {
                            ...prevState,
                            email: '',
                            password: ''
                        }
                    }
                    
                } catch (error) {
                    console.error('Ошибка при входе', error);
                    return {
                        ...prevState,
                        email: email || '',
                        password: '',
                        error: (error as Error).message
                    }
                }
            }
        }
        return {
            ...prevState,
            email: email || '',
            password: '',
            error: 'Заполните все поля, пожалуйста'
        }
    }
}

export {entrance}