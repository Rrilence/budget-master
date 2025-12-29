import { useEffect, useState } from "react";
import useCategory from "../../shared/hooks/useCategory";
import type { InfoDash } from "../../shared/types";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Column } from "@ant-design/plots";
import { getCategoryColor } from "../../shared/formatting";
import useCurrency from "../../shared/hooks/useCurrency";
import { selectTheme } from "../setting-slice";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const PredictExpenses = () => {

    const initialDash = useCategory();

    const expenses = useSelector(selectExpenses);
    const theme = useSelector(selectTheme);
    const [data, setData] = useState<InfoDash[]>(initialDash);

    const {formatAmount} = useCurrency();

    useEffect(() => {
        const addExpenses = () => {
            const today = dayjs();
            const startDate = today.subtract(2, 'month').startOf('month');
            const endDate = today.subtract(1, 'month').endOf('month');     
                 
            const newDash = initialDash.map(item => ({...item}));
            expenses.forEach(expense => {
                newDash.forEach(item => {
                    const expenseDate = dayjs(expense.date, 'DD.MM.YYYY');
                    if(expense.category === item.type 
                    && expenseDate.isSameOrAfter(startDate, 'day')
                    && expenseDate.isSameOrBefore(endDate, 'day'))
                    {
                        item.value += expense.amount  / 2;
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
    scrollbar: false,
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
    return (
        <div style={{ width: '100%'}}>
            <Column {...config} />
        </div>
    )
}

export default PredictExpenses