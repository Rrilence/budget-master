import { SignUp } from '../../entities/SignUp/SignUp'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignIn, selectSignUp, setSignIn, setSignUp } from '../../entities/auth-slice'
import SignIn from '../../entities/SignIn/SignIn'

import { Button } from 'antd'

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
                <p className={styles.p}>Умный помощник учета вашего бюджета</p>
                <div>
                    <Button 
                    type="default"
                    size='large'
                    className={styles.button}
                    onClick={handleSignInClick}
                    >Войти в свой профиль</Button>
                    <Button 
                    type="default"
                    className={styles.button} 
                    size='large' 
                    onClick={handleSignUpClick}
                    >Зарегистрироваться</Button>
                </div>
            </div>
        }
        {signUp && !signIn && <SignUp/>}
        {signIn && !signUp && <SignIn/>}
        </>
    )
}

export default StartPage