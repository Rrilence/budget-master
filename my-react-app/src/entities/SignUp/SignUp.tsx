import { useActionState } from 'react'
import { createUser } from './api'
import type { CreateActionState } from '../../shared/types'
import { useDispatch } from 'react-redux'
import { setSignIn, setSignUp } from '../auth-slice'


const SignUp = () => {

    const dispatch = useDispatch();

    const [state, submitAction, isPending] = useActionState(
        async (prevState: CreateActionState,
                formData: FormData,) => {
        const result = await createUser()(prevState, formData)

         if(result && result.error) {
                    return result
                }
                dispatch(setSignIn(true));
                dispatch(setSignUp(false));
                return {
                    email: '',
                    password: '',
                    passwordRepeat: '',
                    login: ''
                }

        }, {email: '',
        password: '',
        passwordRepeat: '',
        login: ''
    })

    return (
        <form 
        className='form'
        action={submitAction}
        autoComplete="off">
            <h1 className='title'>Регистрация</h1>
            <label htmlFor="email">Email:</label>
            <input 
            className='input'
            type="email" 
            name="email" 
            id="email" 
            defaultValue={state.email}
            placeholder='ivanov@mail.ru'
            required
            />
            <label htmlFor="password">Пароль:</label>
            <input 
            className='input'
            type="password" 
            name="password" 
            defaultValue={state.password}
            id="password" 
            required/>
            <label htmlFor="passwordRepeat"> Подтвердите пароль:</label>
            <input 
            className='input'
            type="password" 
            name="passwordRepeat" 
            id="passwordRepeat" 
            required/>
            <label htmlFor="login">Имя пользователя:</label>
            <input 
            className='input'
            type="text" 
            name="login"
            id="login"
            defaultValue={state.login}
            required/>
            <button
            className='button'
            type='submit'
            disabled={isPending}>Зарегистрироваться</button>
            {state!.error && <div>{state!.error}</div>}
        </form>
    )
}

export {SignUp}