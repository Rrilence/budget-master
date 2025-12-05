import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { BudgetState } from "../../shared/types";


export const initialState: BudgetState = {
    isModalOpen: false,
    isUpdateBudget: false,
    period: 'Свой период',
    date: '',
    totalAmount: 0,
    budgets: [],
    initialValues: {
        id: '',
        user_id: '',
        category: '',
        amount: '',
        period: '',
        dateStart: '',
        dateArr: [],
        description: '',
    }
}

const budgetsSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        setIsOpenModal: (state, action) => {
            state.isModalOpen = action.payload
        },
        setIsUpdateBudget: (state, action) => {
            state.isUpdateBudget = action.payload
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setPeriod: (state, action) => {
            state.period = action.payload
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload
        },
        setInitialPeriod: (state, action) => {
            state.initialValues.period = action.payload
        },
        setBudgets: (state, action) => {
            state.budgets = action.payload
        },
        setinitialValues: (state, action) => {
            state.initialValues = { ...state.initialValues, ...action.payload };
        },
    }
})

export const {setIsOpenModal, setIsUpdateBudget, setDate, setPeriod, setTotalAmount, setInitialPeriod, setBudgets, setinitialValues} = budgetsSlice.actions;
export const budgetsReducer = budgetsSlice.reducer;

export const selectIsOpenModal = (state: RootState) => state.budgets.isModalOpen;
export const selectIsUpdateBudget = (state: RootState) => state.budgets.isUpdateBudget;
export const selectBudgets = (state: RootState) => state.budgets.budgets;
export const selectPeriod = (state: RootState) => state.budgets.period;
export const selectDate = (state: RootState) => state.budgets.date;
export const selectTotalAmount = (state: RootState) => state.budgets.totalAmount;
export const selectInitialPeriod = (state: RootState) => state.budgets.initialValues.period;
export const selectInitialValues = (state: RootState) => state.budgets.initialValues;