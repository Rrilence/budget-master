import { Line } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../../Expenses/expenses-slice';
import { useEffect, useState } from 'react';
import { dateValidate } from '../../../shared/validation';

import styles from './styles.module.css'

interface InfoDemoLine {
    дата: string,
    стоимость: number,
}

interface DemoLineProps {
    category: string;
    dateStart: string,
    dateEnd: string,
}

const DemoLine = ( {category, dateStart, dateEnd}: DemoLineProps) => {

    const expenses = useSelector(selectExpenses);
    const [data, setData] = useState<InfoDemoLine[]>([]);

    useEffect(() => {
        const expensesByDate: { [date: string]: number } = {};
        const newData: InfoDemoLine[] = [{дата: '0', стоимость: 0}];

        const additionBudget = (category: string) => {
          const start = dateValidate(dateStart);
          const end = dateValidate(dateEnd);
            expenses.forEach(expense => {
                if(expense.category === category && dateValidate(expense.date) >= start && dateValidate(expense.date) <= end) {
                    if (expensesByDate[expense.date]) {
                        expensesByDate[expense.date] += expense.amount;
                    } else {
                        expensesByDate[expense.date] = expense.amount;
                    } 
                }
            })
            for (const date in expensesByDate) {
                newData.push({ дата: date, стоимость: expensesByDate[date] });
            }
        }
        additionBudget(category)
        setData(newData)
    }, [category, expenses, dateStart, dateEnd])

  const config = {
    data,
    xField: 'дата',
    yField: 'стоимость',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  return <Line className={styles.demoline} {...config} width={300} height={200}/>;
};

export default DemoLine
