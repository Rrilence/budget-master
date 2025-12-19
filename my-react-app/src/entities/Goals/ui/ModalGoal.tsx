import { Button, DatePicker, Radio, Form, Input, InputNumber, Modal, Flex } from "antd";
import { startTransition, useActionState, useCallback, useState } from "react";
import type { InfoGoal } from "../../../shared/types";
import { useDispatch, useSelector } from "react-redux";
import { initialState, selectGoals, selectInitialValues, selectIsOpenModal, selectIsUpdateGoal, setGoals, setinitialValues, setIsOpenModal, setIsUpdateGoal, setUpdateGoalId } from "../goals-slice";
import dayjs from 'dayjs';
import { regExpression } from "../../../shared/validation";
import { notifyName } from "../../../shared/toasts";
import { selectUser } from "../../auth-slice";
import { createGoal, defaultState } from "../api/createGoal";
import type { FormProps } from "antd/lib";
import { updateGoal } from "../api/updateGoal";

const ModalGoal = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isOpenModal = useSelector(selectIsOpenModal);
    const isUpdateGoal = useSelector(selectIsUpdateGoal);
    const initialValues = useSelector(selectInitialValues);
    const user = useSelector(selectUser);
    const goals = useSelector(selectGoals);

    const [name, setName] = useState('');

    const [state, submitAction, isPending] = useActionState(async (prevState: InfoGoal | undefined, values: InfoGoal) => {
        if (!user) {
            throw new Error('Пользователь не авторизован');
        } 
        if (!prevState) {
            console.warn("prevState is undefined in useActionState, using defaultState");
            return defaultState;
        }
        if(isUpdateGoal)  {
            if(initialValues && initialValues.id && initialValues.user_id) {
                const result = await updateGoal(initialValues.id, initialValues.user_id, values)
                if(result && result.error) { 
                    return { 
                        ...prevState,
                        error: result.error,
                    }}
                    if (result) {
                        const newGoals = goals.map(goal => {
                            if(goal.id === result.id) {
                                return {
                            ...goal, ...result}
                            } else {
                                return goal
                            }}
                            );
                        dispatch(setGoals(newGoals));
                    } else {
                        return { 
                            ...prevState,
                            error: 'Не удалось редактировать запись',
                        }
                    }
            }
        } else {
            const result = await createGoal(user)(prevState, values)  
                if(result && result.error) { 
                    return { 
                        ...prevState,
                        error: result.error,
                    }}
                if (result) {
                    dispatch(setGoals([...goals, result]));
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

    const onCancel = () => {
        dispatch(setIsOpenModal(false));
        dispatch(setIsUpdateGoal(false));
        dispatch(setUpdateGoalId(''));
        dispatch(setinitialValues(initialState.initialValues));
    }

    const onFinish: FormProps<InfoGoal>['onFinish'] = (values) => {
              const data = {...values, date: dayjs(values.date).format('DD.MM.YYYY')}
               startTransition(() => {
                    submitAction(data);
                });
               dispatch(setIsOpenModal(false));
               dispatch(setIsUpdateGoal(false));
               dispatch(setUpdateGoalId(''));
               dispatch(setinitialValues(initialState.initialValues));
            };
    
    const dateFormatList = ['DD.MM.YYYY'];

    return (
        <Modal
        title="Цель"
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
            >{isUpdateGoal ? 'Редактировать' : 'Добавить'}
            </Button>
            }>
            <Form
            form={form}
            autoComplete="off"
            initialValues={{...initialValues, date: initialValues.date ? dayjs(initialValues.date, 'DD.MM.YYYY') : null }} 
            onFinish={onFinish}
            >
                <Form.Item
                name='name'
                layout="vertical"
                label="Название: " 
                rules={[
                    { required: true, message: 'Пожалуйста, введите название' },
                    { 
                    pattern: regExpression, 
                    message: 'Введите название на русском языке' 
                    },
                ]}
                style={{ marginBottom: '10px' }}
                >
                    <Input
                    value={name}
                    onChange={handleNameChange}/>
                </Form.Item>
                <Form.Item 
                name='icon'
                layout="vertical"
                label="Выберите иконку: " 
                style={{ marginBottom: '10px' }}>
                    <Radio.Group size="large">
                        <Flex gap={10} wrap justify="center">
                            <Radio.Button value='Отпуск' style={{borderRadius: '50%'}}>
                                <i className="fa fa-plane" aria-hidden="true" style={{color: "rgba(13, 7, 125, 0.82)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Дом' style={{borderRadius: '50%'}}>
                                <i className="fa fa-home" aria-hidden="true" style={{color: "rgba(226, 6, 6, 0.82)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Ремонт' style={{borderRadius: '50%'}}>
                                <i className="fa fa-wrench" aria-hidden="true" style={{color: "rgba(153, 163, 4, 0.82)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Здоровье' style={{borderRadius: '50%'}}>
                                <i className="fa fa-heartbeat" aria-hidden="true" style={{color: "rgba(125, 237, 56, 0.92)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Образование' style={{borderRadius: '50%'}}>
                                <i className="fa fa-graduation-cap" aria-hidden="true" style={{color: "rgba(40, 130, 190, 0.75)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Семья' style={{borderRadius: '50%'}}>
                                <i className="fa fa-child" aria-hidden="true" style={{color: "rgba(232, 203, 11, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Бизнес' style={{borderRadius: '50%'}}>
                                <i className="fa fa-university" aria-hidden="true" style={{color: "rgba(28, 139, 154, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Машина' style={{borderRadius: '50%'}}>
                                <i className="fa fa-car" aria-hidden="true" style={{color: "rgba(35, 122, 39, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Велосипед' style={{borderRadius: '50%'}}>
                                <i className="fa fa-bicycle" aria-hidden="true" style={{color: "rgba(243, 141, 17, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Мотоцикл' style={{borderRadius: '50%'}}>
                                <i className="fa fa-motorcycle" aria-hidden="true" style={{color: "rgba(54, 238, 177, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Праздник' style={{borderRadius: '50%'}}>
                                <i className="fa fa-birthday-cake" aria-hidden="true" style={{color: "rgba(243, 68, 205, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Книги' style={{borderRadius: '50%'}}>
                                <i className="fa fa-book" aria-hidden="true" style={{color: "rgba(15, 88, 60, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Фото' style={{borderRadius: '50%'}}>
                                <i className="fa fa-camera-retro" aria-hidden="true" style={{color: "rgba(71, 8, 143, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Украшения' style={{borderRadius: '50%'}}>
                                <i className="fa fa-diamond" aria-hidden="true" style={{color: "rgba(24, 237, 245, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Компьютер' style={{borderRadius: '50%'}}>
                                <i className="fa fa-desktop" aria-hidden="true" style={{color: "rgba(102, 8, 8, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Телефон' style={{borderRadius: '50%'}}>
                                <i className="fa fa-mobile" aria-hidden="true" style={{color: "rgba(152, 157, 59, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Искусство' style={{borderRadius: '50%'}}>
                                <i className="fa fa-paint-brush" aria-hidden="true" style={{color: "rgba(137, 11, 168, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Шоппинг' style={{borderRadius: '50%'}}>
                                <i className="fa fa-shopping-bag" aria-hidden="true" style={{color: "rgba(212, 90, 14, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Животные' style={{borderRadius: '50%'}}>
                                <i className="fa fa-paw" aria-hidden="true" style={{color: "rgba(91, 39, 19, 0.98)"}}></i>
                            </Radio.Button>
                            <Radio.Button value='Любовь' style={{borderRadius: '50%'}}>
                                <i className="fa fa-heart" aria-hidden="true" style={{color: "rgba(242, 21, 102, 1)"}}></i>
                            </Radio.Button>
                        </Flex>
                    </Radio.Group>
                </Form.Item>
                <Flex wrap justify="space-around" style={{marginTop: 20}}>
                    <Form.Item 
                    layout="vertical"
                    name="totalAmount" 
                    label="Сумма: " 
                    rules={[
                        { required: true, message: 'Введите сумму' },
                        { type: 'number', min: 0.01, message: 'Сумма должна быть больше 0' },
                    ]}
                    style={{ marginBottom: '10px'}}>
                        <InputNumber
                        min={0.01}
                        precision={2}
                        placeholder="0.00"
                        style={{width: 150}}
                        />
                    </Form.Item>
                    <Form.Item layout="vertical" name="date" label="Дата достижения цели: " style={{ marginBottom: '10px' }}>
                        <DatePicker
                            format={dateFormatList}
                            required/>
                    </Form.Item>
                </Flex>
            </Form>
            {state!.error && <div style={{color: 'red'}}>{state!.error}</div>}
        </Modal>
    )

}

export default ModalGoal