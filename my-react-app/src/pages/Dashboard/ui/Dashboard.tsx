import { useDispatch, useSelector } from "react-redux"
import { selectExpenses, setExpenses } from "../../../entities/Expenses/expenses-slice";
import { selectIncomes, setIncomes } from "../../../entities/Incomes/incomes-slice";
import { useEffect, useState } from "react";
import { Flex, Progress, Space, Typography } from "antd";
import { formatAmount } from "../../../shared/formatting";
import { selectUser } from "../../../entities/auth-slice";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import { notifyError } from "../../../shared/toasts";
import { getIncomes } from "../../../entities/Incomes/api/getIncomes";
import { selectTheme } from "../../../entities/Theme/theme-slice";
import styles from './styles.module.css'
import clsx from "clsx";
import DashChart from "../../../entities/Dashboard/DashChart";
import ExpenseIncome from "../../../entities/Dashboard/ExpenseIncome/ExpenseIncome";

const {Text} = Typography


const DashBoard = () => {

    const dispatch = useDispatch();
    const expenses = useSelector(selectExpenses);
    const incomes = useSelector(selectIncomes);
    const user = useSelector(selectUser);
    const theme = useSelector(selectTheme)

    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);

    

    useEffect(() => {
        const initialStateExpenses = async () => {
            try {if(!user) {throw Error}
            const data = await getExpenses(user);
                dispatch(setExpenses(data));
            } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            notifyError();
            return []
        }}
        const initialStateIncomes = async () => {
            try {const data = await getIncomes(user!);
                dispatch(setIncomes(data));
            } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            notifyError();
            return []
        }}

        initialStateExpenses()
        initialStateIncomes()
    }, [dispatch, user]);
    
    useEffect(() => {
        const calcBalance = () => {
            const sumExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
            const sumIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
            setExpense(sumExpenses);
            setIncome(sumIncomes);
            setBalance(sumIncomes - sumExpenses);
        }
        calcBalance()
    }, [expenses, incomes])
    
    return (
        <>
        <Flex 
        vertical 
        justify="center"
        className={clsx(`${theme === 'light' ? 'light' : 'dark'}`, styles.balance)}>
        <Text strong style={{fontSize: 20}}>Баланс: {formatAmount(balance)}</Text>
        <Progress percent={
            balance > 0 
            ? Math.round(expense * 100 / income)
            : 0
        } 
        status="active" 
        strokeColor={{ from: '#f6e81cff', to: '#d06868ff' }} 
        />
        <Flex justify="space-between" gap={15} style={{marginBottom: 30}}>
            <Text>Потрачено: {formatAmount(expense)}</Text>
            <Text>Общий доход: {formatAmount(income)}</Text> 
        </Flex>   
        <Space wrap>
            <DashChart sumExpenses={expense}/>
            <ExpenseIncome/>
        </Space>

        </Flex>
        </>
    )
}

export default DashBoard