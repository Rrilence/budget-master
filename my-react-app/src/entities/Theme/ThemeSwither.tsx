import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import styles from './styles.module.css'
import { selectTheme, setTheme } from '../setting-slice'
import lightTheme from '../../assets/lightTheme.png'
import darkTheme from '../../assets/darkTheme.png'
import { selectSidebar } from '../Sidebar/sidebar-slice';
import type { ThemeState } from '../../shared/types';
import { updateTheme } from './updateTheme';
import { selectUser } from '../auth-slice';

export function ThemeSwitcher () {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme) as ThemeState;
    const sidebar = useSelector(selectSidebar);
    const user = useSelector(selectUser);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        dispatch(setTheme(newTheme))
        updateTheme(user!.id, newTheme);
    }

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
