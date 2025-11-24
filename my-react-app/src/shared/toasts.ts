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

const notifySignUpError2 = () => {
    toast.error('Пользователь с таким email уже зарегистрирован', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifySignInError = () => {
    toast.error('Ошибка входа', {
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
    toast.success('Статья расхода добавлена', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyCreateErrorExpense = () => {
    toast.error('Ошибка, статья расхода не добавлена', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyCreateIncome = () => {
    toast.success('Статья дохода добавлена', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyCreateErrorIncome = () => {
    toast.error('Ошибка, статья дохода не добавлена', {
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

const notifyUpdateExpense = () => {
    toast.success('Статья расходов редактирована', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyUpdateIncome = () => {
    toast.success('Статья доходов редактирована', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyError = () => {
    toast.error('Ошибка при загрузке данных', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyTransaction = () => {
    toast.error('Запись не может быть изменена или удалена', {
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
    notifyError,
    notifyNameExpense,
    notifySignInError,
    notifyCreateErrorExpense,
    notifySignUpError2,
    notifyTransaction,
    notifyUpdateExpense,
    notifyCreateErrorIncome, 
    notifyCreateIncome,
    notifyUpdateIncome,
}