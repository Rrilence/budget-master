import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Flex, Image, Typography} from "antd"

import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { selectIsOpenModal, selectTotalAmount, setBudgets, setIsOpenModal } from "../../../entities/Budget/budget-slice";
import ModalBudget from "../../../entities/Budget/ui/ModalBudget";
import BudgetSegment from "../../../entities/Budget/ui/BudgetSegment";

import budget from '../../../assets/budget.png'
import { useEffect } from "react";
import { selectUser } from "../../../entities/auth-slice";
import { getBudgets } from "../../../entities/Budget/api/getBudgets";
import { notifyError } from "../../../shared/toasts";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import { setExpenses } from "../../../entities/Expenses/expenses-slice";
import BudgetList from "../../../entities/Budget/ui/BudgetsList";

const {Text} = Typography

const Budget = () => {
    const dispatch = useDispatch();
    const isOpenModal = useSelector(selectIsOpenModal);
    const user = useSelector(selectUser);
    const totalAmount = useSelector(selectTotalAmount);

    const showModal = () => {
            dispatch(setIsOpenModal(true))
        };


    useEffect(() => {
        const initialStateBudgets = async() => {
            try {if(!user) {throw Error}
                const dataBudgets = await getBudgets(user);
                dispatch(setBudgets(dataBudgets));
                const dataExpenses = await getExpenses(user);
                dispatch(setExpenses(dataExpenses));
            } catch (error) {
                console.error('Ошибка при загрузке данных', error);
                notifyError();
                return []
            }
        }
        initialStateBudgets()
    }, [dispatch, user])

    return (
           <>
           <BudgetSegment/>
           <Flex justify="center" align="center" gap={15} style={{marginTop: 25}}>
             <Image width={100} alt="budget" src={budget}/>
             <Flex vertical align="center">
                <Text strong>Общий бюджет</Text>
                <Text>{totalAmount} руб.</Text>
             </Flex>
           </Flex>
            <BudgetList/>
           {isOpenModal && <ModalBudget/>}
           <Flex 
           justify="center"
           align="center"
           className={styles.footer}>
                <Button
                type="primary"
                icon={<PlusCircleOutlined />} 
                onClick={showModal}
                > Добавить бюджет
                </Button>
           </Flex>
           </>
    )
}

export default Budget