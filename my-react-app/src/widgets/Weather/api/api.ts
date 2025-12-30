import axios from "axios";
import type { InfoWeather } from "../../../shared/types";
import { notifyGeolocation, notifyWeatherCity } from "../../../shared/toasts";
import { formatDayWeather, formatTimeWeather, formatWeekDayWeather } from "../../../shared/formatting";

const apiKey = import.meta.env.VITE_API_KEY_WEATHER;

export const defaultWeather: InfoWeather = {
    data: {
        name: '',
        mark: '',
        description: '',
        icon: '02d',
        temp: 0,
        hamidity: 0,
        windSpeed: 0,
        pressure: 0,
        sunrise: '0:00',
        sunset: '0:00',
        day1: {
            weekDay: '',
            date: '',
            icon: '02d',
            temp: 0,
        },
        day2: {
            weekDay: '',
            date: '',
            icon: '02d',
            temp: 0,
        },
        day3: {
            weekDay: '',
            date: '',
            icon: '02d',
            temp: 0,
        }
    },
    error: null,
    isLoading: false,
}

export async function submitGeolocation(lat: number, lng: number): Promise<InfoWeather> {
        try {
            const res =  await axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&cnt=25&units=metric&appid=${apiKey}&lang=ru`)
            
                const weatherData = {
                    name: res.data.city.name,
                    mark: res.data.list[0].weather[0].main,
                    description: res.data.list[0].weather[0].description,
                    icon: res.data.list[0].weather[0].icon,
                    temp: Math.round(res.data.list[0].main.temp),
                    hamidity: res.data.list[0].main.humidity,
                    windSpeed: res.data.list[0].wind.speed,
                    pressure: Math.round(res.data.list[0].main.pressure * 0.75),
                    sunrise: formatTimeWeather(res.data.city.sunrise),
                    sunset: formatTimeWeather(res.data.city.sunset),
                    day1: {
                        weekDay: formatWeekDayWeather(res.data.list[8].dt),
                        date: formatDayWeather(res.data.list[8].dt),
                        icon: res.data.list[8].weather[0].icon,
                        temp: Math.round(res.data.list[8].main.temp),
                    },
                    day2: {
                        weekDay: formatWeekDayWeather(res.data.list[16].dt),
                        date: formatDayWeather(res.data.list[16].dt),
                        icon: res.data.list[16].weather[0].icon,
                        temp: Math.round(res.data.list[16].main.temp),
                    },
                    day3: {
                        weekDay: formatWeekDayWeather(res.data.list[24].dt),
                        date: formatDayWeather(res.data.list[24].dt),
                        icon: res.data.list[24].weather[0].icon,
                        temp: Math.round(res.data.list[24].main.temp),
                    }
                }
                
                return {data: weatherData, error: null}
        } catch (error) {
        console.error("Ошибка при получении данных геолокации", error);
        notifyGeolocation()
        }
    return { ...defaultWeather,
        error: 'Геолокация не определена'
    }
}

export async function submitCity (prevState: InfoWeather, formData: FormData): Promise<InfoWeather> {
    const nameCity = formData.get('city')
    if (!nameCity) {
        return { ...defaultWeather, error: 'Название города не может быть пустым' };
        }
    try {  
        const res = await axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&cnt=25&units=metric&appid=${apiKey}&lang=ru`)
            const weatherData = {
                    name: res.data.city.name,
                    mark: res.data.list[0].weather[0].main,
                    description: res.data.list[0].weather[0].description,
                    icon: res.data.list[0].weather[0].icon,
                    temp: Math.round(res.data.list[0].main.temp),
                    hamidity: res.data.list[0].main.humidity,
                    windSpeed: res.data.list[0].wind.speed,
                    pressure: Math.round(res.data.list[0].main.pressure * 0.75),
                    sunrise: formatTimeWeather(res.data.city.sunrise),
                    sunset: formatTimeWeather(res.data.city.sunset),
                    day1: {
                        weekDay: formatWeekDayWeather(res.data.list[8].dt),
                        date: formatDayWeather(res.data.list[8].dt),
                        icon: res.data.list[8].weather[0].icon,
                        temp: Math.round(res.data.list[8].main.temp),
                    },
                    day2: {
                        weekDay: formatWeekDayWeather(res.data.list[16].dt),
                        date: formatDayWeather(res.data.list[16].dt),
                        icon: res.data.list[16].weather[0].icon,
                        temp: Math.round(res.data.list[16].main.temp),
                    },
                    day3: {
                        weekDay: formatWeekDayWeather(res.data.list[24].dt),
                        date: formatDayWeather(res.data.list[24].dt),
                        icon: res.data.list[24].weather[0].icon,
                        temp: Math.round(res.data.list[24].main.temp),
                    }
                }

        return {data: weatherData, error: null}
            
    } catch (e) {
        if (e instanceof Error) {
            console.error("Ошибка при получении данных");
                notifyWeatherCity();
        } else {
            console.error('Неизвестная ошибка');
        }
    }
    return {
        data: prevState.data, 
        error: 'Город не найден'
    }
}