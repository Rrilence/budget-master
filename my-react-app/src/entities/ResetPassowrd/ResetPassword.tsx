import { startTransition, useActionState } from "react";
import type { CreateActionState } from "../../shared/types";
import { inputEmail } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { selectNewPassword, setNewPassword } from "../auth-slice";
import styles from './styles.module.css'
import { Button, Form, Input } from "antd";
import type { FormProps } from "antd/lib";

const ResetPassword = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const newPassword = useSelector(selectNewPassword)

    const [state, submitAction] = useActionState(
        async (prevState: CreateActionState,
                values: CreateActionState): Promise<CreateActionState> => {
        const result = await inputEmail()(prevState, values)

         if(result === true) {
                    dispatch(setNewPassword(true));
                }
                return {
                    ...prevState,
                    email: '', 
                    error: undefined
                    
                    
                }
        }, {email: '',}
    )

    const onFinish: FormProps<CreateActionState>['onFinish'] = (values) => {
                startTransition(() => {
                    submitAction(values);
                });
            form.resetFields();
        };

       return (
        <>
        {!newPassword &&
            <Form 
            form={form}
            className='form'
            onFinish={onFinish}
            autoComplete="off">
                <Form.Item
                layout="vertical" 
                label="Введите Ваш Email:" 
                name="email" 
                rules={[{ required: true},
                        {type: 'email', message: 'Введите адрес электронной почты (email) в виде mail@email.ru'}
                    ]} 
                >
                    <Input placeholder='mail@mail.ru'/>
                </Form.Item>
                <Button
                style={{width: '150px', margin: '0 auto'}}
                type='primary'
                htmlType="submit">Сбросить пароль</Button>
                {state!.error && <div>{state!.error}</div>}
            </Form>
        }
        {newPassword && <div className={styles.checkEmail}>Ссылка для сброса пароля отправлена на Ваш email</div>}
        </>
    )
}

export default ResetPassword


