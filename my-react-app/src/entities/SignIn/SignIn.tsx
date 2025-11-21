import { startTransition, useActionState } from "react"
import { entrance } from "./api"
import type { CreateActionState } from "../../shared/types"
import { useDispatch, useSelector } from "react-redux"
import { selectResetPassword, setLoading, setResetPassword, setSignIn, setSignOut, setSignUp } from "../auth-slice"

import ResetPassword from "../ResetPassowrd/ResetPassword"

import { Button, Form, Input, type FormProps, Typography } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { notifySignInError } from "../../shared/toasts"

const { Title } = Typography;

const SignIn = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const resetPassword = useSelector(selectResetPassword);

    const [state, submitAction, isPending] = useActionState(async (prevState: CreateActionState,
     values: CreateActionState,) => {
        const result = await entrance()(prevState, values)

        if(result && result.error) {
            notifySignInError();
            return result
        } else {
            dispatch(setSignIn(false));
               dispatch(setSignUp(false));
               dispatch(setSignOut(false));
               dispatch(setLoading(true));
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

    const onFinish: FormProps<CreateActionState>['onFinish'] = (values) => {
            startTransition(() => {
                submitAction(values);
            });
        form.resetFields();
    };

    const handlePassword = () => {dispatch(setResetPassword(true))}

    const handlenavigate = () => window.location.href = '/';

    return (
        <>
        <Button shape="circle" icon={<LogoutOutlined rotate={180}/>} onClick={handlenavigate} style={{margin: '10px 0 0 10px'}}/>
            {!resetPassword && 
                <Form
                form={form}
                className='form'
                onFinish={onFinish}
                autoComplete="off"
                >
                    <Title style={{textAlign: 'center'}}>Вход</Title>
                    <Form.Item 
                    layout="vertical" 
                    label="Email:" 
                    name="email" 
                    rules={[{ required: true},
                        {type: 'email', message: 'Введите адрес электронной почты (email) в виде mail@email.ru'}
                    ]} 
                    initialValue={state.email}
                    style={{marginBottom: 10}} >
                    <Input 
                    className='input'
                    placeholder='mail@mail.ru'
                    />
                    </Form.Item>
                    <Form.Item 
                    layout="vertical" 
                    label="Пароль:" 
                    name="password" 
                    rules={[
                        { required: true },
                        {min: 8, message: 'Пароль должен содержать не менее 8 символов!'}
                    ]} 
                    style={{marginBottom: 10}} 
                    initialValue={state.password}>
                    <Input.Password/>
                    </Form.Item>
                    <Button
                    type="text" 
                    onClick={handlePassword}>Забыли пароль?</Button>
                    <Button
                    type="primary"
                    htmlType="submit"
                    style={{width: '150px', margin: '0 auto 10px'}}
                    disabled={isPending}>Войти</Button>
                    {state!.error && <div style={{color: 'red', fontSize: '0.9rem'}}>Введен неверный пароль или пользователь не зарегистрирован</div>}
                </Form>
            }
            {resetPassword && <ResetPassword/>}
        </>
    )
}

export default SignIn