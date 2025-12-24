import { useEffect, useMemo, useState } from "react";
import type { InfoDash } from "../../shared/types";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { Column } from "@ant-design/plots";
import { selectData, selectTheme } from "../setting-slice";
import {getCategoryColor } from "../../shared/formatting";
import useCurrency from "../../shared/hooks/useCurrency";


const AnaliticChart = () => {

  const setting = useSelector(selectData)

  const initialDash = useMemo(() => {
    return (setting?.category || []).map(category => ({
      type: category,
      value: 0
    }));
  }, [setting?.category]);

  const [data, setData] = useState<InfoDash[]>(initialDash);
  const expenses = useSelector(selectExpenses);
  const theme = useSelector(selectTheme);

  const {formatAmount} = useCurrency();

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
      (d: InfoDash) => {
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