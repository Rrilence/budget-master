import { startTransition, useActionState } from "react"
import { useDispatch } from "react-redux";
import { setNewPassword } from "../auth-slice";
import type { CreateActionState } from "../../shared/types";
import { updateUserPassword } from "./api";
import { notifynewPassword } from "../../shared/toasts";
import { Button, Form, Input, Typography } from "antd";
import type { FormProps } from "antd/lib";
const { Title } = Typography;

const UpdatePassword = () => {

    const dispatch = useDispatch();

    const [state, submitAction, isPending] = useActionState(
        async (prevState: CreateActionState,
                values: CreateActionState,) => {
        const result = await updateUserPassword()(prevState, values)

         if(result && result.error) {
                return result
                }
         if(result && result.success) {
                notifynewPassword()
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
                }
            dispatch(setNewPassword(false))
        return {
            password: '',
            passwordRepeat: '',
        }
        }, {
    })

    const onFinish: FormProps<CreateActionState>['onFinish'] = (values) => {
        startTransition(() => {
            submitAction(values);
        });
     };


    return (
            <Form 
            className='form'
            autoComplete="off"
            onFinish={onFinish}>
                <Title level={4} style={{textAlign: 'center'}}>Придумайте новый пароль:</Title>
                <Form.Item 
                    layout="vertical" 
                    label="Новый пароль:" 
                    name="password" 
                    rules={[{ required: true},
                        {min: 8, message: 'Пароль должен содержать не менее 8 символов!'}
                    ]} 
                    initialValue={state.password}
                    style={{marginBottom: 10}} >
                    <Input.Password/>
                </Form.Item>
                <Form.Item 
                    layout="vertical" 
                    label="Подтвердите пароль:" 
                    name="passwordRepeat" 
                    rules={[{ required: true}]} 
                    initialValue={state.password}
                    style={{marginBottom: 10}} >
                    <Input/>
                </Form.Item>
                <Button
                type='primary'
                htmlType="submit"
                style={{width: '150px', margin: '10px auto'}}
                disabled={isPending}>Обновить пароль</Button>
                {state!.error && <div style={{color: 'red', fontSize: '0.9rem'}}>{state!.error}</div>}
            </Form>
    )
}

export default UpdatePassword