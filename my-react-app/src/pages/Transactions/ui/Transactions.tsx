import { Flex, FloatButton, Segmented,} from "antd"
import { useDispatch, useSelector } from "react-redux";
import { selectIsOpenModal, selectTransactions, setExpenses, setIsOpenModal, setTransactions } from "../../../entities/Expenses/expenses-slice";
import ModalExpenses from "../../../entities/Expenses/ui/ModalExpenses";
import { PlusOutlined } from "@ant-design/icons";
import ExpensesList from "../../../entities/Expenses/ui/ExpensesList";
import IncomesList from "../../../entities/Incomes/ui/IncomesList";
import ModalIncomes from "../../../entities/Incomes/ui/ModalIncomes";
import styles from './styles.module.css'
import { selectUser } from "../../../entities/auth-slice";
import { useEffect } from "react";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import { notifyError } from "../../../shared/toasts";
import { setIncomes } from "../../../entities/Incomes/incomes-slice";
import { getIncomes } from "../../../entities/Incomes/api/getIncomes";


const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isOpenModal = useSelector(selectIsOpenModal);
    const user = useSelector(selectUser);

    const showModal = () => {
        dispatch(setIsOpenModal(true))
    };

    useEffect(() => {
        const initialState = async () => {
            try {if(!user) {throw Error}
            if(transactions === "Расходы") {
                const dataExpenses = await getExpenses(user);
                dispatch(setExpenses(dataExpenses));
            } else if(transactions === "Доходы") {
                const dataIncomes = await getIncomes(user!);
                dispatch(setIncomes(dataIncomes));
            }
            } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            notifyError();
            return []
        }};
        initialState();
    }, [dispatch, user, transactions]);

    useEffect(() => {
        setTransactions("Расходы")
    }, [])

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