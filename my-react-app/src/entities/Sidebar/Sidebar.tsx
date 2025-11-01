import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { selectTheme } from "../Theme/theme-slice";
import { ThemeSwitcher } from "../Theme/ThemeSwither";

import styles from './styles.module.css'
import { selectSidebar, setShowBar } from "./sidebar-slice";
import SignOut from "../SignOut/SignOut";


const Sidebar = () => {
    const theme = useSelector(selectTheme);

    const dispatch = useDispatch();
    const sidebar = useSelector(selectSidebar)

    const showSidebar = () => {
        dispatch(setShowBar(!sidebar))
    }

    return (
        <aside className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`)}>
            <div className={styles.wrapper}>
                <div className={styles.icons}
                onClick={showSidebar}>
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <i className="fa fa-money" aria-hidden="true"></i>
                    <i className="fa fa-arrows-h" aria-hidden="true"></i>
                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>  
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <i className="fa fa-cogs" aria-hidden="true"></i>
                </div>
                {sidebar && 
                    <div className={styles.navlink}>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/dashboard'>Обзор</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/budget'>Бюджет</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/transactions'>Транзакции</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/analytics'>Аналитика</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/goals'>Цели</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/predict'>Прогнозы</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='/settings'>Настройки</NavLink>
                    </div>
                }
            </div>
            <ThemeSwitcher/>
            <SignOut/>
        </aside>
    )
}

export default Sidebar