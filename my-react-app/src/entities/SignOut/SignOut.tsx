import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css'
import { selectSidebar } from '../Sidebar/sidebar-slice';
import { selectUser, setSignIn, setSignOut, setSignUp } from '../auth-slice';
import { logoutUser } from './api';

const SignOut = () => {
    const dispatch = useDispatch()
    const sidebar = useSelector(selectSidebar);
    const user = useSelector(selectUser);

    const signOut = async () => {
        const result = await logoutUser()
            if(result) {
                console.log("Ошибка при выходе:", result);
                return 
            }
            
        dispatch(setSignOut(true))
        dispatch(setSignIn(false))
        dispatch(setSignUp(false))
        window.location.href = '/welcome';
    }

    return (
        <div className={styles.sign_out}
        onClick={signOut}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
                    {sidebar &&
                        <div className={styles.account}>
                            <p>{user?.user_metadata.login}</p>
                            <p>Выход</p>
                        </div>
                    }
        </div>
    )
}


export default SignOut