import { useActionState } from "react"
import { useDispatch } from "react-redux";
import { setNewPassword } from "../auth-slice";
import type { CreateActionState } from "../../shared/types";
import { updateUserPassword } from "./api";
import { notifynewPassword } from "../../shared/toasts";
import { Button, Input } from "antd";

const UpdatePassword = () => {

    const dispatch = useDispatch();

    const [state, submitAction, isPending] = useActionState(
        async (prevState: CreateActionState,
                formData: FormData,) => {
        const result = await updateUserPassword()(prevState, formData)

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

    return (
        <>
            <form 
            className='form'
            action={submitAction}
            autoComplete="off">
                <h1 className='title'>Придумайте новый пароль:</h1>
                <label htmlFor="password">Новый пароль:</label>
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
                <Button
                type='primary'
                htmlType="submit"
                style={{width: '150px', margin: '10px auto'}}
                disabled={isPending}>Обновить пароль</Button>
                {state!.error && <div>{state!.error}</div>}
            </form>
        </>
    )
}

export default UpdatePassword