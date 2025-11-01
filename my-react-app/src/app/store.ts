import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../entities/Theme/theme-slice";
import { authReducer } from "../entities/auth-slice";
import { sidebarReducer } from "../entities/Sidebar/sidebar-slice";


export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        sidebar: sidebarReducer,
    },
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
