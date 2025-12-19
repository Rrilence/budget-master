import { useDispatch, useSelector } from "react-redux"
import { selectBudgets, selectDate, selectPeriod, setBudgets, setTotalAmount } from "../budget-slice"
import { Button, Dropdown, Flex, Progress } from "antd";
import { selectExpenses } from "../../Expenses/expenses-slice";
import { useEffect, useState } from "react";
import { AlignCenterOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import styles from './styles.module.css'
import { deleteBudgets } from "../api/deleteBudget";
import type { MenuInfo } from "rc-menu/lib/interface";
import type { InfoBudget } from "../../../shared/types";
import BudgetDescription from "./BudgetDescription";
import dayjs from 'dayjs';
import useBudget from "../../../shared/useBudget";
import { formatAmount } from "../../../shared/formatting";

const BudgetList = () => {

    const dispatch = useDispatch();
    const budgets = useSelector(selectBudgets);
    const expenses = useSelector(selectExpenses);
    const period = useSelector(selectPeriod);
    const dateDay = useSelector(selectDate);
    
    const [filteredBudgets, setFilteredBudgets] = useState<InfoBudget[]>(budgets);
    const [openBudgetId, setOpenBudgetId] = useState<string | null>(null);

    const expensesByCategory = useBudget(budgets, expenses);

    const handleMenuClick: (info: MenuInfo, budget: InfoBudget) => void = (info, budget) => {
        if(info.key === '1') {
            if(budget.id && budget.user_id) {  
                setOpenBudgetId(budget.id);
            }
        }
        if(info.key === '2') {
            deleteBudgets(budget.id!, budget.user_id!)
            .then(() => {
                const updateBudgets = budgets.filter(item => item.id !== budget.id);
                dispatch(setBudgets(updateBudgets));
            })
        }
    };

    const items: MenuProps['items'] = [
    {
        label: 'Детали',
        key: '1',
        icon: <FileSearchOutlined />,
    },
    {
        label: 'Удалить',
        key: '2',
        icon: <DeleteOutlined />,
    },
    ];

    const menuProps = (budget: InfoBudget): MenuProps => {
        return {
            items,
            onClick: (info) => handleMenuClick(info, budget),
        }
        };
        
    useEffect(() => {
        let filterItems:InfoBudget[] = budgets;
        let sum = 0;
        if(period === 'Еженедельно') {
            filterItems = budgets.filter(budget => budget.period === period)
            if(dateDay) {
                filterItems = filterItems.filter(budget => budget.dateStart === dateDay)
            }
        } else if (period === 'Ежемесячно') {
            budgets.filter(budget => budget.period === period)
            filterItems = budgets.filter(budget => budget.period === period)
            if(dateDay) {
                filterItems = filterItems.filter(budget => budget.dateStart === dateDay)
            }
        } else if (period === 'Ежеквартально') {
            budgets.filter(budget => budget.period === period)
            filterItems = budgets.filter(budget => budget.period === period)
            if(dateDay) {
                filterItems = filterItems.filter(budget => budget.dateStart === dateDay)
            }
        } else if (period === 'Ежегодно') {
            budgets.filter(budget => budget.period === period)
            filterItems = budgets.filter(budget => budget.period === period)
            if(dateDay) {
                filterItems = filterItems.filter(budget => budget.dateStart === dateDay)
            }
        } 
        else if (period === 'Свой период') {
            filterItems = budgets;
            if(dateDay) {
                filterItems = filterItems.filter(budget => dayjs(budget.dateStart, 'DD.MM.YYYY') <= dayjs(dateDay, 'DD.MM.YYYY') && dayjs(budget.dateEnd, 'DD.MM.YYYY') >= dayjs(dateDay, 'DD.MM.YYYY'))  
            }
        } 
        filterItems.forEach(item => sum += item.amount);
        setFilteredBudgets(filterItems);
        dispatch(setTotalAmount(sum))
    }, [budgets, period, dateDay, dispatch])

    return (
        <Flex
        justify="center" gap={30} wrap 
        style={{margin: '30px 0 60px 30px', paddingBottom: 50}}>
            {filteredBudgets.map((budget) => {
                const spentAmount = expensesByCategory[budget.id!]?.[budget.category] || 0;
            return (
                <Flex 
                key={budget.id} 
                vertical
                align="start"
                style={{width: 300}}
                >
                    <Flex justify="space-between" style={{width: '100%'}}>
                        <div>
                            <p style={{fontWeight: 'bold'}}>{budget.category}</p>
                            <p>{formatAmount(budget.amount)}</p>
                        </div>
                        <Dropdown menu={menuProps(budget)} placement="bottomRight" className={styles.button_menu} >
                            <Button type="text" icon={<AlignCenterOutlined />} style={{textShadow: '0px 0px 3px rgba(255, 255, 255, 1)'}} />
                        </Dropdown>
                        <BudgetDescription 
                        budget={budget}
                        isOpen={openBudgetId === budget.id}
                        onClose={() => setOpenBudgetId(null)}
                        />
                    </Flex>
                    <Progress
                        percentPosition={{align: 'end', type: 'outer' }}
                        percent={
                        budget.amount > 0
                            ? Math.round(spentAmount / budget.amount * 100)
                            : 0
                        }
                        status="normal"
                        strokeColor={
                            budget.amount > spentAmount ?
                            budget.category === 'Дом' ? { from: '#f29e9eff', to: '#cc1616ff' } :
                            budget.category === 'Продукты' ? { from: '#96aae5ff', to: '#2656e9ff' } :
                            budget.category === 'Здоровье' ? { from: '#98f298ff', to: '#14bc14ff' } :
                            budget.category === 'Одежда' ? { from: '#eb9af9ff', to: '#7a068fff' } :
                            budget.category === 'Транспорт' ? { from: '#f6b781ff', to: '#e07314ff' } :
                            budget.category === 'Спорт' ? { from: '#acf3deff', to: '#25eeb2ff' } :
                            budget.category === 'Досуг' ? { from: '#e4eaa1ff', to: '#e7f73aff' } :
                            budget.category === 'Путешествия' ? { from: 'rgba(144, 209, 244, 1)', to: 'rgba(63, 175, 236, 1)' } :
                            budget.category === 'Машина' ? { from: '#d6b5f3ff', to: '#9025eeff' } :
                            budget.category === 'Кафе' ? { from: '#fb973fff', to: '#6a390fff' } :
                            budget.category === 'Связь' ? { from: '#d9ff9bff', to: '#96e319ff' } :
                            budget.category === 'Домашние животные' ? { from: '#ffa764ff', to: '#281c13ff' } :
                            budget.category === 'Подарки' ? { from: '#fcabedff', to: '#c828aaff' } :
                            { from: '#d5fcfcff', to: '#5aececff' }
                            : { from: '#ff3232f7', to: '#8c0808a0' }}
                        style={{ width: '95%' }}
                    />
                    {budget.amount > spentAmount || !spentAmount
                    ? <span style={{marginBottom: 15}}>Потрачено: {formatAmount(spentAmount) || 0}</span>
                    : <span style={{marginBottom: 15, color: 'red'}}>Перерасход: {formatAmount(budget.amount - spentAmount) || 0}</span>
                    }
                </Flex>
            ) 
            })}
        </Flex>
    )
}

export default BudgetList