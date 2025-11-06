import type { User } from "@supabase/supabase-js";

export type CreateActionState = {
    email?: string,
    password?: string,
    passwordRepeat?: string,
    login?: string,
    error?: string,
    success?: boolean,
}

export interface AuthState {
    signUp: boolean,
    signIn: boolean,
    signOut: boolean,
    resetPassword: boolean,
    newPassword: boolean,
    isVisible: boolean,
    user: User | null,
    loading: boolean,
    error: string | null,
}

export interface PrivateRouteProps {
  redirectTo: string;
}