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
import { fetchExchange, fetchWeather, selectIsDate, selectIsExchange, selectIsMain, selectIsWeather, selectNowExchange, selectNowWeather, setActive } from "../../entities/headerMenu-slice"
import Weather from "../Weather/ui/Weather"
import Exchange from "../Exchange/ui/Exchange"
import { formatDateWeather } from "../../shared/formatting"
import { useLocation } from "../Weather/hooks/useLocation"
import type { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import DateCalendar from "../DateCalendar/DateCalendar"

const { Header, Content, Sider } = Layout;

const LayoutWidget = () => {
    const dispatch = useDispatch(); 
    const theme = useSelector(selectTheme);
    const isDate = useSelector(selectIsDate);
    const isWeather = useSelector(selectIsWeather);
    const isExchange = useSelector(selectIsExchange);
    const isMain = useSelector(selectIsMain);
    const {lat, lng, locationError, available, enable} = useLocation();
    const dispatchExtra:  ThunkDispatch<RootState, undefined, PayloadAction> = useDispatch();
    const WeatherDate = useSelector(selectNowWeather);
    const ExchangeDate = useSelector(selectNowExchange);
    const nowWeather = WeatherDate.data.name + ' ' + WeatherDate.data.temp + '°';
    const ExchangeUSD = ExchangeDate.data.find((item) => item.CharCode === 'USD');
    const ExchangeEUR = ExchangeDate.data.find((item) => item.CharCode === 'EUR');
    const nowExchangeUSD = ExchangeUSD?.CharCode + ' ' + Number(ExchangeUSD?.Value).toFixed(2);
    const nowExchangeEUR = ExchangeEUR?.CharCode + ' ' + Number(ExchangeEUR?.Value).toFixed(2);
    
    const items: MenuProps['items'] = [
        {
            label: <div>
                {formatDateWeather(new Date())}
            </div>,
            key: 'Дата',
            onClick: (e) => dispatch(setActive(e.key))
        },
        {
            label: <div>
                <img className={styles.imgWeather}
                    src={`https://openweathermap.org/img/wn/${WeatherDate.data.icon}@2x.png`} alt=""/>
                    <br />
                {nowWeather}
            </div>,
            key: 'Погода',
            onClick: (e) => dispatch(setActive(e.key))
        },
        {
            label: <div>
                {nowExchangeUSD} <br />
                {nowExchangeEUR}
            </div>,
            key: 'Курс Валют',
            onClick: (e) => dispatch(setActive(e.key))
        }
    ]
    
    const [isShowMenu, setIsShowMenu] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, [])

    useEffect(() => {
        setIsShowMenu(windowWidth >= 720);
    }, [windowWidth])

    useEffect(() => {
        if(lat && lng) {
            // dispatchExtra(fetchWeather({lat, lng}));
        } else if(locationError) {
            console.error('Ошибка определения местоположения', locationError?.message);
        }
        dispatchExtra(fetchExchange());
    }, [lat, lng, locationError, dispatchExtra])


    return (
        <>
        <Layout style={{background: 'none'}}>
            {!available && (
                <div>Ваш браузер не поддерживает геолокацию</div>
            )}
            {!enable && (
                <div>Геолокация отключена</div>
            )}
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
                    {isDate && <DateCalendar/>}
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