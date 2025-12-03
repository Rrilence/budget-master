import { createSlice } from "@reduxjs/toolkit";
import type { ExpensesState } from "../../shared/types";
import type { RootState } from "../../app/store";
import { formatDate } from "../../shared/formatting";

const initialDate = formatDate(new Date());


export const initialState: ExpensesState = {
  isModalOpen: false,
  isUpdateExpense: false,
  transactions: 'Расходы',
  expenses: [],
  initialValues: {
    id: '',
    user_id: '',
    name: '',
    category: '',
    amount: '',
    date: initialDate,
  }
}


const expensesSlise = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setIsOpenModal: (state, action) => {
            state.isModalOpen = action.payload
        },
        setIsUpdateExpense: (state, action) => {
            state.isUpdateExpense = action.payload
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload
        },
        setinitialValues: (state, action) => {
            state.initialValues = { ...state.initialValues, ...action.payload };
        },
    }
})

export const {setIsOpenModal, setIsUpdateExpense, setTransactions, setExpenses, setinitialValues} = expensesSlise.actions
export const expensesReducer = expensesSlise.reducer

export const selectIsOpenModal = (state: RootState) => state.expenses.isModalOpen;
export const selectIsUpdateExpense = (state: RootState) => state.expenses.isUpdateExpense;
export const selectTransactions = (state: RootState) => state.expenses.transactions;
export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectInitialValues = (state: RootState) => state.expenses.initialValues;