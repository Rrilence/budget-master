import { Outlet } from "react-router-dom"
import clsx from "clsx"
import styles from './styles.module.css'


import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from "react-redux"
import { selectTheme } from "../../entities/Theme/theme-slice"
import { useEffect, useState } from "react"
import Sidebar from "../../entities/Sidebar/Sidebar"
import { Layout, Menu, type MenuProps } from 'antd';
import { MenuOutlined } from "@ant-design/icons"
import Date from "../Date/Date"
import { selectIsDate, selectIsExchange, selectIsMain, selectIsWeather, setActive } from "../../entities/headerMenu-slice"
import Weather from "../Weather/ui/Weather"
import Exchange from "../Exchange/ui/Exchange"

const { Header, Content, Sider } = Layout;

const LayoutWidget = () => {
    const dispatch = useDispatch(); 
    const theme = useSelector(selectTheme);
    const isDate = useSelector(selectIsDate);
    const isWeather = useSelector(selectIsWeather);
    const isExchange = useSelector(selectIsExchange);
    const isMain = useSelector(selectIsMain);
    
    const items: MenuProps['items'] = ['Дата', 'Погода', 'Курс Валют'].map((key) => ({
        key,
        label: `${key}`,
        onClick: (e) => dispatch(setActive(e.key))
    }));
    

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
        <Layout style={{background: 'none'}}>
            <Header
            className={clsx(`${theme === 'light' ? 'theme-light' : 'theme-dark'}`, styles.header)}>
                <div className={styles.menu}>
                    <MenuOutlined 
                    style={{fontSize: '20px', padding: '5.5px'}}
                    onClick={() => setIsShowMenu(!isShowMenu)}/>
                </div>
                    <Menu 
                    mode="horizontal"
                    className={styles.header_menu}
                    items={items}/>
                <img src={logo} className={styles.img} alt="logo"/>
                <div className={styles.logo}>
                    <div className={styles.title}>
                        <span className={styles.budget}>BUDGET </span>
                        <span> MASTER</span>
                    </div>
                    <p className={styles.p}>Умный учет бюджета</p>
                </div>
            </Header>
            <Layout style={{margin: '0 20px'}}>
                <Sider style={{background: 'none', width: 'fit-content'}}>
                        { isShowMenu && <Sidebar/>}
                </Sider>
                <Content>
                    {isDate && <Date/>}
                    {isWeather && <Weather/>}
                    {isExchange && <Exchange/>}
                    {isMain && <Outlet/>}
                </Content>
            </Layout>
        </Layout>
        </>
    )
}

export default LayoutWidget