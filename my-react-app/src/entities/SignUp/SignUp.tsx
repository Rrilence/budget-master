import { startTransition, useActionState } from 'react'
import { createUser } from './api'
import type { CreateActionState } from '../../shared/types'
import { useDispatch } from 'react-redux'
import { setSignIn, setSignUp } from '../auth-slice'
import { Button, Form, Input, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd/lib'

const { Title } = Typography;

const SignUp = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [state, submitAction, isPending] = useActionState(
        async (prevState: CreateActionState,
                values: CreateActionState,) => {
        const result = await createUser()(prevState, values)

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

    const onFinish: FormProps<CreateActionState>['onFinish'] = (values) => {
        startTransition(() => {submitAction(values)});
            form.resetFields();
        };

    const handlenavigate = () => window.location.href = '/';

    return (
        <>
        <Button shape="circle" icon={<LogoutOutlined rotate={180}/>} onClick={handlenavigate} style={{margin: '10px 0 0 10px'}}/>
            <Form 
            form={form}
            className='form'
            onFinish={onFinish}
            autoComplete="off"
            style={{marginTop: 80}}>
                <Title style={{textAlign: 'center'}}>Регистрация</Title>
                <Form.Item 
                    layout="vertical" 
                    label="Email:" 
                    name="email" 
                    rules={[{ required: true},
                        {type: 'email', message: 'Введите адрес электронной почты (email) в виде mail@email.ru'}
                    ]} 
                    initialValue={state.email}
                    style={{marginBottom: 4}}>
                    <Input placeholder='mail@email.ru'/>
                </Form.Item>
                <Form.Item 
                    layout="vertical" 
                    label="Пароль:" 
                    name="password" 
                    rules={[
                        { required: true },
                        {min: 8, message: 'Пароль должен содержать не менее 8 символов!'}
                    ]} 
                    style={{marginBottom: 4}} 
                    initialValue={state.password}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item 
                    layout="vertical" 
                    label="Подтвердите пароль:" 
                    name="passwordRepeat" 
                    rules={[{ required: true}]} 
                    initialValue={state.passwordRepeat}
                    style={{marginBottom: 4}} >
                    <Input/>
                </Form.Item>
                <Form.Item 
                    layout="vertical" 
                    label="Имя пользователя:" 
                    name="login" 
                    rules={[{ required: true}]} 
                    initialValue={state.login}
                    style={{marginBottom: 4}} >
                    <Input/>
                </Form.Item>
                <Button
                style={{margin: '10px auto', width: '200px'}}
                type='primary'
                htmlType="submit"
                disabled={isPending}>Зарегистрироваться</Button>
                {state!.error && <div style={{color: 'red', fontSize: '0.9rem'}}>{state!.error}</div>}
            </Form>
        </>
    )
}

export {SignUp}