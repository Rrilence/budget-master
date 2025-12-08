import { Flex, FloatButton, Segmented,} from "antd"
import { useDispatch, useSelector } from "react-redux";
import { selectIsOpenModal, selectTransactions, setIsOpenModal, setTransactions } from "../../../entities/Expenses/expenses-slice";
import ModalExpenses from "../../../entities/Expenses/ui/ModalExpenses";
import { PlusOutlined } from "@ant-design/icons";
import ExpensesList from "../../../entities/Expenses/ui/ExpensesList";
import IncomesList from "../../../entities/Incomes/ui/IncomesList";
import ModalIncomes from "../../../entities/Incomes/ui/ModalIncomes";
import styles from './styles.module.css'


const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isOpenModal = useSelector(selectIsOpenModal);

    const showModal = () => {
        dispatch(setIsOpenModal(true))
    };

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