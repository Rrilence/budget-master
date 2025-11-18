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

const notifySignInError = () => {
    toast.error('Пользователь не зарегистрирован', {
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

const notifyName = () => {
    toast.warn('Введите название на русском языке', {
        toastId: '002',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
}

const notifyWeatherCity = () => {
    toast.error('Неизвестный город', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyGeolocation = () => {
    toast.error('Неудалось определить вашу геолокацию', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyCreateExpense = () => {
    toast.success('Статья расходов добавлена', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyNameExpense = () => {
    toast.success('Введите название на русском языке', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyErrorExpenses = () => {
    toast.error('Ошибка при загрузке данных расходов', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

export {
    notifySignUp, 
    notifySignUpError, 
    notifyUpdatePasswordError, 
    notifynewPassword, 
    notifyName,
    notifyGeolocation,
    notifyWeatherCity,
    notifyCreateExpense,
    notifyErrorExpenses,
    notifyNameExpense,
    notifySignInError,
}