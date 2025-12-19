import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../shared/formatting";
import type { RootState } from "../../app/store";
import type { GoalState } from "../../shared/types";

const initialDate = formatDate(new Date());

export const initialState: GoalState = {
    isModalOpen: false,
    isUpdateGoal: false,
    updateGoalId: '',
    goals: [],
    initialValues: {
        id: '',
        user_id: '',
        name: '',
        totalAmount: 0,
        amount: 0,
        date: initialDate,
    }
}

const goalsSlise = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setIsOpenModal: (state, action) => {
            state.isModalOpen = action.payload
        },
        setIsUpdateGoal: (state, action) => {
            state.isUpdateGoal = action.payload
        },
        setUpdateGoalId: (state, action) => {
            state.updateGoalId = action.payload
        },
        setGoals: (state, action) => {
            state.goals = action.payload
        },
        setinitialValues: (state, action) => {
            state.initialValues = { ...state.initialValues, ...action.payload };
        },
    }
})

export const {setIsOpenModal, setGoals, setIsUpdateGoal, setinitialValues, setUpdateGoalId} = goalsSlise.actions
export const goalsReducer = goalsSlise.reducer


export const selectIsOpenModal = (state: RootState) => state.goals.isModalOpen;
export const selectIsUpdateGoal = (state: RootState) => state.goals.isUpdateGoal;
export const selectUpdateGoalId = (state: RootState) => state.goals.updateGoalId;
export const selectGoals = (state: RootState) => state.goals.goals;
export const selectInitialValues = (state: RootState) => state.goals.initialValues;