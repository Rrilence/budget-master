import { useDispatch } from "react-redux"
import { setinitialValues, setIsOpenModal, setIsUpdateBudget } from "../budget-slice";
import { Button, Flex, Modal, Typography } from "antd";
import type { InfoBudget } from "../../../shared/types";
import dayjs from 'dayjs';
import DemoLine from "./DemoLine";

const { Paragraph, Text } = Typography;

interface BudgetProps {
    budget: InfoBudget,
    onClose: () => void,
    isOpen: boolean,
}

const BudgetDescription = ({budget, isOpen, onClose}: BudgetProps) => {

    const dispatch = useDispatch();

    const dateFormat = 'DD.MM.YYYY';

    const updateBudget = () => {
        onClose();
        dispatch(setIsOpenModal(true));
        dispatch(setIsUpdateBudget(true));
        dispatch(setinitialValues({
        id: budget.id,
        user_id: budget.user_id,
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
        dateStart: dayjs(budget.dateStart, dateFormat).format(dateFormat),
        dateArr: [dayjs(budget.dateStart, dateFormat).toString(),
        dayjs(budget.dateEnd, dateFormat).toString()],
        }));
    }

    return (
        <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpen}
        onCancel={onClose}
        width={350}
        footer={
            <Button key="submit" type="primary"
            htmlType="submit" onClick={updateBudget}
            >Редактировать</Button>
            }>
            <Flex vertical justify="center" align="center" gap={10}>
                <Text strong style={{fontSize: '22px'}}>{budget.category}</Text>
                <Flex justify="space-between">
                    <p style={{fontSize: '16px'}}>{budget.dateStart} - {budget.dateEnd}</p>
                </Flex>
                <Flex vertical style={{margin: '5px', marginRight: 'auto'}}>
                    <Text strong style={{fontSize: '16px'}}>Описание:</Text>
                    <Paragraph>{budget.description}</Paragraph>
                </Flex>
                <DemoLine category={budget.category} dateStart={budget.dateStart} dateEnd={budget.dateEnd}/>
            </Flex>
        </Modal>
    )

}

export default BudgetDescription