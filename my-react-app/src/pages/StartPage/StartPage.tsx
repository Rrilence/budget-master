import { SignUp } from '../../entities/SignUp/SignUp'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignIn, selectSignUp, setSignIn, setSignUp } from '../../entities/auth-slice'
import SignIn from '../../entities/SignIn/SignIn'

import { Button, Flex, Typography } from 'antd'
const { Title } = Typography;

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
            <Flex vertical align='center' className={styles.welcome}>
                <Title>Добро пожаловать!</Title>
                <Title level={2} style={{marginTop: 0}}>Вас приветсвует <br /> BUDGET MASTER</Title>
                <Title level={5} style={{margin: '0 0 20px'}}>Умный помощник учета вашего бюджета</Title>
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
            </Flex>
        }
        {signUp && !signIn && <SignUp/>}
        {signIn && !signUp && <SignIn/>}
        </>
    )
}

export default StartPage