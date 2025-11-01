import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../shared/types";
import type { RootState } from "../app/store";


const initialState: AuthState = {
    signUp: false,
    signIn: false,
    signOut: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignUp: (state, action) => {
            state.signUp = action.payload
            state.signIn = false
            state.signOut = true
        },
        setSignIn: (state, action) => {
            state.signIn = action.payload
            state.signUp = false
            state.signOut = true
        },
        setSignOut: (state, action) => {
            state.signOut = action.payload
            state.signUp = false
            state.signIn = false
        }
    }
})

export const {setSignUp, setSignIn, setSignOut} = authSlice.actions
export const authReducer = authSlice.reducer

export const selectSignUp = (state: RootState) => state.auth.signUp
export const selectSignIn = (state: RootState) => state.auth.signIn
export const selectSsignOut = (state: RootState) => state.auth.signOut