import { SignUp } from '../../entities/SignUp/SignUp'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignIn, selectSignUp, setSignIn, setSignUp } from '../../entities/auth-slice'
import SignIn from '../../entities/SignIn/SignIn'

const StartPage = () => {
    const dispatch = useDispatch();
    const signUp = useSelector(selectSignUp);
    const signIn = useSelector(selectSignIn);

    const handleSignUpClick = () => {
        dispatch(setSignUp(true))
    }

    const handleSignInClick = () => {
        dispatch(setSignIn(true))
    }

    return (
        <>
        {!signUp && !signIn &&
            <div className={styles.welcome}>
                <h1>Добро пожаловать!</h1>
                <h2>Вас приветсвует <br /> BUDGET MASTER</h2>
                <p>Умный помощник учета вашего бюджета</p>
                <div className={styles.buttons}>
                    <button 
                    onClick={handleSignInClick}
                    >Войти в свой профиль</button>
                    <button 
                    onClick={handleSignUpClick}
                    >Зарегистрироваться</button>
                </div>
            </div>
        }
        {signUp && !signIn && <SignUp/>}
        {signIn && !signUp && <SignIn/>}
        </>
    )
}

export default StartPage