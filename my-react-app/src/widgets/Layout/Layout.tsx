import { Outlet } from "react-router-dom"
import clsx from "clsx"
import styles from './styles.module.css'


import logo from '../../assets/logo.png'
import { useSelector } from "react-redux"
import { selectTheme } from "../../entities/Theme/theme-slice"
import { useEffect, useState } from "react"
import Sidebar from "../../entities/Sidebar/Sidebar"


const Layout = () => {
    const theme = useSelector(selectTheme);

    const [isShowMenu, setIsShowMenu] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        setIsShowMenu(windowWidth >= 720);
    }, [windowWidth])


    return (
        <>
            <header className={`${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
                <div className={styles.menu} onClick={() => setIsShowMenu(!isShowMenu)}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className={styles.wrapper}>
                    <a className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.a)}>Дата</a>
                    <a className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.a)}>Погода</a>
                    <a className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.a)}>Курс Валют</a>
                </div>
                <img src={logo} className={styles.img} alt="logo"/>
                <div className={styles.logo}>
                    <div className={styles.title}>
                        <span className={styles.budget}>BUDGET </span>
                        <span> MASTER</span>
                    </div>
                    <p className={styles.p}>Умный учет бюджета</p>
                </div>
            </header>
            <main>
                { isShowMenu && <Sidebar/>}
                <Outlet/>
            </main>
        </>
    )
}

export default Layout