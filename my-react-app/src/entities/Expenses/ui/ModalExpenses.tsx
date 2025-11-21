import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { selectIsOpenModal, setIsOpenModal } from "../expenses-slice";
import type { FormProps } from "antd";
import dayjs from 'dayjs';
import type { InfoExpense } from "../../../shared/types";
import { startTransition, useActionState, useCallback, useState } from "react";
import { createExpenses, defaultState } from "../api/createExpenses";
import { selectUser } from "../../auth-slice";
import { regExpression } from "../../../shared/validation";
import { notifyNameExpense } from "../../../shared/toasts";

const ModalExpenses = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isOpenModal = useSelector(selectIsOpenModal);
    const user = useSelector(selectUser);

     const [name, setName] = useState('');
    const [state, submitAction, isPending] = useActionState(async (prevState: InfoExpense | undefined, values: InfoExpense) => {
        if (!user) {
            throw new Error('Пользователь не авторизован');
        } 
        if (!prevState) {
            console.warn("prevState is undefined in useActionState, using defaultState");
            return defaultState;
        }
        const result = await createExpenses(user)(prevState, values)  
            if(result && result.error) { 
                return { 
                    ...prevState,
                    error: result.error,
                }}
            if (result) {
                return { 
                    ...prevState,
                    user_id: result.user_id,
                    name: result.name,
                    category: result.category,
                    amount: result.amount,
                    date: result.date,
                    error: null,
                    // setExpensesState([...expensesState, result])
                }
            } else {
                return { 
                    ...prevState,
                    error: 'Не удалось создать запись',
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


    const onFinish: FormProps<InfoExpense>['onFinish'] = (values) => {
          const data = {...values, date: dayjs(values.date).format('DD.MM.YYYY')}
           startTransition(() => {
                submitAction(data);
            });
           dispatch(setIsOpenModal(false));
           form.resetFields();
        };
        
    const initialValues = {
        date: dayjs(),
    }
    const dateFormatList = ['DD.MM.YYYY'];


    return (
      <Modal
        title="Расходы"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpenModal}
        onCancel={() => dispatch(setIsOpenModal(false))}
        footer={
            <Button key="submit" type="primary"
            htmlType="submit" onClick={() => form.submit()}
            loading={isPending}>
            Добавить расход
            </Button>
            }
        style={{maxWidth: 400}}>
            <Form
                form={form}
                autoComplete="off"
                initialValues={initialValues} 
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
                <Form.Item required name="category" label="Выберите категорию: " style={{ marginBottom: '10px' }}>
                    <Select
                    options={[
                        {label: (<span><HomeFilled style={{ marginRight: 8, color: '#cc1616ff'}} />Дом</span>),
                        value: 'дом'},
                        {label: (<span><ShoppingCartOutlined style={{ marginRight: 8, color: '#2656e9ff' }} />Продукты</span>),
                         value: 'продукты'},
                        {label: (<span><MedicineBoxFilled style={{ marginRight: 8, color: '#14bc14ff' }} />Здоровье</span>),
                         value: 'здоровье'},
                        {label: (<span><SkinFilled style={{ marginRight: 8, color: '#7a068fff' }} />Одежда</span>),
                        value: 'одежда'},
                        {label: (<span><TruckFilled style={{ marginRight: 8, color: '#e07314ff' }} />Транспорт</span>),
                        value: 'транспорт'},
                        {label: (<span><HeartFilled style={{ marginRight: 8, color: '#25eeb2ff' }} />Спорт</span>),
                        value: 'спорт'},
                        {label: (<span><SmileFilled style={{ marginRight: 8, color: '#e7f73aff' }} />Досуг</span>),
                        value: 'досуг'},
                        {label: (<span><GlobalOutlined style={{ marginRight: 8, color: 'rgba(63, 175, 236, 1)' }} />Путешествия</span>),
                        value: 'путешествия'},
                        {label: (<span><CarFilled style={{ marginRight: 8, color: '#9025eeff' }} />Машина</span>),
                        value: 'машина'},
                        {label: (<span><CoffeeOutlined style={{ marginRight: 8, color: '#6a390fff' }} />Кафе</span>),
                        value: 'кафе'},
                        {label: (<span><WifiOutlined style={{ marginRight: 8, color: '#96e319ff' }} />Связь</span>),
                        value: 'связь'},
                        {label: (<span><QqOutlined style={{ marginRight: 8, color: '#281c13ff'  }} />Домашние животные</span>),
                        value: 'домашние животные'},
                        {label: (<span><GiftFilled style={{ marginRight: 8, color: '#c828aaff' }} />Подарки</span>),
                        value: 'подарки'},
                        {label: (<span><LoadingOutlined style={{ marginRight: 8, color: '#5aececff' }} />Другое</span>),
                        value: 'другое'},
                        ]} />
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

export default ModalExpenses