import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { selectTheme } from "../setting-slice";
import { ThemeSwitcher } from "../Theme/ThemeSwither";

import styles from './styles.module.css'
import { selectSidebar, setShowBar } from "./sidebar-slice";
import SignOut from "../SignOut/SignOut";
import { AimOutlined, BarChartOutlined, CreditCardFilled, HomeFilled, QuestionCircleOutlined, SettingFilled, TransactionOutlined } from "@ant-design/icons";
import { setActive } from "../headerMenu-slice";


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
                <div className={styles.navlink}
                onClick={showSidebar}>
                    <HomeFilled className={styles.icon}/>
                    <CreditCardFilled className={styles.icon}/>
                    <TransactionOutlined className={styles.icon}/>
                    <BarChartOutlined className={styles.icon}/>
                    <AimOutlined className={styles.icon}/>  
                    <QuestionCircleOutlined className={styles.icon}/>
                    <SettingFilled className={styles.icon}/>
                </div>
                {sidebar && 
                    <div className={styles.navlink}
                    onClick={() => dispatch(setActive('Главная'))}>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='dashboard'>Обзор</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='budget'>Бюджет</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='transactions'>Транзакции</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='analytics'>Аналитика</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='goals'>Цели</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='predict'>Прогнозы</NavLink>
                        <NavLink className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.link)} to='settings'>Настройки</NavLink>
                    </div>
                }
            </div>
            <ThemeSwitcher/>
            <SignOut/>
        </aside>
    )
}

export default Sidebar