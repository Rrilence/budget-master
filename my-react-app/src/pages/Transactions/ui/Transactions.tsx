import { Button, Flex, Segmented,} from "antd"
import { useEffect, useState } from "react"

import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { notifyErrorExpenses } from "../../../shared/toasts";
import { selectIsOpenModal, setExpenses, setIsOpenModal } from "../../../entities/Expenses/expenses-slice";
import ModalExpenses from "../../../entities/Expenses/ui/ModalExpenses";
import { PlusCircleOutlined } from "@ant-design/icons";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
// import ExpensesList from "../../../entities/Expenses/ui/ExpensesList";


const Transactions = () => {
    const dispatch = useDispatch();
    
    const [transactions, setTransactions] = useState('Расходы');
    const isOpenModal = useSelector(selectIsOpenModal);
    console.log(transactions);
    
   
    const showModal = () => {
        dispatch(setIsOpenModal(true))
    };
    
    useEffect(() => {
        const initialState = async () => {
            try {const data = await getExpenses();
                dispatch(setExpenses(data));
            } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            notifyErrorExpenses();
            return []
        }}
        initialState()
    }, []);

    return (
            <Flex vertical className={styles.container}>
                <Segmented<string>
                    options={['Расходы', 'Доходы']}
                    onChange={(value) => setTransactions(value)}
                    block
                />
                {/* {transactions === "Расходы" && <ExpensesList/>} */}
                <Button 
                type="primary"
                icon={<PlusCircleOutlined style={{fontSize: '35px'}}/>} 
                onClick={showModal}
                shape="circle"
                className={styles.add}/>
                {isOpenModal && <ModalExpenses/>}
            </Flex>
    )
}

export default Transactions