import { Flex, FloatButton, Segmented,} from "antd"
import { useEffect } from "react"

import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../../shared/toasts";
import { selectIsOpenModal, selectTransactions, setExpenses, setIsOpenModal, setTransactions } from "../../../entities/Expenses/expenses-slice";
import ModalExpenses from "../../../entities/Expenses/ui/ModalExpenses";
import { PlusOutlined } from "@ant-design/icons";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import ExpensesList from "../../../entities/Expenses/ui/ExpensesList";
import { selectUser } from "../../../entities/auth-slice";
import IncomesList from "../../../entities/Incomes/ui/IncomesList";
import ModalIncomes from "../../../entities/Incomes/ui/ModalIncomes";
import { getIncomes } from "../../../entities/Incomes/api/getIncomes";
import { setIncomes } from "../../../entities/Incomes/incomes-slice";


const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isOpenModal = useSelector(selectIsOpenModal);
    const user = useSelector(selectUser);

    const showModal = () => {
        dispatch(setIsOpenModal(true))
    };
    
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

    return (
            <Flex vertical className={styles.container}>
                <Segmented<string>
                    options={['Расходы', 'Доходы']}
                    onChange={(value) => dispatch(setTransactions(value))}
                    block
                    className={styles.title}
                />
                {transactions === "Расходы" && <ExpensesList/>}
                {transactions === "Доходы" && <IncomesList/>}
                <FloatButton 
                type="primary"
                icon={<PlusOutlined />} 
                onClick={showModal}
                />
                {isOpenModal && transactions === 'Расходы' && <ModalExpenses/>}
                {isOpenModal && transactions === 'Доходы' && <ModalIncomes/>}
            </Flex>
    )
}

export default Transactions