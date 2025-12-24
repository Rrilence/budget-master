import { useSelector } from "react-redux";
import { selectExpenses } from "../../Expenses/expenses-slice";
import { selectIncomes } from "../../Incomes/incomes-slice";
import { useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { selectTheme } from "../../setting-slice";
import { BidirectionalBar } from "@ant-design/plots";

dayjs.extend(isBetween);

interface InfoChart {
    type: string,
    Расходы: number,
    Доходы: number,
}

interface ExpIncProps {
  period: string
}

const ChartExpInc = ({period}: ExpIncProps) => {

  const initialChart = useMemo(() => {
    if(period === 'week') {
      return [
        {type: 'Пн', Расходы: 0, Доходы: 0},
        {type: 'Вт', Расходы: 0, Доходы: 0},
        {type: 'Ср', Расходы: 0, Доходы: 0},
        {type: 'Чт', Расходы: 0, Доходы: 0},
        {type: 'Пт', Расходы: 0, Доходы: 0},
        {type: 'Сб', Расходы: 0, Доходы: 0},
        {type: 'Вс', Расходы: 0, Доходы: 0},
      ]
    } else if(period === 'month') {
      return [
        {type: '1-7', Расходы: 0, Доходы: 0},
        {type: '8-14', Расходы: 0, Доходы: 0},
        {type: '15-21', Расходы: 0, Доходы: 0},
        {type: '22-28', Расходы: 0, Доходы: 0},
        {type: '28-31', Расходы: 0, Доходы: 0},
      ]
    } else if(period === 'year') {
      return [
        {type: '01', Расходы: 0, Доходы: 0},
        {type: '02', Расходы: 0, Доходы: 0},
        {type: '03', Расходы: 0, Доходы: 0},
        {type: '04', Расходы: 0, Доходы: 0},
        {type: '05', Расходы: 0, Доходы: 0},
        {type: '06', Расходы: 0, Доходы: 0},
        {type: '07', Расходы: 0, Доходы: 0},
        {type: '08', Расходы: 0, Доходы: 0},
        {type: '09', Расходы: 0, Доходы: 0},
        {type: '10', Расходы: 0, Доходы: 0},
        {type: '11', Расходы: 0, Доходы: 0},
        {type: '12', Расходы: 0, Доходы: 0},
      ]
    } else {
      return []
    }
  }, [period])
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);
  const theme = useSelector(selectTheme);
  const [data, setData] = useState<InfoChart[]>(initialChart);

  const processedData = useMemo(() => {
    const newChart = initialChart.map(item => ({...item}));
    const nowaday = dayjs();
    
    const chartMap = new Map(newChart.map(item => [item.type, item]));
    
    const addToPeriod = (amount: number, date: string, type: 'Расходы' | 'Доходы') => {
        const itemDate = dayjs(date, 'DD.MM.YYYY');
        
        if (period === 'week') {
            const monday = nowaday.startOf('week');
            const sunday = nowaday.endOf('week');
            
            if (!itemDate.isBetween(monday, sunday, null, '[]')) return;
            
            const dayOfWeek = itemDate.format('dd');
            const capitalizedDay = dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1);
            const chartItem = chartMap.get(capitalizedDay);
            
            if (chartItem) {
                chartItem[type] += amount;
            }
        } 
        else if (period === 'month') {
            const currentMonth = nowaday.format('MM.YYYY');
            
            if (itemDate.format('MM.YYYY') !== currentMonth) return;
            
            const dayOfMonth = itemDate.date();
            let periodType = '29-31';
            
            if (dayOfMonth <= 7) periodType = '1-7';
            else if (dayOfMonth <= 14) periodType = '8-14';
            else if (dayOfMonth <= 21) periodType = '15-21';
            else if (dayOfMonth <= 28) periodType = '22-28';
            
            const chartItem = chartMap.get(periodType);
            if (chartItem) {
                chartItem[type] += amount;
            }
        } 
        else if (period === 'year') {
            const currentYear = nowaday.format('YYYY');
            
            if (itemDate.format('YYYY') !== currentYear) return;
            
            const monthOfYear = itemDate.format('MM');
            const chartItem = chartMap.get(monthOfYear);
            
            if (chartItem) {
                chartItem[type] += amount;
            }
        }
    };
    
    expenses.forEach(expense => addToPeriod(expense.amount, expense.date, 'Расходы'));
    incomes.forEach(income => addToPeriod(income.amount, income.date, 'Доходы'));
    
    return newChart;
}, [expenses, incomes, initialChart, period]);

useEffect(() => {
    setData(processedData);
}, [processedData]);

  const config = {
    data,
    xField: 'type',
    layout: 'vertical',
    shapeField: 'column25D',
    style: {
      fill: (d: { groupKey: 'Доходы' | 'Расходы'; type: string }) => {
        if (d.groupKey === 'Доходы') return '#64DAAB';
        return '#6395FA';
      },
    },
    yField: ['Доходы', 'Расходы'],
    tooltip: {
      items: [
        (d: InfoChart) => {
          return {
            name: 'Доходы',
            value: d.Доходы,
            color: '#64DAAB',
          };
        },
        (d: InfoChart) => {
          return {
            name: 'Расходы',
            value: d.Расходы,
            color: '#6395FA',
          };
        },
      ],
    },
    axis: {
      y: {
        labelFill: theme === 'light' ? '#000' : '#ffffffe9',
      },
    },  
  }
  

  return <BidirectionalBar {...config}/>
} 

export default ChartExpInc



