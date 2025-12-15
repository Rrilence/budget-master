import { useEffect, useMemo, useState } from "react";
import type { InfoDash } from "../../shared/types";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { Column } from "@ant-design/plots";
import { selectTheme } from "../Theme/theme-slice";


const AnaliticChart = () => {

  const initialDash = useMemo(() => [
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
  ], []);

  const [data, setData] = useState<InfoDash[]>(initialDash);
  const expenses = useSelector(selectExpenses);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const addExpenses = () => {
      const newDash = initialDash.map(item => ({...item}));
      expenses.forEach(expense => {
        newDash.forEach(item => {
          if(expense.category === item.type) {
            item.value += expense.amount
          }
        })
      })
      setData(newDash)
    }
    addExpenses()
      
  }, [expenses, initialDash]);

  const config = {
  theme: theme === 'light' ? 'light' : 'dark',
  data,
  xField: 'type',
  yField: 'value',
  colorField: 'type',
  shapeField: 'column25D',
  legend: false,
  tooltip: false,
  axis: {
      x: {
        labelSpacing: 12
      },
    },
  style: {
    fill: ({ type }: InfoDash) => {
      if (type === 'Дом') {
        return '#cc1616ff';
      } if (type === 'Продукты') {
        return '#2656e9ff';
      } if (type === 'Здоровье') {
        return '#14bc14ff';
      } if (type === 'Одежда') {
        return '#7a068fff';
      } if (type === 'Транспорт') {
        return '#e07314ff';
      } if (type === 'Спорт') {
        return '#25eeb2ff';
      } if (type === 'Досуг') {
        return '#e7f73aff';
      } if (type === 'Путешествия') {
        return 'rgba(63, 175, 236, 1)';
      } if (type === 'Машина') {
        return '#9025eeff';
      } if (type === 'Кафе') {
        return '#6a390fff';
      } if (type === 'Связь') {
        return '#96e319ff';
      } if (type === 'Домашние животные') {
        return '#281c13ff';
      } if (type === 'Подарки') {
        return '#c828aaff';
      } if (type === 'Другое') {
        return '#5aececff';
      }
    },
  },
  };
  return <Column {...config} />;

}

export default AnaliticChart