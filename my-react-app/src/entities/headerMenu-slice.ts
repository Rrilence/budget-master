import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuState } from "../shared/types";
import type { RootState } from "../app/store";


const initialState: MenuState = {
    isDate: false,
    isWeather: false,
    isExchange: false,
    isMain: false,
}

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
    }
})

export const {setActive} = headerMenuSlice.actions
export const headerMenuReducer = headerMenuSlice.reducer

export const selectIsDate = (state: RootState) => state.headerMenu.isDate
export const selectIsWeather = (state: RootState) => state.headerMenu.isWeather
export const selectIsExchange = (state: RootState) => state.headerMenu.isExchange
export const selectIsMain = (state: RootState) => state.headerMenu.isMain