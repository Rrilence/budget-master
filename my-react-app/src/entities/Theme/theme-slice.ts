import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type ThemeState = 'light' | 'dark';

const initialState: ThemeState = 'light';

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setTheme: (_, action) => {
            return action.payload
        }
    }
})

export const {setTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer

export const selectTheme = (state: RootState) => state.theme


