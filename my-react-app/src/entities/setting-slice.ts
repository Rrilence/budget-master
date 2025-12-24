import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../app/store";
import type { Settings } from "../shared/types";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";

interface SettingsState {
  data: Settings;
  isLoading: boolean;
  error: string | null;
}

export const initialState: Settings = {
    currency: 'RUB',
    theme: 'light',
    category: [
        'Дом',
        'Продукты',
        'Здоровье',
        'Одежда',
        'Транспорт',
        'Спорт',
        'Досуг',
        'Путешествия',
        'Машина',
        'Кафе',
        'Связь',
        'Домашние животные',
        'Подарки',
        'Другое'
    ],
    notifications: true,
    exchangeRate: true,
    weather: true,
}

const initialSettingsState: SettingsState = {
  data: initialState,
  isLoading: false,
  error: null,
};

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (_, { getState }) => {
    const state = getState() as RootState;
    const user = state.auth.user;
    
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!data && !error) {
      const newSettings = {
        user_id: user.id,
        currency: initialState.currency,
        theme: initialState.theme,
        category: initialState.category,
        notifications: initialState.notifications,
        exchangeRate: initialState.exchangeRate, 
        weather: initialState.weather
      };  
      const { data, error} = await supabase
        .from('settings')
        .insert(newSettings)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    if(data) return data;
})

const settingSlice = createSlice({
    name: 'setting',
    initialState: initialSettingsState,
    reducers: {
        setCurrency: (state, action) => {
            state.data.currency = action.payload
        },
        setTheme: (state, action) => {
            state.data.theme = action.payload
        },
        setCategory: (state, action) => {
            state.data.category = action.payload
        },
        setNotifications: (state, action) => {
           state.data.notifications = action.payload
        },
        setExchangeRate: (state, action) => {
           state.data.exchangeRate = action.payload
        },
        setWeather: (state, action) => {
           state.data.weather = action.payload
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload) {
            state.data = initialState;
            return;
        }
        const { currency, theme, category, notifications, exchangeRate, weather } = action.payload;
        state.data = {
        currency,
        theme,
        category,
        notifications,
        exchangeRate,
        weather,
        };
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load settings';
        state.data = initialState;
      })
  },
}) 

export const {
    setTheme, 
    setCurrency, 
    setExchangeRate, 
    setCategory,
    setNotifications, 
    setWeather,
} = settingSlice.actions
export const settingReducer = settingSlice.reducer

export const selectTheme = (state: RootState) => state.setting.data.theme;
export const selectCategory = (state: RootState) => state.setting.data.category;
export const selectData = (state: RootState) => state.setting.data;

export const useAppDispatch = () => useDispatch<AppDispatch>(); 


