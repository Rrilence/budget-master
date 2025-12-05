import { Button, DatePicker, Flex, Form, Input, InputNumber, Modal} from "antd"
import { useDispatch, useSelector } from "react-redux"
import { initialState, selectExpenses, selectInitialValues, selectIsOpenModal, selectIsUpdateExpense, selectTransactions, setExpenses, setinitialValues, setIsOpenModal, setIsUpdateExpense } from "../expenses-slice";
import type { FormProps } from "antd";
import dayjs from 'dayjs';
import type { InfoExpense } from "../../../shared/types";
import { startTransition, useActionState, useCallback, useState } from "react";
import { createExpenses, defaultState } from "../api/createExpenses";
import { selectUser } from "../../auth-slice";
import { regExpression } from "../../../shared/validation";
import { notifyName } from "../../../shared/toasts";
import { updateExpenses } from "../api/updateExpense";
import CategorySelect from "../../CategorySelect";
import styles from './styles.module.css'

const ModalExpenses = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isOpenModal = useSelector(selectIsOpenModal);
    const transactions = useSelector(selectTransactions);
    const isUpdateExpense = useSelector(selectIsUpdateExpense);
    const user = useSelector(selectUser);
    const expenses = useSelector(selectExpenses);
    const initialValues = useSelector(selectInitialValues);

    const [name, setName] = useState('');
    const [state, submitAction, isPending] = useActionState(async (prevState: InfoExpense | undefined, values: InfoExpense) => {
        if (!user) {
            throw new Error('Пользователь не авторизован');
        } 
        if (!prevState) {
            console.warn("prevState is undefined in useActionState, using defaultState");
            return defaultState;
        }
        if(isUpdateExpense) {
            if(initialValues && initialValues.id && initialValues.user_id) {
                const result = await updateExpenses(initialValues.id, initialValues.user_id, prevState, values)
                if(result && result.error) { 
                        return { 
                            ...prevState,
                            error: result.error,
                        }}
                    if (result) {
                        const newExpenses = expenses.map(expense => {
                            if(expense.id === result.id) {
                                return {
                            ...expense, ...result}
                            } else {
                                return expense
                            }}
                            );
                        dispatch(setExpenses(newExpenses));
                    } else {
                        return { 
                            ...prevState,
                            error: 'Не удалось редактировать запись',
                        }
                    }
            }
        } else {
            const result = await createExpenses(user)(prevState, values)  
                if(result && result.error) { 
                    return { 
                        ...prevState,
                        error: result.error,
                    }}
                if (result) {
                    dispatch(setExpenses([...expenses, result]));
                } else {
                    return { 
                        ...prevState,
                        error: 'Не удалось создать запись',
                    }
                }
        }
                }, defaultState);

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        let newName = event.target.value;
        if(!regExpression.test(newName.trim())) {
            notifyName();
            setName('')
        } else {
            newName = newName[0].toUpperCase() + newName.slice(1);
            setName(newName)
        }
    }, []);


    const onFinish: FormProps<InfoExpense>['onFinish'] = (values) => {
          const data = {...values, date: dayjs(values.date).format('DD.MM.YYYY')}
           startTransition(() => {
                submitAction(data);
            });
           dispatch(setIsOpenModal(false));
           dispatch(setIsUpdateExpense(false));
           dispatch(setinitialValues(initialState.initialValues));
        };
        
    const dateFormatList = ['DD.MM.YYYY'];


    return (
      <Modal
        title="Расходы"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpenModal && transactions === 'Расходы'}
        onCancel={() => dispatch(setIsOpenModal(false))}
        footer={
            <Button key="submit" type="primary"
            htmlType="submit" onClick={() => form.submit()}
            loading={isPending}>{isUpdateExpense ? 'Редактировать' : 'Добавить'}
            </Button>
            }
            className={styles.modal}
        >
            <Form
                form={form}
                autoComplete="off"
                initialValues={{...initialValues, date: initialValues.date ? dayjs(initialValues.date, 'DD.MM.YYYY') : null }} 
                onFinish={onFinish}>
                <Form.Item 
                layout="vertical"
                name="name" 
                label="Название: " 
                required
                style={{ marginBottom: '10px' }}>
                    <Input 
                    value={name}
                    onChange={handleNameChange}/>
                </Form.Item>
                <CategorySelect/>
                <Flex justify="center" gap={20}>
                    <Form.Item 
                        layout="vertical"
                        name="amount" 
                        label="Сумма: " 
                        required
                        style={{ marginBottom: '10px'}}>
                        <InputNumber
                            min={0}
                            precision={2}
                            placeholder="0.00"
                            style={{width: 150}}
                        />
                    </Form.Item>
                    <Form.Item layout="vertical" name="date" label="Дата: " style={{ marginBottom: '10px' }}>
                        <DatePicker
                            format={dateFormatList}
                            required/>
                    </Form.Item>
                </Flex>
            </Form>
            {state!.error && <div>{state!.error}</div>}
        </Modal>  
    )
}

export default ModalExpenses