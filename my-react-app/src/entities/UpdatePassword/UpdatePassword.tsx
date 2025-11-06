import { useActionState } from "react"
import { useDispatch} from "react-redux";
import { setNewPassword } from "../auth-slice";
import type { CreateActionState } from "../../shared/types";
import { updateUserPassword } from "./api";
// import { useSearchParams } from "react-router-dom";
// import { supabase } from "../lib/supabase";


const UpdatePassword = () => {

    // const [searchParams] = useSearchParams();
    // console.log(searchParams);
    
    // const accessToken = searchParams.get('token');
    // const error = searchParams.get('error');
    // const errorDescription = searchParams.get('error_description');
    // const navigate = useNavigate();
    // const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

//     useEffect(() => {
//         const exchangeCodeForSession = async () => {
//         if (accessToken) {
//             const { data, error } = await supabase.auth.exchangeCodeForSession(
//                 accessToken
//             )

//             if (error) {
//                 console.error("Ошибка при обмене токена на сессию:", error);
//                 navigate('/welcome', { replace: true, state: { error: 'Не удалось создать сессию.' } });
//                 return;
//             }


//             console.log("Сессия успешно создана:", data.session);
//         } else if (error) {
//             return; 
//         }
//          else {
//                  navigate('/welcome'); 
//                  return;
//              }
//     };

//     exchangeCodeForSession();
// }, [accessToken, navigate, error]);


    const [state, submitAction, isPending] = useActionState(
        async (prevState: CreateActionState,
                formData: FormData,) => {
        const result = await updateUserPassword()(prevState, formData)

         if(result && result.error) {
                    return result
                }
            // setSuccess(true);
            dispatch(setNewPassword(false))
        return {
            password: '',
            passwordRepeat: '',
        }
        }, {
    })

    // if (error) {
    //     return (
    //         <div>
    //             <h1>Ошибка сброса пароля</h1>
    //             <p>{errorDescription || 'Неверная ссылка для сброса пароля.'}</p>
    //             <p>Пожалуйста, запросите сброс пароля еще раз.</p>
    //         </div>
    //     );
    // }

    return (
        <>
        {/* {success && <div>Пароль успешно обновлен! Теперь вы можете войти c новым паролем. Обновите страницу</div>
        } */}
            <form 
            className='form'
            action={submitAction}
            autoComplete="off">
                <h1 className='title'>Придумайте новый пароль:</h1>
                <label htmlFor="password">Новый пароль:</label>
                <input 
                className='input'
                type="password" 
                name="password" 
                defaultValue={state.password}
                id="password" 
                required/>
                <label htmlFor="passwordRepeat"> Подтвердите пароль:</label>
                <input 
                className='input'
                type="password" 
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