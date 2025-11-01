export type CreateActionState = {
    email?: string,
    password?: string,
    passwordRepeat?: string,
    login?: string,
    error?: string,
}

export interface AuthState {
    signUp: boolean,
    signIn: boolean,
    signOut: boolean,
}