import { DualAxes } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { selectIncomes } from "../Incomes/incomes-slice";
import { useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';
import { selectTheme } from "../Theme/theme-slice";
import type { InfoExpInc, InfoProfit } from "../../shared/types";
import { setFinAudit } from "./analitic-slice";

const DualChart = () => {

  const initialExpInc = useMemo(() => {
    return [
      {type: '01', Стоимость: 0, name: 'Расходы'},
      {type: '02', Стоимость: 0, name: 'Расходы'},
      {type: '03', Стоимость: 0, name: 'Расходы'},
      {type: '04', Стоимость: 0, name: 'Расходы'},
      {type: '05', Стоимость: 0, name: 'Расходы'},
      {type: '06', Стоимость: 0, name: 'Расходы'},
      {type: '07', Стоимость: 0, name: 'Расходы'},
      {type: '08', Стоимость: 0, name: 'Расходы'},
      {type: '09', Стоимость: 0, name: 'Расходы'},
      {type: '10', Стоимость: 0, name: 'Расходы'},
      {type: '11', Стоимость: 0, name: 'Расходы'},
      {type: '12', Стоимость: 0, name: 'Расходы'},
      {type: '01', Стоимость: 0, name: 'Доходы'},
      {type: '02', Стоимость: 0, name: 'Доходы'},
      {type: '03', Стоимость: 0, name: 'Доходы'},
      {type: '04', Стоимость: 0, name: 'Доходы'},
      {type: '05', Стоимость: 0, name: 'Доходы'},
      {type: '06', Стоимость: 0, name: 'Доходы'},
      {type: '07', Стоимость: 0, name: 'Доходы'},
      {type: '08', Стоимость: 0, name: 'Доходы'},
      {type: '09', Стоимость: 0, name: 'Доходы'},
      {type: '10', Стоимость: 0, name: 'Доходы'},
      {type: '11', Стоимость: 0, name: 'Доходы'},
      {type: '12', Стоимость: 0, name: 'Доходы'},
  ];
  }, [])

  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);
  const theme = useSelector(selectTheme);
  const [data, setData] = useState<InfoExpInc[]>(initialExpInc);
  const [profit, setProfit] = useState<InfoProfit[]>([]);
  
  const processedData = useMemo(() => {
    const newExpInc = initialExpInc.map(item => ({...item}));
    const newProfit = Array.from({length: 12}, (_, i) => ({
      type: String(i + 1).padStart(2, '0'),
      Прибыль: 0,
      Убыток: 0,
    }));

    const expIncMap = new Map<string, { type: string; Стоимость: number; name: string }>();
    
    newExpInc.forEach(item => {
      expIncMap.set(`${item.type}-${item.name}`, item);
    });
    const currentYear = dayjs().format('YYYY');

    expenses.forEach(expense => {
        const expenseDate = dayjs(expense.date, 'DD.MM.YYYY');
        if (expenseDate.format('YYYY') === currentYear) {
            const monthOfYear = expenseDate.format('MM');
            const chartKey = `${monthOfYear}-Расходы`;
            const chartItem = expIncMap.get(chartKey);
            
            if (chartItem) {
                chartItem.Стоимость += expense.amount;
            }
        }
    });

    incomes.forEach(income => {
        const incomeDate = dayjs(income.date, 'DD.MM.YYYY');
        if (incomeDate.format('YYYY') === currentYear) {
            const monthOfYear = incomeDate.format('MM');
            const chartKey = `${monthOfYear}-Доходы`;
            const chartItem = expIncMap.get(chartKey);
            
            if (chartItem) {
                chartItem.Стоимость += income.amount;
            }
        }
    });
      newProfit.forEach(item => {
        const expense = expIncMap.get(`${item.type}-Расходы`);
        const income = expIncMap.get(`${item.type}-Доходы`);
        item.Прибыль = Math.max(0, income!.Стоимость - expense!.Стоимость);
        item.Убыток = Math.min(0, income!.Стоимость - expense!.Стоимость);
    });

      return {
        data: newExpInc, 
        profit: newProfit 
      };
  }, [expenses, incomes, initialExpInc]);
  useEffect(() => {
    setData(processedData.data);
    setProfit(processedData.profit);
    dispatch(setFinAudit(processedData.profit));
  }, [processedData, dispatch])


  const config = {
  theme: theme === 'light' ? 'light' : 'dark',
  xField: 'type',
  padding: [50, 50, 50, 50],
  legend: true,
  scale: { color: { range: ['#c4e218ff', '#6395FA', '#64DAAB'] } },
  interaction: { tooltip: { sort: (d) => ['Прибыль', 'Доходы', 'Расходы'].indexOf(d.name) } },
  children: [
    {
      data: profit,
      type: 'interval',
      yField:  'Прибыль',
      style: { maxWidth: 30, radiusTopLeft: 6,
      radiusTopRight: 6, },
    },
    {
      data: data,
      type: 'line',
      yField:  'Стоимость',
      colorField: 'name',
      seriesField: 'name',
      axis: { y: { position: 'right' } },
      style: { 
      lineWidth: 3 },
    },
  ],
};
  return <DualAxes {...config}/>;
}

export default DualChart