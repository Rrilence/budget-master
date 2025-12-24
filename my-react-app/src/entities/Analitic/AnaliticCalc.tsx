import { Flex, Typography } from "antd"
import styles from './styles.module.css'
import useCurrency from "../../shared/hooks/useCurrency";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { selectIncomes } from "../Incomes/incomes-slice";

const {Text} = Typography

export const AnaliticCalc = () => {

    const expenses = useSelector(selectExpenses);
    const incomes = useSelector(selectIncomes)
    const {symbolCurrency} = useCurrency();

    const calcExpense = useMemo(() => {
        const expAmount: number[] = [];
        expenses.forEach(item => ( expAmount.push(item.amount)))
        const min = Math.min(...expAmount);
        const max = Math.max(...expAmount);
        const sum = expAmount.reduce((acc, exp) => acc + exp, 0);
        const average = Math.round(sum / expAmount.length);
    
        return {
          min, max, average
        }
    }, [expenses]);
    
      const calcIncome = useMemo(() => {
        const incAmount: number[] = [];
        incomes.forEach(item => ( incAmount.push(item.amount)))
        const min = Math.min(...incAmount);
        const max = Math.max(...incAmount);
        const sum = incAmount.reduce((acc, inc) => acc + inc, 0);
        const average = Math.round(sum / incAmount.length);

        return {
            min, max, average
        }
    }, [incomes]);
    

    return (
        <>
        <Flex justify="space-between" className={styles.statistic}>
            <Flex vertical align="center">
            <Text strong style={{color: '#19a86fff'}}>Мин. доход</Text>
            <Text>{calcIncome.min} {symbolCurrency}</Text>
            </Flex>
            <Flex vertical align="center">
            <Text strong style={{color: '#19a86fff'}}>Средний доход</Text>
            <Text>{calcIncome.average} {symbolCurrency}</Text>
            </Flex>
            <Flex vertical align="center">
            <Text strong style={{color: '#19a86fff'}}>Макс. доход</Text>
            <Text>{calcIncome.max} {symbolCurrency}</Text>
            </Flex>
        </Flex> 
        <Flex justify="space-between" className={styles.statistic}>
            <Flex vertical align="center">
            <Text strong style={{color: '#6395FA'}}>Мин. расход</Text>
            <Text>{calcExpense.min} {symbolCurrency}</Text>
            </Flex>
            <Flex vertical align="center">
            <Text strong style={{color: '#6395FA'}}>Средний драсход</Text>
            <Text>{calcExpense.average} {symbolCurrency}</Text>
            </Flex>
            <Flex vertical align="center">
            <Text strong style={{color: '#6395FA'}}>Макс. расход</Text>
            <Text>{calcExpense.max} {symbolCurrency}</Text>
            </Flex>
        </Flex> 
        </>
    )
}