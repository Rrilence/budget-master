import { Flex, Progress, Typography } from "antd"
import { useSelector } from "react-redux"
import { selectGoals } from "../Goals/goals-slice"
import dayjs from 'dayjs';
import styles from './styles.module.css'

const {Text} = Typography;

const DashGoals = () => {

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

    const goals = useSelector(selectGoals);

    return (
        <>
            <Text strong className={styles.goal}>Цели накоплений</Text>
            <Flex wrap gap={25} justify="center" style={{margin: '20px 0'}}>
                {goals.map((goal) => {
                    const iconColor = goal.icon ? colorMap[goal.icon] || "rgba(24, 237, 245, 0.98)" : null;
                    return (
                        <Flex vertical align="center" gap={10}>
                            <Progress 
                            type="circle"
                            size={80}
                            percent={ goal.amount > 0
                                ? Number((goal.amount / goal.totalAmount * 100).toFixed(2))
                                : 0
                            }
                            strokeColor={
                                (goal.totalAmount > goal.amount && dayjs(goal.date, 'DD.MM.YYYY').isAfter(dayjs())) ? (iconColor || '#1890ff') 
                                : dayjs(goal.date, 'DD.MM.YYYY').isBefore(dayjs()) 
                                ? '#ac1010ff' 
                                : '#1ac017ff'
                            }
                            />
                            <Text>{goal.name}</Text>
                        </Flex>

                    )
                })}
            </Flex>
        </>
    )
}

export default DashGoals