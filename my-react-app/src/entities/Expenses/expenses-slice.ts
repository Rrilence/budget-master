import { createSlice } from "@reduxjs/toolkit";
import type { ExpensesState } from "../../shared/types";
import type { RootState } from "../../app/store";

const initialState: ExpensesState = {
  isModalOpen: false,
  expenses: [],
  
}


const expensesSlise = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setIsOpenModal: (state, action) => {
            state.isModalOpen = action.payload
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload
        }
    }
})

export const {setIsOpenModal, setExpenses} = expensesSlise.actions
export const expensesReducer = expensesSlise.reducer

export const selectIsOpenModal = (state: RootState) => state.expenses.isModalOpen
export const selectExpenses = (state: RootState) => state.expenses.expenses