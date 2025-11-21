import { AuthError } from "@supabase/supabase-js";
import { notifySignUp, notifySignUpError, notifySignUpError2 } from "../../shared/toasts";
import type { CreateActionState } from "../../shared/types";
import { EMAIL_REGEXP, LOGIN_REGEXP } from "../../shared/validation";
import { supabase } from "../lib/supabase";


const createUser = () => {
     return async (
        prevState: CreateActionState,
        values: CreateActionState,
    ): Promise<CreateActionState> => {
        let errors = {}
        const email = values.email?.trim();
        const password = values.password?.trim();
        const passwordRepeat = values.passwordRepeat?.trim();
        let login = values.login?.trim();

        if(email && password && passwordRepeat && login) {
            if(typeof email === 'string' && !EMAIL_REGEXP.test(email)) {
                errors = {
                    ...errors,
                    error: 'Введите адрес электронной почты (email) в виде mail@email.ru',
                } 
            }
    
            if(typeof password === 'string' && password.length < 8) {
                errors = {
                    ...errors,
                    error: 'Пароль должен содержать не менее 8 символов',
                } 
            }
            
            if(typeof passwordRepeat === 'string' && passwordRepeat != password) {
                errors = {
                    ...errors,
                    error: 'Пароли не совпадают',
                } 
            }
            
            if(typeof login === 'string' && !LOGIN_REGEXP.test(login.trim())) {
                errors = {
                    ...errors,
                    error: 'Введите Имя пользователя Латинскими символами',
                } 
            } else  {
                login = login[0].toUpperCase() + login.slice(1)
            } 
            if (Object.keys(errors).length > 0) {
                return {
                    ...prevState,
                    ...errors,
                };
            }
    
            try {
                 const {data, error} = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            login,
                        }
                    }
                }) 
                if (error) throw error
                if(data) {
                    notifySignUp()
                    return {
                        email: '',
                        password: '',
                        passwordRepeat: '',
                        login: ''
                    }
                }
                
            } catch (error) {
                if(error instanceof AuthError && error.status === 422) {
                    notifySignUpError2();
                } else {
                    console.error('Ошибка при регистрации', error);
                    notifySignUpError();
                }
                return {...prevState,
                    email: email || '',
                    password: '',
                    passwordRepeat: '',
                    login: login || ''
                }
            }

        }
        return {
            ...prevState,
            email: email || '',
            password: '',
            passwordRepeat: '',
            login: login || '',
            error: 'Заполните все поля, пожалуйста',
            }
    }
}

export {createUser}


