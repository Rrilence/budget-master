import { createSlice } from "@reduxjs/toolkit";
import type { AnaliticState } from "../../shared/types";
import type { RootState } from "../../app/store";



export const initialState: AnaliticState = {
  finAudit: [
    {type: '01', Прибыль: 0, Убыток: 0},
    {type: '02', Прибыль: 0, Убыток: 0},
    {type: '03', Прибыль: 0, Убыток: 0},
    {type: '04', Прибыль: 0, Убыток: 0},
    {type: '05', Прибыль: 0, Убыток: 0},
    {type: '06', Прибыль: 0, Убыток: 0},
    {type: '07', Прибыль: 0, Убыток: 0},
    {type: '08', Прибыль: 0, Убыток: 0},
    {type: '09', Прибыль: 0, Убыток: 0},
    {type: '10', Прибыль: 0, Убыток: 0},
    {type: '11', Прибыль: 0, Убыток: 0},
    {type: '12', Прибыль: 0, Убыток: 0},
  ],
  dash: [
    { type: 'Дом', value: 0},
    { type: 'Продукты', value: 0},
    { type: 'Здоровье', value: 0},
    { type: 'Одежда', value: 0},
    { type: 'Транспорт', value: 0},
    { type: 'Спорт', value: 0},
    { type: 'Досуг', value: 0},
    { type: 'Путешествия', value: 0},
    { type: 'Машина', value: 0},
    { type: 'Кафе', value: 0},
    { type: 'Связь', value: 0},
    { type: 'Домашние животные', value: 0},
    { type: 'Подарки', value: 0},
    { type: 'Другое', value: 0},
    ]
}

const analiticSlise = createSlice({
    name: 'analitic',
    initialState,
    reducers: {
        setFinAudit: (state, action) => {
            state.finAudit = action.payload
        },
        setDash: (state, action) => {
            state.dash = action.payload
        },
    }
})

export const {setFinAudit, setDash} = analiticSlise.actions
export const analiticReducer = analiticSlise.reducer

export const selectfinAudit = (state: RootState) => state.analitic.finAudit;
export const selectdash = (state: RootState) => state.analitic.dash;
