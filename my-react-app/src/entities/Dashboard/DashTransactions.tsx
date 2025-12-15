import { Flex, Table, type TableColumnsType, Typography } from "antd";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { selectIncomes } from "../Incomes/incomes-slice";
import type { InfoExpense, InfoIncome } from "../../shared/types";
import { useStyles } from "../../widgets/Exchange/hooks/useStyles";
import { useMemo } from "react";
import dayjs from 'dayjs';
import style from './styles.module.css'

const {Text} = Typography;


const DashTransactions = () => {
    const { styles } = useStyles();
    const expenses = useSelector(selectExpenses);
    const incomes = useSelector(selectIncomes);

    const dataSource = useMemo(() => {
        const transactions = [...expenses, ...incomes];
        transactions.sort((a, b) => {
            const dateA = dayjs(a.date);
            const dateB = dayjs(b.date);
            return dateA.valueOf() - dateB.valueOf();
        });
        return transactions.slice(0, 10);
    }, [expenses, incomes]);

    const columns: TableColumnsType<InfoExpense | InfoIncome> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name', 
    },
    {
        title: 'Стоимость',
        dataIndex: 'amount',
        key: 'amount', 
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
        width: '25%',
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date', 
        width: '25%',
    },
    ];

    return (
        <>
            <Flex vertical gap={20} className={style.title}>
                <Text strong className={style.text}>Последние транзакции</Text>
            <Table
            columns={columns}
            pagination={false}
            dataSource={dataSource}
            className={styles.root}
            rowKey={(record) => record.id!}
            scroll={{ x: 'max-content' }}
            />
            </Flex>
        </>
    )
}

export default DashTransactions