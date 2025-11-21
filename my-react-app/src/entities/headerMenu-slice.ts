import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuState, ValuteItem } from "../shared/types";
import type { RootState } from "../app/store";
import { formatDateExchange, formatDayWeather, formatTimeWeather, formatWeekDayWeather } from "../shared/formatting";
import { defaultWeather } from "../widgets/Weather/api/api";
import axios from "axios";
import { notifyGeolocation } from "../shared/toasts";
import { defaultExchange } from "../widgets/Exchange/api";

const apiKey = import.meta.env.VITE_API_KEY_WEATHER;
const initialState: MenuState = {
    isDate: false,
    isWeather: false,
    isExchange: false,
    isMain: false,
    nowWeather: defaultWeather,
    nowExchange: defaultExchange,
}

export const fetchWeather = createAsyncThunk(
    'headerMenu/fetchWeather',
    async ({lat, lng}: {lat: number, lng: number}) => {
        try {
            const res = await axios
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
            return weatherData;

        } catch (error) {
            console.error("Ошибка при получении данных геолокации", error);
            notifyGeolocation();
            throw error;
        }
    }
)

export const fetchExchange = createAsyncThunk(
    'headerMenu/fetchExchange',
    async () => {
        try {
            const res = await axios 
            .get('https://www.cbr-xml-daily.ru/daily_json.js')
            const courseData: ValuteItem[] = Object.values(res.data.Valute);
            const date = formatDateExchange(res.data.Date);
            console.log('slice', courseData);
            
            return {data: courseData, dateExchange: date, error: null}
        } catch (error) {
            console.error("Ошибка при получении данных Курса Валют", error);
            throw error;
        }
    }
)

const headerMenuSlice = createSlice({
    name: 'headerMenu',
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<string>) => {
            state.isDate = false;
            state.isWeather = false;
            state.isExchange = false;
            state.isMain = false;

            switch (action.payload) {
                case 'Дата':
                    state.isDate = true;
                    break;
                case 'Погода':
                    state.isWeather = true;
                    break;
                case 'Курс Валют':
                    state.isExchange = true;
                    break;
                case 'Главная':
                    state.isMain = true;
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeather.pending, (state) => {
            state.nowWeather.isLoading = true;
            state.nowWeather.error = null;
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.nowWeather.data = action.payload;
            state.nowWeather.isLoading = false;
            state.nowWeather.error = null;
        })
        .addCase(fetchWeather.rejected, (state, action) => {
            state.nowWeather.isLoading = false;
            state.nowWeather.error = action.error.message || 'Произошла ошибка';
            console.error("Ошибка при получении данных о погоде:", action.error.message);
        })
        .addCase(fetchExchange.pending, (state) => {
            state.nowExchange.isLoading = true;
            state.nowExchange.error = null;
        })
        .addCase(fetchExchange.fulfilled, (state, action) => {
            state.nowExchange = action.payload;
            state.nowExchange.isLoading = false;
            state.nowExchange.error = null;
        })
        .addCase(fetchExchange.rejected, (state, action) => {
            state.nowExchange.isLoading = false;
            state.nowExchange.error = action.error.message || 'Произошла ошибка';
            console.error("Ошибка при получении данных курса валют:", action.error.message);
        });
    }
})

export const {setActive} = headerMenuSlice.actions
export const headerMenuReducer = headerMenuSlice.reducer

export const selectIsDate = (state: RootState) => state.headerMenu.isDate
export const selectIsWeather = (state: RootState) => state.headerMenu.isWeather
export const selectIsExchange = (state: RootState) => state.headerMenu.isExchange
export const selectIsMain = (state: RootState) => state.headerMenu.isMain
export const selectNowWeather = (state: RootState) => state.headerMenu.nowWeather
export const selectNowExchange = (state: RootState) => state.headerMenu.nowExchange
