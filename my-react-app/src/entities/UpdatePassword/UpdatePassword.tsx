import { useActionState } from "react"
import { useDispatch, useSelector} from "react-redux";
import { selectVisible, setIsVisible, setNewPassword } from "../auth-slice";
import type { CreateActionState } from "../../shared/types";
import { updateUserPassword } from "./api";
import { notifynewPassword } from "../../shared/toasts";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const isVisible = useSelector(selectVisible)

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
                <label htmlFor="passwordRepeat"> Подтвердите пароль:</label>
                <input 
                className='input'
                type="text" 
                name="passwordRepeat" 
                id="passwordRepeat" 
                required/>
                <button
                className='button'
                type='submit'
                disabled={isPending}>Обновить пароль</button>
                {state!.error && <div>{state!.error}</div>}
            </form>
        </>
    )
}

export default UpdatePassword