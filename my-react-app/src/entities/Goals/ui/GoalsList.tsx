import {  useDispatch, useSelector } from "react-redux"
import { selectGoals, setGoals, setinitialValues, setIsOpenModal, setIsUpdateGoal, setUpdateGoalId} from "../goals-slice";
import { Button, Dropdown, Flex, Progress, Typography } from "antd";
import { AlignCenterOutlined, CaretDownOutlined, DeleteOutlined, PlusCircleTwoTone, SignatureOutlined } from "@ant-design/icons";
import type { InfoGoal } from "../../../shared/types";
import type { MenuProps } from "antd/lib";
import AddAmount from "./AddAmount";
import { useCallback, useState } from "react";
import type { MenuInfo } from "rc-menu/lib/interface";
import { deleteGoals } from "../api/deleteGoal";
import dayjs from 'dayjs';
import { formatAmount } from "../../../shared/formatting";

const {Text} = Typography;

const GoalsList = () => {

    const dispatch = useDispatch();
    const goals = useSelector(selectGoals);
    const [openGoalId, setOpenGoalId] = useState<string | null>(null);
    const [isPredict, setIsPredict] = useState<Record<string, boolean>>({});

    const togglePrediction = (goalId: string) => {
        setIsPredict(prev => ({
            ...prev,
            [goalId]: !prev[goalId]
        }));
    };

    const iconMap: Record<string, string> = {
        'Отпуск': 'fa-plane',
        'Дом': 'fa-home',
        'Ремонт': 'fa-wrench',
        'Здоровье': 'fa-heartbeat',
        'Образование': 'fa-graduation-cap',
        'Семья': 'fa-child',
        'Бизнес': 'fa-university',
        'Машина': 'fa-car',
        'Велосипед': 'fa-bicycle',
        'Мотоцикл': 'fa-motorcycle',
        'Праздник': 'fa-birthday-cake',
        'Книги': 'fa-book',
        'Фото': 'fa-camera-retro',
        'Украшения': 'fa-diamond',
        'Компьютер': 'fa-desktop',
        'Телефон': 'fa-mobile',
        'Искусство': 'fa-paint-brush',
        'Шоппинг': 'fa-shopping-bag',
        'Животные': 'fa-paw',
        'Любовь': 'fa-heart',
    };

    const colorMap: Record<string, string> = {
        'Отпуск': "rgba(13, 7, 125, 0.82)",
        'Дом': "rgba(226, 6, 6, 0.82)",
        'Ремонт': "rgba(153, 163, 4, 0.82)",
        'Здоровье': 'rgba(125, 237, 56, 0.92)',
        'Образование': "rgba(40, 130, 190, 0.75)",
        'Семья': "rgba(232, 203, 11, 0.98)",
        'Бизнес': "rgba(28, 139, 154, 0.98)",
        'Машина': "rgba(35, 122, 39, 0.98)",
        'Велосипед': "rgba(243, 141, 17, 0.98)",
        'Мотоцикл': "rgba(54, 238, 177, 0.98)",
        'Праздник': "rgba(243, 68, 205, 0.98)",
        'Книги': "rgba(15, 88, 60, 0.98)",
        'Фото': "rgba(71, 8, 143, 0.98)",
        'Украшения': "rgba(24, 237, 245, 0.98)",
        'Компьютер': "rgba(102, 8, 8, 0.98)",
        'Телефон': "rgba(152, 157, 59, 0.98)",
        'Искусство': "rgba(137, 11, 168, 0.98)",
        'Шоппинг': "rgba(212, 90, 14, 0.98)",
        'Животные': "rgba(91, 39, 19, 0.98)",
        'Любовь': "rgba(242, 21, 102, 1)",
    };

    const predict = useCallback((goal: InfoGoal) => {
            const neededAmount = goal.totalAmount - goal.amount;
            const daysLeft = dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day');
            const dailyNeed = neededAmount / Math.max(daysLeft, 1);
            const monthlyNeed = dailyNeed * 30;
            return {
                dailyNeed,
                monthlyNeed,
            }
    }, [])

    const handleMenuClick = (info: MenuInfo, goal: InfoGoal) => {
        if(info.key === '1') {
            if(goal.id && goal.user_id) {  
                dispatch(setUpdateGoalId(goal.id));
                dispatch(setIsOpenModal(true));
                dispatch(setIsUpdateGoal(true));
                dispatch(setinitialValues({
                    id: goal.id,
                    user_id: goal.user_id,
                    name: goal.name,
                    totalAmount: goal.totalAmount,
                    amount: goal.amount,
                    date: dayjs(goal.date, 'DD.MM.YYYY').format('DD.MM.YYYY'),
                    icon: goal.icon,
                }));
            }
        }
        if(info.key === '2') {
            deleteGoals(goal.id!, goal.user_id!)
            .then(() => {
                const updateGoals = goals.filter(item => item.id !== goal.id);
                dispatch(setGoals(updateGoals));
            })
        }
    }

    const items: MenuProps['items'] = [
        {
            label: 'Редактировать',
            key: '1',
            icon: <SignatureOutlined />,
        },
        {
            label: 'Удалить',
            key: '2',
            icon: <DeleteOutlined />,
        },
        ];

    const menuProps = (goal: InfoGoal): MenuProps => {
        return {
            items,
            onClick: (info) => handleMenuClick(info, goal),
        }
    };

    const handleOpenModal = (id: string) => {
        setOpenGoalId(id);
    }

    return (
        <Flex justify="center" gap={50} wrap style={{paddingTop: 20}}>
            {goals.map((goal) => {
                const prediction = predict(goal);
                const iconClass = goal.icon ? iconMap[goal.icon] || 'fa-star' : null;
                const iconColor = goal.icon ? colorMap[goal.icon] || "rgba(24, 237, 245, 0.98)" : null;
                return (
                    <Flex
                    key={goal.id}
                    vertical
                    align="start"
                    style={{width: 300}}
                    >
                        <Flex justify="space-between" style={{ width: '100%' }}>
                            <Flex align="center">
                                {iconClass && iconColor &&
                                <i className={`fa ${iconClass}`}
                                aria-hidden="true" 
                                style={{color: `${iconColor}`, marginRight: 10}}></i>
                                }
                                <Text strong>{goal.name}</Text>    
                            </Flex>
                            <Dropdown menu={menuProps(goal)} placement="bottomRight" >
                                <Button type="text" icon={<AlignCenterOutlined />} style={{textShadow: '0px 0px 3px rgba(255, 255, 255, 1)', margin: 0}} />
                            </Dropdown>
                        </Flex>
                        {dayjs(goal.date, 'DD.MM.YYYY').isBefore(dayjs()) 
                        ? <Text strong style={{color: '#d31212ff', margin: '10px 0'}}> Просрочено</Text>
                        : dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day') < 8 
                        ? <Flex justify="space-between" style={{width: '100%'}}>
                            <Flex vertical>
                                <Text style={{fontSize: 14}}>Дата достижения цели:</Text>
                                <Text style={{fontSize: 14}}>{goal.date || 0}</Text>
                            </Flex>
                            <Flex vertical align="end">
                                <Text style={{fontSize: 14, color: '#d31212ff'}}>Осталось:</Text>
                                {dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day') < 5
                                ? <Text style={{fontSize: 14, color: '#d31212ff'}}>{dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day')} дня</Text>
                                : <Text style={{fontSize: 14, color: '#d31212ff'}}>{dayjs(goal.date, 'DD.MM.YYYY').diff(dayjs(), 'day')} дней</Text>
                                }
                            </Flex>
                        </Flex>
                        : <Flex vertical>
                                <Text style={{fontSize: 14}}>Дата достижения цели:</Text>
                                <Text style={{fontSize: 14}}>{goal.date || 0}</Text>
                        </Flex>
                        }
                        <Progress
                        percentPosition={{align: 'end', type: 'outer' }}
                        percent={ goal.amount > 0
                            ? Number((goal.amount / goal.totalAmount * 100).toFixed(2))
                            : 0
                        }
                        status="normal"
                        strokeColor={
                            (goal.totalAmount > goal.amount && dayjs(goal.date, 'DD.MM.YYYY').isAfter(dayjs())) ? (iconColor || '#1890ff') 
                            : dayjs(goal.date, 'DD.MM.YYYY').isBefore(dayjs()) 
                            ? '#ac1010ff' 
                            : '#1ac017ff'
                        }
                        style={{marginBottom: 6}}
                        />
                        {(goal.totalAmount > goal.amount)
                        ? <Flex justify="space-between" style={{ width: '100%' }}>
                            <Flex>
                                <Flex vertical>
                                    <Text strong>Накоплено:</Text>
                                    <Text>{formatAmount(goal.amount) || 0}</Text>
                                </Flex>
                                <PlusCircleTwoTone 
                                style={{marginLeft: 15, fontSize: 18, cursor: "pointer"}}
                                onClick={() => handleOpenModal(goal.id!)}
                                />
                                {<AddAmount id={goal.id!} user_id={goal.user_id!} amount={goal.amount}
                                isOpen={openGoalId === goal.id}
                                onClose={() => setOpenGoalId(null)}
                                />}
                            </Flex>
                            <Flex vertical align="end">
                                <Text strong>Цель:</Text>
                                <Text>{formatAmount(goal.totalAmount)}</Text>
                            </Flex>
                        </Flex>
                        : <Text strong style={{color: '#1ac017ff'}}>Цель достигнута: {formatAmount(goal.totalAmount)}</Text>
                        }
                        <Flex vertical style={{marginTop: 10, fontSize: 14}}>
                            <Flex align="center" gap={12}>
                                <Text strong style={{color: '#3763c9ff', fontSize: 14}}>Прогноз и рекомендации:</Text>
                                <CaretDownOutlined
                                style={{cursor: 'pointer'}}
                                onClick={() => togglePrediction(goal.id!)}/>
                            </Flex>
                            {isPredict[goal.id!] && 
                            <Flex vertical style={{ marginTop: 10}}>
                                <Text style={{fontSize: 14}}>Чтобы успеть к {goal.date}, вам нужно откладывать:</Text>
                                <ul style={{ margin: '5px 0 0 -15px'}}>
                                    <li><Text strong>{formatAmount(Number(prediction.dailyNeed.toFixed(2)))} в день</Text></li>
                                    <li><Text strong>{formatAmount(Number(prediction.monthlyNeed.toFixed(0)))} в месяц</Text></li>
                                    {prediction.dailyNeed > 2000 && (
                                    <li>Рассмотрите возможность увеличить доход или перенести срок</li>
                                )}
                            </ul>
                            </Flex>}
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )

}

export default GoalsList