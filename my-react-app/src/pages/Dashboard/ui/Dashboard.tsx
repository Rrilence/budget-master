import { useDispatch, useSelector } from "react-redux"
import { selectExpenses, setExpenses } from "../../../entities/Expenses/expenses-slice";
import { selectIncomes, setIncomes } from "../../../entities/Incomes/incomes-slice";
import { useEffect, useMemo, useState } from "react";
import { Badge, Col, Flex, Progress, Row, Typography, notification } from "antd";
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
import { selectWindowWidth, setWindowWidth } from "../../../entities/windoWidth-slice";
import DashTransactions from "../../../entities/Dashboard/DashTransactions";
import { BellOutlined } from "@ant-design/icons";
import { selectBudgets, setBudgets } from "../../../entities/Budget/budget-slice";
import { getBudgets } from "../../../entities/Budget/api/getBudgets";
import useBudget from "../../../shared/useBudget";
import DashGoals from "../../../entities/Dashboard/DashGoals";
import { getGoals } from "../../../entities/Goals/api/getGoals";
import { selectGoals, setGoals } from "../../../entities/Goals/goals-slice";
import dayjs from 'dayjs';

const {Text} = Typography

type Exceed = string;
type NotificationType = 'success' | 'info' | 'warning' | 'error';


const DashBoard = () => {

    const [api, contextHolder] = notification.useNotification()
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpenses);
    const incomes = useSelector(selectIncomes);
    const budgets = useSelector(selectBudgets);
    const goals = useSelector(selectGoals);
    const user = useSelector(selectUser);
    const windowWidth = useSelector(selectWindowWidth);
    const theme = useSelector(selectTheme);
    const expensesByCategory = useBudget(budgets, expenses);

    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [exceedBudget, setExceedBudget] = useState<Exceed[]>([]);
    const [dedlineGoals, setDedlineGoals] = useState<Exceed[]>([]);
    const [overdueGoals, setOverdueGoals] = useState<Exceed[]>([]);
    const [isDesktop, setIsDesktop] = useState(false); 

    const openNotificationWithIcon = (type: NotificationType) => {
        exceedBudget.forEach(item => {
            api[type]({
              message: 'Внимание!',
              description: `Превышен запланированный бюджет по категории ${item}`,
            });
        })
        dedlineGoals.forEach(item => {
            api[type]({
              message: 'Внимание!',
              description: `Подходит срок достижения цели: ${item}`,
            });
        })
        overdueGoals.forEach(item => {
            api[type]({
              message: 'Внимание!',
              description: `Просрочен срок достижения цели: ${item}`,
            });
        })
    };  

    useEffect(() => {
        const initialState = async () => {
            try {if(!user) {throw Error}
            const [expenses, incomes, budgets, goals] = await Promise.all([
                    getExpenses(user),
                    getIncomes(user),
                    getBudgets(user),
                    getGoals(user),
                ]);
            dispatch(setExpenses(expenses));
            dispatch(setIncomes( incomes));
            dispatch(setBudgets(budgets));
            dispatch(setGoals(goals));
            } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            notifyError();
            return []
        }};
        initialState();
    }, [dispatch, user]);

    const financialData = useMemo(() => {
    const sumExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const sumIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
    
    const exceeded = budgets.reduce<string[]>((acc, budget) => {
        const spentAmount = expensesByCategory[budget.id!]?.[budget.category] || 0;
        if (spentAmount > budget.amount && !acc.includes(budget.category)) {
            acc.push(budget.category);
        }
        return acc;
    }, []);

    const dedline = goals.reduce<string[]>((acc, goal) => {
        if (dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day') < 8 
        && dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day') > 0) {
            acc.push(goal.name);
        }
        return acc;
    }, []);

    const overdue = goals.reduce<string[]>((acc, goal) => {
        if (dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day') === 0 ||
        dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day') < 0
        ) { 
            acc.push(goal.name);
        }
        return acc;
    }, []);
    
    return {
        expense: sumExpenses,
        income: sumIncomes,
        balance: sumIncomes - sumExpenses,
        exceedBudget: exceeded,
        dedline,
        overdue,
    };
}, [expenses, incomes, budgets, expensesByCategory, goals]);

useEffect(() => {
    setExpense(financialData.expense);
    setIncome(financialData.income);
    setBalance(financialData.balance);
    setExceedBudget(financialData.exceedBudget);
    setOverdueGoals(financialData.overdue);
    setDedlineGoals(financialData.dedline);
}, [financialData]);


    useEffect(() => {
        const handleResize = () => {
          dispatch(setWindowWidth(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [dispatch]);

    useEffect(() => {
        setIsDesktop(windowWidth >= 1050);
    }, [windowWidth])
    
    return (
        <>
        <Flex 
        vertical 
        justify="center"
        className={clsx(`${theme === 'light' ? 'light' : 'dark'}`, styles.balance)}>
            <Badge count={exceedBudget.length + overdueGoals.length + dedlineGoals.length} size="small">
                {contextHolder}
                <BellOutlined style={{ fontSize: 25}} onClick={() => openNotificationWithIcon('error')}/>
            </Badge>
            <Text strong style={{fontSize: 17}}>Баланс: {formatAmount(balance)}</Text>
            <Progress 
            percentPosition={{align: 'end', type: 'outer' }}
            percent={
                income > 0 
                ? Math.min(100, Math.round(expense * 100 / income))
                : 0
            } 
            status="active" 
            strokeColor={{ from: '#f6e81cff', to: '#d06868ff' }} 
            />
            <Flex justify="space-between" gap={15} style={{margin: '10px 0 50px'}}>
                <Text style={{fontSize: 14}}>Потрачено: {formatAmount(expense)}</Text>
                <Text style={{fontSize: 14}}>Общий доход: {formatAmount(income)}</Text> 
            </Flex> 
            { isDesktop ? (
                <Row>
                    <Col span={12}>
                        <DashChart sumExpenses={expense}/>  
                        <ExpenseIncome/>    
                    </Col>
                    <Col span={10} offset={2}>
                        <DashTransactions/> 
                        <DashGoals/>
                    </Col>
                </Row> 
                ) : (
                <Row>
                    <Col span={24}>
                        <DashChart sumExpenses={expense}/>
                        <ExpenseIncome/>   
                        <DashTransactions/> 
                        <DashGoals/>
                    </Col>
                </Row>
                )
            }
        </Flex>
        </>
    )
}

export default DashBoard