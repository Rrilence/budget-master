import { Button, DatePicker, Form, InputNumber, Modal, Select, type FormProps } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { initialState, selectBudgets, selectInitialValues, selectIsOpenModal, selectIsUpdateBudget, setBudgets, setinitialValues, setIsOpenModal, setIsUpdateBudget, setInitialPeriod, selectInitialPeriod } from "../budget-slice";
import dayjs from 'dayjs';
import { startTransition, useActionState } from "react";
import CategorySelect from "../../CategorySelect";

import type { InfoBudget } from "../../../shared/types";
import { selectUser } from "../../auth-slice";
import { createBudget, defaultState } from "../api/createBudget";
import { updateBudgets } from "../api/updateBudget";
import { notifyErrorBudget } from "../../../shared/toasts";
import { formatWeek } from "../../../shared/formatting";

const { RangePicker } = DatePicker;


const ModalBudget = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isOpenModal = useSelector(selectIsOpenModal);
    const isUpdateBudget = useSelector(selectIsUpdateBudget);
    const budgets = useSelector(selectBudgets);
    const period = useSelector(selectInitialPeriod);
    const initialValues = useSelector(selectInitialValues);
    const user = useSelector(selectUser);

    const [state, submitAction, isPending] = useActionState(async (prevState: InfoBudget | undefined, values: InfoBudget) => {
            if (!user) {
                throw new Error('Пользователь не авторизован');
            } 
            if (!prevState) {
                console.warn("prevState is undefined in useActionState, using defaultState");
                return defaultState;
            }
            if(isUpdateBudget) {
                if(initialValues && initialValues.id && initialValues.user_id) {
                    const result = await updateBudgets(initialValues.id, initialValues.user_id, values)
                    if(result && result.error) { 
                            return { 
                                ...prevState,
                                error: result.error,
                            }}
                        if (result) {
                            const newBudgets = budgets.map(budget => {
                                if(budget.id === result.id) {
                                    return {
                                ...budget, ...result}
                                } else {
                                    return budget
                                }}
                                );
                            dispatch(setBudgets(newBudgets));
                        } else {
                            return { 
                                ...prevState,
                                error: 'Не удалось редактировать запись',
                            }
                        }
                }
            } 
            else {
                const result = await createBudget(user)(prevState, values)  
                    if(result && result.error) { 
                        return { 
                            ...prevState,
                            error: result.error,
                        }}
                    if (result) {
                        dispatch(setBudgets([...budgets, result]));
                    } else {
                        return { 
                            ...prevState,
                            error: 'Не удалось создать запись',
                        }
                    }
            }
                    }, defaultState);

    const onCancel = () => {
        dispatch(setIsOpenModal(false));
        dispatch(setIsUpdateBudget(false));
        dispatch(setinitialValues(initialState.initialValues));
    }

    const onFinish: FormProps<InfoBudget>['onFinish'] = (values) => {
        let budgetExists = false;
        if(!isUpdateBudget) {
            budgets.forEach(budget => {
                if(values.period === 'Свой период'
                    && budget.category === values.category 
                    && budget.period === values.period
                    && budget.dateStart === dayjs(values.dateStart).format('DD.MM.YYYY')
                    && budget.dateEnd === dayjs(values.dateEnd).format('DD.MM.YYYY')
                ) {
                    budgetExists = true;
                    notifyErrorBudget();
                    return 
                } else if (
                    budget.category === values.category 
                    && budget.period === values.period 
                    && budget.dateStart === dayjs(values.dateStart).startOf('month').format('DD.MM.YYYY')
                ) {
                    budgetExists = true;
                    notifyErrorBudget();
                    return 
                } else if (values.period === 'Ежегодно'
                    && budget.category === values.category 
                    && budget.period === values.period 
                    && budget.dateStart === dayjs(values.dateStart).startOf('year').format('DD.MM.YYYY')
                ) {
                    budgetExists = true;
                    notifyErrorBudget();
                    return 
                }
            })
            if (budgetExists) {
                return;
            }
        }
        let dateEnd = '';
        if(values.period === 'Еженедельно') {
            const datestartString = dayjs(values.dateStart).format('YYYY-WW');
            const dateStart = formatWeek(datestartString);
            dateEnd = dateStart.add(6, 'day').format('DD.MM.YYYY');
            const data = {...values, dateStart: dateStart.format('DD.MM.YYYY'), dateEnd: dateEnd}
            startTransition(() => {submitAction(data)});
        }
        else if(values.period === 'Ежемесячно') {
            const dateStart = dayjs(values.dateStart).startOf('month');
            dateEnd = dateStart.endOf('month').format('DD.MM.YYYY');
            const data = {...values, dateStart: dateStart.format('DD.MM.YYYY'), dateEnd: dateEnd}
            startTransition(() => {submitAction(data)});
        }
        else if(values.period === 'Ежеквартально') {
            const dateStart = dayjs(values.dateStart).startOf('month');
            dateEnd = dateStart.add(2, 'month').endOf('month').format('DD.MM.YYYY');
            const data = {...values, dateStart: dateStart.format('DD.MM.YYYY'), dateEnd: dateEnd}
            startTransition(() => {submitAction(data)});
        }
        else if(values.period === 'Ежегодно') { 
            const dateStart = dayjs(values.dateStart).startOf('year');
            dateEnd = dateStart.endOf('year').format('DD.MM.YYYY');
            const data = {...values, dateStart: dateStart.format('DD.MM.YYYY'), dateEnd: dateEnd}
            startTransition(() => {submitAction(data)});;
        }
        else if(values.period === 'Свой период') 
            { if(values.dateArr && values.dateArr.length >= 2) {
                const dateStartOwn = dayjs(values.dateArr[0]).format('DD.MM.YYYY');
                dateEnd = dayjs(values.dateArr[1]).format('DD.MM.YYYY');
                const data = {...values, dateStart: dateStartOwn, dateEnd: dateEnd}
                startTransition(() => {submitAction(data)});
            }
        }
        dispatch(setIsOpenModal(false));
        dispatch(setIsUpdateBudget(false));
        dispatch(setinitialValues(initialState.initialValues));
        };
            
    const dateFormatList = ['DD.MM.YYYY'];


    return (
        <Modal
        title="Детали бюджета"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpenModal}
        onCancel={onCancel}
        width={{
          xs: '60%',
          sm: '50%',
          md: '40%',
          xl: '30%',
        }}
        footer={
            <Button key="submit" type="primary"
            htmlType="submit" onClick={() => form.submit()}
            loading={isPending}
            >{isUpdateBudget ? 'Редактировать' : 'Добавить'}
            </Button>
            }
        >
            <Form
            form={form}
            autoComplete="off"
            initialValues={{
                ...initialValues, 
                dateStart: initialValues.dateStart ? dayjs(initialValues.dateStart, dateFormatList) : null,
                dateArr: initialValues.dateArr ? [dayjs(initialValues.dateArr[0]), dayjs(initialValues.dateArr[1])] : null 
             }} 
            onFinish={onFinish}>
                    <CategorySelect/>
                <Form.Item 
                    name="amount" 
                    layout="vertical"
                    label="Лимит, руб: " 
                    required
                    style={{ marginBottom: '10px' }}>
                    <InputNumber
                        precision={2}
                        placeholder="0.00"
                        style={{width: '100%'}}
                    />
                </Form.Item>
                <Form.Item name="period" layout="vertical" label="Выберите период: " required>
                    <Select
                    options={[
                        {label: 'Еженедельно', value: 'Еженедельно'},
                        {label: 'Ежемесячно', value: 'Ежемесячно'},
                        {label: 'Ежеквартально', value: 'Ежеквартально'},
                        {label: 'Ежегодно', value: 'Ежегодно'},
                        {label: 'Задать свой период', value: 'Свой период'},
                    ]}
                    onChange={(value) => dispatch(setInitialPeriod(value))}
                    />
                </Form.Item>
                    {period === 'Еженедельно' && (
                        <Form.Item
                        name="dateStart"
                        layout="vertical"
                        label="Начало периода: "
                        rules={[{ required: true, message: 'Пожалуйста, выберите начало периода!' }]}>
                            <DatePicker
                            required
                            picker="week"
                            style={{width: '100%'}}
                            />
                        </Form.Item>
                    )
                    }
                    {period === 'Ежемесячно' && (
                        <Form.Item
                        name="dateStart"
                        layout="vertical"
                        label="Начало периода: "
                        rules={[{ required: true, message: 'Пожалуйста, выберите начало периода!' }]}>
                            <DatePicker
                            required
                            picker="month"
                            style={{width: '100%'}}
                            />
                        </Form.Item>
                    )
                    }
                    {period === 'Ежеквартально' && (
                        <Form.Item
                        name="dateStart"
                        layout="vertical"
                        label="Начало периода: "
                        rules={[{ required: true, message: 'Пожалуйста, выберите начало периода!' }]}>
                            <DatePicker
                            required
                            picker="quarter"
                            style={{width: '100%'}}
                            />
                        </Form.Item>
                    )
                    }
                    {period === 'Ежегодно' && (
                        <Form.Item
                        name="dateStart"
                        layout="vertical"
                        label="Начало периода: "
                        rules={[{ required: true, message: 'Пожалуйста, выберите начало периода!' }]}>
                            <DatePicker
                            required
                            picker="year"
                            style={{width: '100%'}}
                            />
                        </Form.Item>
                    )
                    }
                    {period === 'Свой период' && (
                        <Form.Item
                        name="dateArr"
                        rules={[{ required: true, message: 'Пожалуйста, выберите период!' }]}>
                            <RangePicker
                            format={dateFormatList}
                            required
                            />
                        </Form.Item>
                    )
                    }
            </Form>
            {state!.error && <div>{state!.error}</div>}
        </Modal>
    )
}

export default ModalBudget