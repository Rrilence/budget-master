import { useDispatch, useSelector } from "react-redux";
import { selectExpenses, setExpenses } from "../../../entities/Expenses/expenses-slice";
import { selectIncomes, setIncomes } from "../../../entities/Incomes/incomes-slice";
import DualChart from "../../../entities/Analitic/DualChart";
import { selectUser } from "../../../entities/auth-slice";
import { useEffect, useMemo, useState } from "react";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import { getIncomes } from "../../../entities/Incomes/api/getIncomes";
import { notifyError } from "../../../shared/toasts";
import { selectWindowWidth, setWindowWidth } from "../../../entities/windoWidth-slice";
import { Col, Flex, Row, Typography } from "antd";
import Audit from "../../../entities/Analitic/Audit";
import AnaliticChart from "../../../entities/Analitic/AnaliticChart";
import styles from './styles.module.css'
import { selectTheme } from "../../../entities/Theme/theme-slice";

const {Text} = Typography;


const Analytics = () => {

  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes)
  const windowWidth = useSelector(selectWindowWidth);
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const [isDesktop, setIsDesktop] = useState(false); 

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

  useEffect(() => {
    const initialState = async () => {
        try {if(!user) {throw Error}
        const dataExpenses = await getExpenses(user);
        dispatch(setExpenses(dataExpenses));
        const dataIncomes = await getIncomes(user!);
        dispatch(setIncomes(dataIncomes));
        } catch (error) {
        console.error('Ошибка при загрузке данных', error);
        notifyError();
        return []
    }};
    initialState();
  }, [dispatch, user]); 

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
      { isDesktop ? (
        <Row align="stretch" className={`${theme === 'light' ? 'light' : 'dark'}`}>
          <Col span={12} style={{padding: '20px'}}>
          <div style={{height: '500px'}}>
            <DualChart />   
          </div>
            <Flex justify="space-between" className={styles.statistic}>
              <Flex vertical align="center">
                <Text strong style={{color: '#19a86fff'}}>Мин. доход</Text>
                <Text>{calcIncome.min} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#19a86fff'}}>Средний доход</Text>
                <Text>{calcIncome.average} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#19a86fff'}}>Макс. доход</Text>
                <Text>{calcIncome.max} руб.</Text>
              </Flex>
            </Flex> 
            <Flex justify="space-between" className={styles.statistic}>
              <Flex vertical align="center">
                <Text strong style={{color: '#6395FA'}}>Мин. расход</Text>
                <Text>{calcExpense.min} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#6395FA'}}>Средний драсход</Text>
                <Text>{calcExpense.average} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#6395FA'}}>Макс. расход</Text>
                <Text>{calcExpense.max} руб.</Text>
              </Flex>
            </Flex> 
          </Col>
          <Col span={12} style={{padding: '70px 20px'}}>  
            <div style={{height: '531px'}}>
              <AnaliticChart/>
            </div>
          </Col>
          <Col span={24}>
            <Audit/> 
          </Col>
        </Row> 
        ) : (
        <Row justify="center" className={`${theme === 'light' ? 'light' : 'dark'}`}>
          <Col span={24}>
            <DualChart/>
            <Flex justify="space-between" gap={5} className={styles.statistic}>
              <Flex vertical align="center">
                <Text strong style={{color: '#19a86fb0', textAlign: 'center'}}>Мин. доход</Text>
                <Text>{calcIncome.min} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#19a86fff', textAlign: 'center'}}>Средний доход</Text>
                <Text>{calcIncome.average} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#19a86fff', textAlign: 'center'}}>Макс. доход</Text>
                <Text>{calcIncome.max} руб.</Text>
              </Flex>
            </Flex> 
            <Flex justify="space-between" gap={5} className={styles.statistic}>
              <Flex vertical align="center">
                <Text strong style={{color: '#6395FA', textAlign: 'center'}}>Мин. расход</Text>
                <Text>{calcExpense.min} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#6395FA', textAlign: 'center'}}>Средний расход</Text>
                <Text>{calcExpense.average} руб.</Text>
              </Flex>
              <Flex vertical align="center">
                <Text strong style={{color: '#6395FA', textAlign: 'center'}}>Макс. расход</Text>
                <Text>{calcExpense.max} руб.</Text>
              </Flex>
            </Flex> 
            <AnaliticChart/>
            <Audit/> 
          </Col>
        </Row>
        )
      }
      </>
    )
}

export default Analytics