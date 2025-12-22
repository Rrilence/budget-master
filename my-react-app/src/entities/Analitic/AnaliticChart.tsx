import { useEffect, useMemo, useState } from "react";
import type { InfoDash } from "../../shared/types";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { Column } from "@ant-design/plots";
import { selectTheme } from "../Theme/theme-slice";
import { formatAmount, getCategoryColor } from "../../shared/formatting";


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
  axis: {
      x: {
        labelSpacing: 12
      },
    },
  style: {
    fill: ({ type }: { type: string }) => getCategoryColor(type),
  },
  tooltip: {
    title: false,
    items: [
      (d) => {
        return {
          value: formatAmount(d.value),
          color: getCategoryColor(d.type),
        };
      },
    ],
    },
  };
  return <Column {...config} />;

}

export default AnaliticChart