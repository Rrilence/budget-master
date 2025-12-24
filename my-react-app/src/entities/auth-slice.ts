import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../shared/types";
import type { AppDispatch, RootState } from "../app/store";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";


const initialState: AuthState = {
    signUp: false,
    signIn: false,
    signOut: true,
    resetPassword: false,
    newPassword: false,
    user: null,
    loading: true,
    error: null,
}

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue}) => { 
        const {data: sessionData, error} = await supabase.auth.getSession()
        if(error) {
            console.error('Ошибка при получении пользователя:', error);
            return rejectWithValue(`Не удалось получить пользователя: ${error.message}`);
        }
        if(sessionData?.session) {
            const {data} = await supabase.auth.getUser()
            return data.user
        }
        console.log('Пользователь не залогинен.');
        return null;
    }
)

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
        },
        setResetPassword: (state, action) => {
            state.resetPassword = action.payload
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null
            })
    },
})

export const {setSignUp, setSignIn, setSignOut, setUser, setResetPassword, setNewPassword, setLoading} = authSlice.actions
export const authReducer = authSlice.reducer

export const selectSignUp = (state: RootState) => state.auth.signUp
export const selectSignIn = (state: RootState) => state.auth.signIn
export const selectSignOut = (state: RootState) => state.auth.signOut
export const selectResetPassword = (state: RootState) => state.auth.resetPassword
export const selectNewPassword = (state: RootState) => state.auth.newPassword
export const selectUser = (state: RootState) => state.auth.user
export const selectLoading = (state: RootState) => state.auth.loading


export const useAppDispatch = () => useDispatch<AppDispatch>(); 
