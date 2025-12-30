import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../shared/hooks/useWindowSize";
import { selectWindowWidth } from "../../../entities/windoWidth-slice";
import { selectTheme } from "../../../entities/setting-slice";
import { useEffect, useState } from "react";
import { selectUser } from "../../../entities/auth-slice";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import { selectExpenses, setExpenses } from "../../../entities/Expenses/expenses-slice";
import { getIncomes } from "../../../entities/Incomes/api/getIncomes";
import { selectIncomes, setIncomes } from "../../../entities/Incomes/incomes-slice";
import { notifyError } from "../../../shared/toasts";
import { Col, Row, Flex, Typography } from "antd";
import PredictExpenses from "../../../entities/Predict/PredictExpenses";
import dayjs from 'dayjs';
import clsx from "clsx";
import styles from './styles.module.css'
import { FileExcelOutlined } from "@ant-design/icons";
import Stadiumpredict from "../../../entities/Predict/Stadiumpredict";
import CreditCalc from "../../../entities/Predict/CreditCalc";
import { usePredict } from "../../../shared/hooks/usePredict";
import useCurrency from "../../../shared/hooks/useCurrency";
import circle from '../../../assets/circle.jpg'

const {Text} = Typography;

const Predict = () => {

    useWindowSize();
    const expenses = useSelector(selectExpenses
    );
    const incomes = useSelector(selectIncomes);
    const dispatch = useDispatch();
    const windowWidth = useSelector(selectWindowWidth);
    const theme = useSelector(selectTheme);
    const user = useSelector(selectUser);

    const [isDesktop, setIsDesktop] = useState(false); 
    const [hasPredict, setHasPredict] = useState(false);

    const {balance} = usePredict();
    const {formatAmount} = useCurrency();

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
        const checkData = () => {
            const today = dayjs();
            const checkDay = today.subtract(2, 'month').endOf('month');
            const hasNeedExpenses = expenses.some(expense => 
                dayjs(expense.date, 'DD.MM.YYYY').isSameOrBefore(checkDay, 'day'));
            const hasNeedIncomes = incomes.some(income => 
                dayjs(income.date, 'DD.MM.YYYY').isSameOrBefore(checkDay, 'day'));
            if(!hasNeedExpenses &&  hasNeedIncomes) {
                setHasPredict(false);
            } 
            setHasPredict(true);
        }
        checkData();
    }, [expenses, incomes])
    

    useEffect(() => {
        setIsDesktop(windowWidth >= 950);
    }, [windowWidth])
    

    return  hasPredict ? (
            isDesktop ? (
                <Row justify='center' className={`${theme === 'light' ? 'light' : 'dark'}`}>
                    <Col span={24} style={{padding: '20px'}}>
                        <Flex justify="center" style={{margin: '20px 20px 50px'}} align="center" gap={15}>
                            <Text strong style={{fontSize: 16, width: 280}}>Учитывая доходы и расходы предыдущих месяцев, Баланс счета в следующем месяце составит: </Text>
                            <Flex justify="center" align="center">
                                <img src={circle} width={150}/>
                                <Text strong className={styles.balance}> {formatAmount(balance)}</Text>
                            </Flex>
                        </Flex>
                    </Col>
                    <Col span={14} style={{padding: '20px'}}>
                        <Flex vertical align="center">
                            <Text strong style={{marginBottom: 20}}>Прогноз расходов на следующий месяц</Text>
                            <PredictExpenses/>
                        </Flex>
                    </Col>
                    <Col span={10} style={{padding: '20px'}}>
                        <Stadiumpredict/>
                    </Col>
                    <Col span={24} style={{padding: '20px'}}>
                        <CreditCalc balance={balance}/>
                    </Col>
                </Row>
            ) : (
                <Row justify='center' className={`${theme === 'light' ? 'light' : 'dark'}`}>
                    <Col span={24} style={{padding: '20px'}}>
                        <Flex justify="center" style={{margin: '20px 20px 50px'}} align="center" gap={15}>
                            <Text strong style={{fontSize: 16, width: 280}}>Учитывая доходы и расходы предыдущих месяцев, Баланс счета в следующем месяце составит: </Text>
                            <Flex justify="center" align="center">
                                <img src={circle} width={150}/>
                                <Text strong className={styles.balance}> {formatAmount(balance)}</Text>
                            </Flex>
                        </Flex>
                        <Flex vertical align="center">
                            <Text strong style={{marginBottom: 20}}>Прогноз расходов на следующий месяц</Text>
                            <PredictExpenses/>
                        </Flex>
                        <Stadiumpredict/>
                        <CreditCalc balance={balance}/>
                    </Col>
                </Row>
            )
        ) : (
            <Flex vertical align="center" gap={15} className={clsx(`${theme === 'light' ? 'light' : 'dark'}`, styles.alert)}>
                <Text strong style={{fontSize: 18}}>Недостаточно данных для расчета прогнозов.</Text>
                <Text>Расчет доступен при наличии данных за 2 полных месяца.</Text>
                <FileExcelOutlined style={{fontSize: 60, marginTop: 20, color: '#33b7ceff'}}/>
            </Flex>
        )  
}

export default Predict