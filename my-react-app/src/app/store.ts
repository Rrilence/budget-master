import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../entities/auth-slice";
import { sidebarReducer } from "../entities/Sidebar/sidebar-slice";
import { headerMenuReducer } from "../entities/headerMenu-slice";
import { expensesReducer } from "../entities/Expenses/expenses-slice";
import { incomesReducer } from "../entities/Incomes/incomes-slice";
import { budgetsReducer } from "../entities/Budget/budget-slice";
import { windowReducer } from "../entities/windoWidth-slice";
import { analiticReducer } from "../entities/Analitic/analitic-slice";
import { goalsReducer } from "../entities/Goals/goals-slice";
import { settingReducer } from "../entities/setting-slice";


export const store = configureStore({
    reducer: {
        setting: settingReducer,
        auth: authReducer,
        window: windowReducer,
        sidebar: sidebarReducer,
        headerMenu: headerMenuReducer,
        expenses: expensesReducer,
        incomes: incomesReducer,
        budgets: budgetsReducer,
        analitic: analiticReducer,
        goals: goalsReducer,
    },
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
