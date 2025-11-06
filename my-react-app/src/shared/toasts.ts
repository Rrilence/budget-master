import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const notifySignUp = () => {
    toast.success('Регистрация прошла успешно', {
        toastId: '001',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
}

const notifynewPassword = () => {
    toast.success('Пароль успешно изменен', {
        toastId: '001',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
}


const notifySignUpError = () => {
    toast.error('Ошибка при регистрации', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyUpdatePasswordError = () => {
    toast.error('Ошибка при обновлении пароля', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

export {notifySignUp, notifySignUpError, notifyUpdatePasswordError, notifynewPassword}