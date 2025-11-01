import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import styles from './styles.module.css'

import { selectTheme, setTheme } from './theme-slice'
import lightTheme from '../../assets/lightTheme.png'
import darkTheme from '../../assets/darkTheme.png'
import { selectSidebar } from '../Sidebar/sidebar-slice';

export function ThemeSwitcher () {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const sidebar = useSelector(selectSidebar);

    const toggleTheme = () => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]) 

    return (
        <div
        onClick={toggleTheme}>
            {theme === 'light' ? (
                <div>
                    <img className={styles.theme} src={darkTheme} alt="moon"/>
                    {sidebar &&
                        <span className={styles.span}>Темная тема</span>
                    }
                </div>
            ) : (
                <div>
                    <img className={styles.theme} src={lightTheme} alt="sun"/>
                    {sidebar && 
                        <span className={styles.span}>Светлая тема</span>
                    }
                </div>
            )}
        </div>
    )
}
