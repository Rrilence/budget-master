import { useActionState } from "react"
import { entrance } from "./api"
import type { CreateActionState } from "../../shared/types"
import { useDispatch, useSelector } from "react-redux"
import { selectResetPassword, selectVisible, setIsVisible, setResetPassword, setSignIn, setSignOut, setSignUp } from "../auth-slice"

import styles from './styles.module.css'
import ResetPassword from "../ResetPassowrd/ResetPassword"

const SignIn = () => {
    const dispatch = useDispatch();
    const resetPassword = useSelector(selectResetPassword);
    const isVisible = useSelector(selectVisible);

    const [state, submitAction, isPending] = useActionState(
        async (prevState: CreateActionState,
                formData: FormData,) => {
        const result = await entrance()(prevState, formData)

        if(result && result.error) {
            return result
        }
        dispatch(setSignIn(false));
        dispatch(setSignUp(false));
        dispatch(setSignOut(false));
        window.location.href = '/';

        return {
            email: '',
            password: ''
        }
        }
        , {
        email: '',
        password: ''
    })

    const handlePassword = () => {
        dispatch(setResetPassword(true))
    }

    return (
        <>
            {!resetPassword && 
                <form 
                className='form'
                action={submitAction}
                autoComplete="off">
                    <h1 className='title'>Вход</h1>
                    <label htmlFor="email">Email:</label>
                    <input 
                    className='input'
                    type="email" 
                    name="email" 
                    id="email" 
                    defaultValue={state.email}
                    placeholder='mail@mail.ru'
                    required
                    />
                    <label htmlFor="password">Пароль:</label>
                    <div style={{ position: 'relative' }}>
                        <input 
                        className='input'
                        type={isVisible ? 'text' : 'password'} 
                        name="password" 
                        defaultValue={state.password}
                        id="password" 
                        required/>
                        <button
                        onClick={() => dispatch(setIsVisible(!isVisible))}
                        className='is_visible'
                        ><i className={isVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                        </button>
                    </div>
                    <button 
                    className={styles.reset}
                    onClick={handlePassword}>Забыли пароль?</button>
                    <button
                    className='button'
                    type='submit'
                    disabled={isPending}>Войти</button>
                    {state!.error && <div>{state!.error}</div>}
                </form>
            }
            {resetPassword && <ResetPassword/>}
        </>
    )
}

export default SignIn