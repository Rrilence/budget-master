import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { initialState, selectIncomes, selectInitialValues, selectIsUpdateIncome, setIncomes, setinitialValues, setIsUpdateIncome } from "../incomes-slice";
import { selectUser } from "../../auth-slice";
import { startTransition, useActionState, useCallback, useState } from "react";
import type { InfoIncome } from "../../../shared/types";
import { type FormProps } from "antd/lib";
import { notifyNameExpense } from "../../../shared/toasts";
import { regExpression } from "../../../shared/validation";
import dayjs from 'dayjs';
import { createIncomes, defaultState } from "../api/createIncomes";
import { updateIncome } from "../api/updateIncome";
import { selectIsOpenModal, selectTransactions, setIsOpenModal } from "../../Expenses/expenses-slice";


const ModalIncomes = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isOpenModal = useSelector(selectIsOpenModal);
    const transactions = useSelector(selectTransactions);
    const isUpdateIncome = useSelector(selectIsUpdateIncome);
    const user = useSelector(selectUser);
    const incomes = useSelector(selectIncomes);
    const initialValues = useSelector(selectInitialValues);

    const [name, setName] = useState('');
    const [state, submitAction, isPending] = useActionState(async (prevState: InfoIncome | undefined, values: InfoIncome) => {
        if (!user) {
            throw new Error('Пользователь не авторизован');
        } 
        if (!prevState) {
            console.warn("prevState is undefined in useActionState, using defaultState");
            return defaultState;
        }
        if(isUpdateIncome) {
            if(initialValues && initialValues.id && initialValues.user_id) {
                const result = await updateIncome(initialValues.id, initialValues.user_id, prevState, values)
                if(result && result.error) { 
                        return { 
                            ...prevState,
                            error: result.error,
                        }}
                    if (result) {
                        const newIncomes = incomes.map(income => {
                            if(income.id === result.id) {
                                return {
                            ...income, ...result}
                            } else {
                                return income
                            }}
                            );
                        dispatch(setIncomes(newIncomes));
                    } else {
                        return { 
                            ...prevState,
                            error: 'Не удалось редактировать запись',
                        }
                    }
            }
        } else {
            const result = await createIncomes(user)(prevState, values)  
                if(result && result.error) { 
                    return { 
                        ...prevState,
                        error: result.error,
                    }}
                if (result) {
                    dispatch(setIncomes([...incomes, result]));
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
            notifyNameExpense();
            setName('')
        } else {
            newName = newName[0].toUpperCase() + newName.slice(1);
            setName(newName)
        }
    }, []);


    const onFinish: FormProps<InfoIncome>['onFinish'] = (values) => {
          const data = {...values, date: dayjs(values.date).format('DD.MM.YYYY')}
           startTransition(() => {
                submitAction(data);
            });
           dispatch(setIsOpenModal(false));
           dispatch(setIsUpdateIncome(false));
           dispatch(setinitialValues(initialState.initialValues));
        };
        
    const dateFormatList = ['DD.MM.YYYY'];


    return (
      <Modal
        title="Доходы"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpenModal && transactions === 'Доходы'}
        onCancel={() => dispatch(setIsOpenModal(false))}
        footer={
            <Button key="submit" type="primary"
            htmlType="submit" onClick={() => form.submit()}
            loading={isPending}>{isUpdateIncome ? 'Редактировать' : 'Добавить'}
            </Button>
            }
        style={{maxWidth: 400}}>
            <Form
                form={form}
                autoComplete="off"
                initialValues={{...initialValues, date: initialValues.date ? dayjs(initialValues.date, 'DD.MM.YYYY') : null }} 
                onFinish={onFinish}>
                <Form.Item 
                name="name" 
                label="Название: " 
                required
                style={{ marginBottom: '10px' }}>
                    <Input 
                    value={name}
                    onChange={handleNameChange}/>
                </Form.Item>
                <Form.Item 
                    name="amount" 
                    label="Сумма: " 
                    required
                    style={{ marginBottom: '10px' }}>
                    <InputNumber
                        precision={2}
                        placeholder="0.00"
                    />
                </Form.Item>
                <Form.Item name="date" label="Дата: " style={{ marginBottom: '10px' }}>
                    <DatePicker
                        format={dateFormatList}
                        required/>
                </Form.Item>
            </Form>
            {state!.error && <div>{state!.error}</div>}
        </Modal>  
    )
}

export default ModalIncomes