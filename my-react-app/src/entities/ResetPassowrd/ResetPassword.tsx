import { useActionState } from "react";
import type { CreateActionState } from "../../shared/types";
import { inputEmail } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { selectNewPassword, setNewPassword } from "../auth-slice";
import styles from './styles.module.css'
import { Button, Input } from "antd";

const ResetPassword = () => {
    const dispatch = useDispatch()
    const newPassword = useSelector(selectNewPassword)

    const [state, submitAction] = useActionState(
        async (prevState: CreateActionState,
                formData: FormData): Promise<CreateActionState> => {
        const result = await inputEmail()(prevState, formData)

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

       return (
        <>
        {!newPassword &&
            <form 
            className='form'
            action={submitAction}
            autoComplete="off">
                <label htmlFor="email">Введите Ваш Email:</label>
                <Input 
                className='input'
                type="email" 
                name="email" 
                id="email" 
                defaultValue={state.email}
                placeholder='mail@mail.ru'
                required
                />
                <Button
                style={{width: '150px', margin: '10px auto'}}
                type='primary'
                htmlType="submit">Сбросить пароль</Button>
                {state!.error && <div>{state!.error}</div>}
            </form>
        }
        {newPassword && <div className={styles.checkEmail}>Ссылка для сброса пароля отправлена на Ваш email</div>}
        </>
    )
}

export default ResetPassword


