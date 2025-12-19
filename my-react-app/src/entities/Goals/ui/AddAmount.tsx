import { Button, InputNumber, Modal, Typography } from "antd"
import { useState } from "react";
import { addSavings } from "../api/addSavings";
import { useDispatch, useSelector } from "react-redux";
import { selectGoals, setGoals } from "../goals-slice";

const {Text} = Typography

interface SavingProps {
    id: string,
    user_id: string,
    amount: number,
    onClose: () => void,
    isOpen: boolean,
}

const AddAmount = ({id, user_id, amount, isOpen, onClose}: SavingProps) => {

    const dispatch = useDispatch();
    const goals = useSelector(selectGoals);
    const [value, setValue] = useState(0);
    const newValue = amount + value;

    const onFinish = async(id: string, user_id: string, newValue: number) => {
        const result = await addSavings(id, user_id, newValue);
        if(result && result.error) {
            return result.error
        } else {
            const newGoal = goals.map(goal => goal.id === result?.id 
            ? { ...goal, ...result }
            : goal
            )
            dispatch(setGoals(newGoal));
            setValue(0);
        }
        onClose();
    }

    return (
        <Modal
        title="Накопления"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpen}
        onCancel={onClose}
        width={{
          xs: '60%',
          sm: '50%',
          md: '40%',
          xl: '30%',
        }}
        footer={
            <Button key="submit" type="primary"
            htmlType="submit" 
            onClick={() => onFinish(id, user_id, newValue)}
            >Добавить</Button>
            }>
            <Text style={{display: 'block', marginBottom: 10}}>Введите накопленную сумму, если хотите вычесть часть накопленной суммы, введите отрицательное число со знаком минус (-)</Text>
            <InputNumber
            precision={2}
            placeholder="0.00"
            style={{width: 150}}
            value={value}
            onChange={(value: number | null) => {
                if (typeof value === 'number') {
                    setValue(value);
                } else if (value === null) {
                    setValue(0);
                }
            }}
            />
        </Modal>
    )
}

export default AddAmount