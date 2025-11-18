import { useActionState } from "react"
import { entrance } from "./api"
import type { CreateActionState } from "../../shared/types"
import { useDispatch, useSelector } from "react-redux"
import { selectResetPassword, setResetPassword, setSignIn, setSignOut, setSignUp } from "../auth-slice"

import styles from './styles.module.css'
import ResetPassword from "../ResetPassowrd/ResetPassword"

import { Button, Input } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { notifySignInError } from "../../shared/toasts"

const SignIn = () => {

    const dispatch = useDispatch();
    const resetPassword = useSelector(selectResetPassword);

    const [state, submitAction, isPending] = useActionState(async (prevState: CreateActionState,
                formData: FormData,) => {
        const result = await entrance()(prevState, formData)

        if(result && result.error) {
            notifySignInError();
            return result
        } else {
            dispatch(setSignIn(false));
               dispatch(setSignUp(false));
               dispatch(setSignOut(false));
               window.location.href = '/';
           return {
               email: '',
               password: ''
           }
        }
        }
        , {
        email: '',
        password: ''
    })

    const handlePassword = () => {
        dispatch(setResetPassword(true))
    }

    const handlenavigate = () => window.location.href = '/';

    return (
        <>
        <Button shape="circle" icon={<LogoutOutlined rotate={180}/>} onClick={handlenavigate} style={{margin: '10px 0 0 10px'}}/>
            {!resetPassword && 
                <form 
                className='form'
                action={submitAction}
                autoComplete="off">
                    <h1 className='title'>Вход</h1>
                    <label htmlFor="email">Email:</label>
                    <Input 
                    className='input'
                    type="email" 
                    name="email" 
                    id="email" 
                    defaultValue={state.email}
                    placeholder='mail@mail.ru'
                    required
                    />
                    <label htmlFor="password">Пароль:</label>
                    <Input.Password
                    name="password" 
                    defaultValue={state.password}
                    id="password" 
                    required/>
                    <button 
                    className={styles.reset}
                    onClick={handlePassword}>Забыли пароль?</button>
                    <Button
                    type="primary"
                    htmlType="submit"
                    style={{width: '150px', margin: '0 auto 10px'}}
                    disabled={isPending}>Войти</Button>
                    {state!.error && <div style={{color: 'red'}}>Пользователь не зарегистрирован</div>}
                </form>
            }
            {resetPassword && <ResetPassword/>}
        </>
    )
}

export default SignIn