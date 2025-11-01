import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type ShowBar = boolean;

const initialState: ShowBar = false;

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        setShowBar: (_, action) => {
            return action.payload
        }
    }
})

export const {setShowBar} = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer

export const selectSidebar = (state: RootState) => state.sidebar
