import { useSelector } from "react-redux";
import { selectExpenses } from "../../entities/Expenses/expenses-slice";
import { selectIncomes } from "../../entities/Incomes/incomes-slice";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';


export const usePredict = () => {
    const expenses = useSelector(selectExpenses);
    const incomes = useSelector(selectIncomes);

    const [balance, setBalance] = useState(0);
    const [balanceProficit, setBalanceProficit] = useState(0);
    const [onlyExpenses, setOnlyExpenses] = useState(0);
    const [inflation, setInflation] = useState(0);

    useEffect(() => {
        const calcBalance = () => {
        const today = dayjs();
        const startDate = today.subtract(2, 'month').startOf('month');
        const endDate = today.subtract(1, 'month').endOf('month');
        let totalexpenses = 0;
        let totalincomes = 0;
        expenses.forEach(expense => {
            const expenseDate = dayjs(expense.date, 'DD.MM.YYYY');
            if(expenseDate.isSameOrAfter(startDate, 'day')
            && expenseDate.isSameOrBefore(endDate, 'day'))
                {
                    totalexpenses += expense.amount  / 2;
                }
        })
        incomes.forEach(income => {
            const incomeDate = dayjs(income.date, 'DD.MM.YYYY');
            if(incomeDate.isSameOrAfter(startDate, 'day')
            && incomeDate.isSameOrBefore(endDate, 'day'))
                {
                    totalincomes += income.amount  / 2;
                }
        })
        setBalance(totalincomes - totalexpenses);
        setBalanceProficit(totalincomes * 1.1 - totalexpenses);
        setOnlyExpenses(totalexpenses);
        setInflation(totalincomes - totalexpenses * 1.06);
        };

        calcBalance();
    }, [expenses, incomes])

    return {balance, balanceProficit, onlyExpenses, inflation}
}