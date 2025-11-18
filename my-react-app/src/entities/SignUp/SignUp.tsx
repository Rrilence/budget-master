import { useActionState } from 'react'
import { createUser } from './api'
import type { CreateActionState } from '../../shared/types'
import { useDispatch } from 'react-redux'
import { setSignIn, setSignUp } from '../auth-slice'
import { Button, Input } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'


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

    const handlenavigate = () => window.location.href = '/';

    return (
        <>
        <Button shape="circle" icon={<LogoutOutlined rotate={180}/>} onClick={handlenavigate} style={{margin: '10px 0 0 10px'}}/>
            <form 
            className='form'
            action={submitAction}
            autoComplete="off">
                <h1 className='title'>Регистрация</h1>
                <label htmlFor="email">Email:</label>
                <Input
                type="email" 
                name="email" 
                id="email" 
                defaultValue={state.email}
                placeholder='mail@email.ru'
                required
                />
                <label htmlFor="password">Пароль:</label>
                <Input.Password
                name="password" 
                defaultValue={state.password}
                id="password" 
                required/>
                <label htmlFor="passwordRepeat"> Подтвердите пароль:</label>
                <Input
                type="text" 
                name="passwordRepeat" 
                id="passwordRepeat" 
                required/>
                <label htmlFor="login">Имя пользователя:</label>
                <Input
                type="text" 
                name="login"
                id="login"
                defaultValue={state.login}
                required/>
                <Button
                style={{margin: '10px auto', width: '200px'}}
                type='primary'
                htmlType="submit"
                disabled={isPending}>Зарегистрироваться</Button>
                {state!.error && <div style={{color: 'red'}}>{state!.error}</div>}
            </form>
        </>
    )
}

export {SignUp}