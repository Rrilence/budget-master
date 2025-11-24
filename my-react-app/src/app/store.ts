import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../entities/Theme/theme-slice";
import { authReducer } from "../entities/auth-slice";
import { sidebarReducer } from "../entities/Sidebar/sidebar-slice";
import { headerMenuReducer } from "../entities/headerMenu-slice";
import { expensesReducer } from "../entities/Expenses/expenses-slice";
import { incomesReducer } from "../entities/Incomes/incomes-slice";


export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        sidebar: sidebarReducer,
        headerMenu: headerMenuReducer,
        expenses: expensesReducer,
        incomes: incomesReducer,
    },
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
