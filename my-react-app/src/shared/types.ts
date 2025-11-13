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
    user: User | null,
    loading: boolean,
    error: string | null,
}

export interface PrivateRouteProps {
  redirectTo: string;
}

export interface MenuState {
  isDate: boolean,
  isWeather: boolean,
  isExchange: boolean,
  isMain: boolean,
}

export interface InfoWeather {
  data: {
    name: string,
    mark: string,
    description: string,
    icon: string,
    temp: number,
    hamidity: number,
    windSpeed: number,
    pressure: number,
    sunrise: string,
    sunset: string,
    day1: {
      weekDay: string,
      date: string,
      icon: string,
      temp: number,
      },
    day2: {
      weekDay: string,
      date: string,
      icon: string,
      temp: number,
      },
    day3: {
      weekDay: string,
      date: string,
      icon: string,
      temp: number,
      },
  },
  error: string | null,
}

export interface ValuteItem {
  ID: string;
  NumCode?: string;
  CharCode: string;
  Nominal?: number;
  Name: string;
  Value: number;
  Previous?: number;
}

export interface Valute {
  data: ValuteItem[],
  dateExchange: string,
  error: null | string,
}

export interface InfoCourse {
    key: string;
    code: string;
    name: string;
    value: number;
}