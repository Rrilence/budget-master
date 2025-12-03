import { createSlice } from "@reduxjs/toolkit";
import type { IncomesState } from "../../shared/types";
import type { RootState } from "../../app/store";
import { formatDate } from "../../shared/formatting";

const initialDate = formatDate(new Date());


export const initialState: IncomesState = {
  isUpdateIncome: false,
  incomes: [],
  initialValues: {
    id: '',
    user_id: '',
    name: '',
    amount: '',
    date: initialDate,
  }
}

const incomesSlise = createSlice({
    name: 'incomes',
    initialState,
    reducers: {
        setIsUpdateIncome: (state, action) => {
            state.isUpdateIncome = action.payload
        },
        setIncomes: (state, action) => {
            state.incomes = action.payload
        },
        setinitialValues: (state, action) => {
            state.initialValues = { ...state.initialValues, ...action.payload };
        },
    }
})

export const { setIsUpdateIncome, setIncomes, setinitialValues} = incomesSlise.actions
export const incomesReducer = incomesSlise.reducer

export const selectIsUpdateIncome = (state: RootState) => state.incomes.isUpdateIncome;
export const selectIncomes = (state: RootState) => state.incomes.incomes;
export const selectInitialValues = (state: RootState) => state.incomes.initialValues;