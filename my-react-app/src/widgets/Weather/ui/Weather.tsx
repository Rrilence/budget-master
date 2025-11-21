import { startTransition, useActionState, useState } from "react";
import { regExpression } from "../../../shared/validation";
import { notifyName } from "../../../shared/toasts";

import styles from './styles.module.css'
import hamidity from '../../../assets/hamidity.png'
import wind from '../../../assets/wind.png'
import sunrise from '../../../assets/sunrise.png'
import sunset from '../../../assets/sunset.png'
import pressure from '../../../assets/pressure.png'

import { Input } from 'antd';
import { defaultWeather, submitCity } from "../api/api";
import { useBg } from "../hooks/useBg";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectNowWeather } from "../../../entities/headerMenu-slice";

const { Search } = Input;

const Weather = () => {
    const geoState = useSelector(selectNowWeather);

    const [city, setCity] = useState('');
 const [cityState, dispatch] = useActionState(submitCity, defaultWeather)

    const currentState = cityState.data.name ? cityState : geoState;

    const bg = useBg(currentState.data.mark);


    const onSearch = (value: string) => {
            if (regExpression.test(value.trim())) {
                value = value[0].toUpperCase() + value.slice(1);
                setCity(value);
                const formData = new FormData();
                formData.append('city', value);
                startTransition(() => {dispatch(formData)});
            }
            else {
                setCity('')
                notifyName()
            }
        }  

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    return (
        <div className={`${styles.container} ${styles[`container--${bg}`]}`}>
            <div className={styles.wrapper}>
                <Search placeholder="Введите название города" allowClear
                onSearch={onSearch}
                onChange={handleSearch}
                value={city}
                style={{ width: '100%', margin: '20px auto' }} />
                <div className={styles.weather}>
                    <img style={{width: '150px', marginTop: '-15px'}}
                    src={`https://openweathermap.org/img/wn/${currentState.data.icon}@2x.png`} alt=""/>
                    <p style={{fontSize: '1.6rem', margin: '-25px 0 5px'}}>{currentState.data.temp} °C</p>
                    <p style={{margin: 0}}>{currentState.data.name}</p>
                    <p style={{fontSize: '1rem'}}>{currentState.data.description}</p>
                </div>

                <div className={styles.weather_item}>
                    <img src={hamidity} alt="hamidity" width={'28px'} />
                    <p>Влажность: {currentState.data.hamidity} %</p> 
                </div>
                <div className={styles.weather_item}>
                    <img src={wind} alt="wind" width={'28px'} />
                    <p>Скорость ветра: {currentState.data.windSpeed} м/с</p>
                </div> 
                <div className={styles.weather_item}>
                    <img src={pressure} alt="pressure" width={'28px'} />
                    <p>Атм. давление: {currentState.data.pressure} мм. рт. ст.</p>
                </div>
                <div className={styles.add_info}>
                    <img src={sunrise} alt="sunrise" width={'32px'} />
                    <span>{currentState.data.sunrise}</span>
                    <img src={sunset} alt="sunset" width={'32px'} />
                    <span>{currentState.data.sunset}</span>
                </div>

                <div className={styles.week}>
                    <div className={clsx(styles.day, styles.day1)}>
                        <p style={{fontSize: '14px'}}>{currentState.data.day1.weekDay}</p>
                        <p>{currentState.data.day1.date}</p>
                        <img style={{width: '40px'}}
                        src={`https://openweathermap.org/img/wn/${currentState.data.day1.icon}@2x.png`} alt=""/>
                        <p style={{marginBottom: 3}}>{currentState.data.day1.temp} °C</p>
                    </div>
                    <div className={styles.day}>
                        <p style={{fontSize: '14px'}}>{currentState.data.day2.weekDay}</p>
                        <p>{currentState.data.day2.date}</p>
                        <img style={{width: '40px'}}
                        src={`https://openweathermap.org/img/wn/${currentState.data.day2.icon}@2x.png`} alt=""/>
                        <p style={{marginBottom: 3}}>{currentState.data.day2.temp} °C</p>
                    </div>
                    <div className={clsx(styles.day, styles.day3)}>
                        <p style={{fontSize: '14px'}}>{currentState.data.day3.weekDay}</p>
                        <p>{currentState.data.day3.date}</p>
                        <img style={{width: '40px'}}
                        src={`https://openweathermap.org/img/wn/${currentState.data.day3.icon}@2x.png`} alt=""/>
                        <p style={{marginBottom: 3}}>{currentState.data.day3.temp} °C</p>
                    </div>
                </div>
            {currentState.error && <p style={{color: 'red'}}>{currentState.error}</p>}
            </div>
        </div>
    )
}

export default Weather