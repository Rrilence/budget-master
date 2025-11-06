import type { CreateActionState } from "../../shared/types";
import { EMAIL_REGEXP } from "../../shared/validation";
import { supabase } from "../lib/supabase";


const entrance = () => {
    return async (
        prevState: CreateActionState,
        formData: FormData,
    ): Promise<CreateActionState> => {
        let errors: CreateActionState = {}
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if(typeof email === 'string' && !EMAIL_REGEXP.test(email)) {
            errors = {
                ...errors,
                error: 'Введите адрес электронной почты (email) в виде mail@email.ru',
                email,
            } 
        }

        if(typeof password === 'string' && password.length < 8) {
            errors = {
                ...errors,
                error: 'Пароль должен содержать не менее 8 символов',
                email,
                password: prevState.password,
            } 
        }

        if (Object.keys(errors).length > 0) {
            return {
                ...prevState,
                ...errors,
            };
        }

        try {
             const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            }) 
            if (error) throw error
            if(data) {
                console.log(data.user);
                
                return {
                    email: '',
                    password: ''
                }
            }
            
        } catch (error) {
            console.error('Ошибка при входе', error);
            return {...prevState,
                email: email || '',
                password: ''
            }
        }
        return {...prevState,
                email: email || '',
                password: '',
                error: undefined,
            }
    }
}

export {entrance}