import type { User } from "@supabase/supabase-js";
import dayjs from 'dayjs';

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

export interface InfoBudget {
  id?: string | undefined,
  user_id?: string | null | undefined,
  category: string,
  amount: number,
  period: string,
  dateStart: string,
  dateEnd: string,
  dateArr?: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
  description?: string,
  error?: string | null,
}

export interface InfoGoal {
  id?: string | undefined,
  user_id?: string | null | undefined,
  name: string,
  totalAmount: number,
  amount: number,
  date: string,
  icon?: string,
  error?: string | null,
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

export interface BudgetState {
  isModalOpen: boolean,
  isUpdateBudget: boolean,
  date: string,
  period: string,
  totalAmount: number,
  budgets: InfoBudget[],
  initialValues: {
    id: string,
    user_id: string,
    category: string,
    amount: string,
    period: string,
    dateStart?: string,
    dateArr: string[],
    description?: string,
  }
}

export interface GoalState {
  isModalOpen: boolean,
  isUpdateGoal: boolean,
  updateGoalId: string,
  goals: InfoGoal[],
  initialValues: {
    id: string,
    user_id: string,
    name: string,
    totalAmount: number,
    amount: number,
    date: string,
  }
}

export interface InfoExpInc {
  type: string,
  Стоимость: number,
  name: string,
}

export interface InfoProfit {
  type: string,
  Прибыль: number,
  Убыток: number,
}

export interface InfoDash {
  type: string,
  label?: string,
  value: number,
}

export interface AnaliticState {
  finAudit: InfoProfit[],
  dash: InfoDash[],
}

export type ThemeState = 'light' | 'dark';

export interface Settings {
  currency: 'RUB' | 'USD' | 'EUR',
  theme: ThemeState,
  category: string[],
  notifications: boolean,
  exchangeRate: boolean,
  weather: boolean,
}
