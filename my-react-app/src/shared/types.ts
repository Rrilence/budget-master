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
  nowWeather: InfoWeather,
  nowExchange: Valute,
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
  isLoading?: boolean,
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
  isLoading?: boolean,
}

export interface InfoCourse {
  key: string;
  code: string;
  name: string;
  value: number;
}

export interface InfoIncome {
  id?: string | undefined,
  user_id?: string | null | undefined,
  name: string,
  amount: number,
  date: string,
  error?: string | null,
}
export interface InfoExpense extends InfoIncome {
  category: string,
}

type TransactionState = 'Расходы' | 'Доходы';

export interface ExpensesState {
  isModalOpen: boolean,
  isUpdateExpense: boolean,
  transactions: TransactionState,
  expenses: InfoExpense[],
  initialValues: {
    id?: string | undefined,
    user_id?: string | undefined,
    name: string,
    category: string,
    amount: string,
    date: string,
  }
}

export interface IncomesState {
  isUpdateIncome: boolean,
  incomes: InfoIncome[],
  initialValues: {
    id?: string | undefined,
    user_id?: string | undefined,
    name: string,
    amount: string,
    date: string,
  }
}
