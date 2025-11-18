import { notifySignUp, notifySignUpError } from "../../shared/toasts";
import type { CreateActionState } from "../../shared/types";
import { EMAIL_REGEXP, LOGIN_REGEXP } from "../../shared/validation";
import { supabase } from "../lib/supabase";


const createUser = () => {
     return async (
        prevState: CreateActionState,
        formData: FormData,
    ): Promise<CreateActionState> => {
        let errors = {}
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordRepeat = formData.get('passwordRepeat') as string;
        let login = formData.get('login') as string;

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
        
        if(typeof passwordRepeat === 'string' && passwordRepeat != password) {
            errors = {
                ...errors,
                error: 'Пароли не совпадают',
                email,
                password,
                passwordRepeat: '',
            } 
        }
        
        if(typeof login === 'string' && !LOGIN_REGEXP.test(login.trim())) {
            errors = {
                ...errors,
                error: 'Введите Имя пользователя Латинскими символами',
                email,
                password,
                passwordRepeat,
                login: '',
            } 
        } else if (login.trim().length > 0) {
            login = login[0].toUpperCase() + login.slice(1)
        } else {
            errors = {
                ...errors,
                error: 'Имя пользователя не может быть пустым',
                email,
                password,
                passwordRepeat,
                login: '',
            } 
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
            console.error('Ошибка при регистрации', error);
            notifySignUpError()
            return {...prevState,
                email: email || '',
                password: '',
                passwordRepeat: '',
                login: login || ''
            }
        }
        return {...prevState,
                email: email || '',
                password: '',
                passwordRepeat: '',
                login: login || '',
                error: undefined,
            }
    }
}

export {createUser}


