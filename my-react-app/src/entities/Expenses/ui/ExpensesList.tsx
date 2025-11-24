import { Button, DatePicker, Flex, Space, Table, type TableColumnsType } from "antd";
import type { InfoExpense } from "../../../shared/types";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDispatch, useSelector } from "react-redux";
import { selectExpenses, selectIsOpenModal, setExpenses, setinitialValues, setIsOpenModal, setIsUpdateExpense } from "../expenses-slice";
import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons";
import styles from './styles.module.css'
import { useState } from "react";
import { notifyTransaction } from "../../../shared/toasts";
import { deleteExpenses } from "../api/deleteExpense";
import ModalExpenses from "./ModalExpenses";

dayjs.locale('ru');

const ExpensesList = () => {

const dispatch = useDispatch();
const dateFormat = 'DD.MM.YYYY';
const expenses = useSelector(selectExpenses);
const isOpenModal = useSelector(selectIsOpenModal);
const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'дом': return <HomeFilled className={styles.icon} style={{ color: '#cc1616ff'}} />;
      case 'продукты': return <ShoppingCartOutlined className={styles.icon} style={{ color: '#2656e9ff' }} />;
      case 'здоровье': return <MedicineBoxFilled className={styles.icon} style={{ color: '#14bc14ff' }} />;
      case 'одежда': return <SkinFilled className={styles.icon} style={{ color: '#7a068fff' }} />;
      case 'транспорт': return <TruckFilled className={styles.icon} style={{ color: '#e07314ff' }} />;
      case 'спорт': return <HeartFilled className={styles.icon} style={{ color: '#25eeb2ff' }} />;
      case 'досуг': return <SmileFilled className={styles.icon} style={{ color: '#e7f73aff' }} />;
      case 'путешествия': return <GlobalOutlined className={styles.icon} style={{ color: 'rgba(63, 175, 236, 1)' }} />;
      case 'машина': return <CarFilled className={styles.icon} style={{ color: '#9025eeff' }} />;
      case 'кафе': return <CoffeeOutlined className={styles.icon} style={{ color: '#6a390fff' }} />;
      case 'связь': return <WifiOutlined className={styles.icon} style={{ color: '#96e319ff' }} />;
      case 'домашние животные': return <QqOutlined className={styles.icon} style={{ color: '#281c13ff'  }} />;
      case 'подарки': return <GiftFilled className={styles.icon} style={{ color: '#c828aaff' }} />;
      default: return <LoadingOutlined className={styles.icon} style={{ color: '#5aececff' }} />;
    }
  };

const columns: TableColumnsType<InfoExpense> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name', 
        render: (_, record: InfoExpense) => (
            <Flex>
                {getCategoryIcon(record.category)}
                <div>
                    <p className={styles.name}>{record.name}</p>
                    <p className={styles.category}>{record.category}</p>
                </div>
            </Flex>
            ),
        showSorterTooltip: { target: 'full-header' },
        filters: [
        {text: 'Дом', value: 'дом'},
        {text: 'Продукты', value: 'продукты'},
        {text: 'Здоровье', value: 'здоровье'},
        {text: 'Одежда', value: 'одежда'},
        {text: 'Транспорт', value: 'транспорт'},
        {text: 'Спорт', value: 'спорт'},
        {text: 'Досуг', value: 'досуг'},
        {text: 'Путешествия', value: 'путешествия'},
        {text: 'Машина', value: 'машина'},
        {text: 'Кафе', value: 'кафе'},
        {text: 'Связь', value: 'связь'},
        {text: 'Домашние животные', value: 'домашние животные'},
        {text: 'Подарки', value: 'подарки'},
        {text: 'Другое', value: 'другое'},
        ],
        onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        filterSearch: true,
        fixed: 'left',
    }, Table.EXPAND_COLUMN,
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
        sorter: (a, b) => dayjs(a.date, dateFormat).valueOf() - dayjs(b.date, dateFormat).valueOf(),
        sortDirections: ['ascend', 'descend'],
        filterDropdown: ({ setSelectedKeys, confirm, selectedKeys }) => (
            <div style={{ padding: 8 }}>
                <DatePicker
                    onChange={(date) => {
                        if (date) {
                            setSelectedKeys([date.format(dateFormat)]);
                        } else {
                            setSelectedKeys([]);
                        }
                    }}
                    onOk={() => confirm()}
                    format={dateFormat}
                    value={selectedKeys[0] ? dayjs(String(selectedKeys[0]), dateFormat) : null
                    }
                    needConfirm
                />
            </div>
            ),
        onFilter: (value, record) => {
      return record.date === value; 
        },
        filterSearch: true,
        width: '25%',
    },
];

    const expandedRowRender = (record: InfoExpense) => {

        function onUpdate (record: InfoExpense) {
            if(record.id && record.user_id) {  
                dispatch(setIsUpdateExpense(true)); 
                dispatch(setIsOpenModal(true));
                dispatch(setinitialValues({
                    id: record.id,
                    user_id: record.user_id,
                    name: record.name,
                    category: record.category,
                    amount: record.amount,
                    date: record.date,
                }));

            }
        }

        function onDelete (record: InfoExpense) {
                if(record.id && record.user_id) {
                    deleteExpenses(record.id, record.user_id)
                    .then(() => {
                        const updateExpenses = expenses.filter(expense => expense.id !== record.id);
                        dispatch(setExpenses(updateExpenses));
                    })
                }
            }
        return (
            <Space>
            <Button type="default" size="small" onClick={() => onUpdate(record)}>Редактировать</Button>
            <Button danger size="small" onClick={() => onDelete(record)}>Удалить</Button>
            </Space>
        )

        
    };

    
     const onRow = (record: InfoExpense) => {
        return {
        onClick: () => {
            {
                if (record.id) {
                    const isExpanded = expandedRowKeys.includes(record.id);
                    setExpandedRowKeys(isExpanded ? [] : [record.id]);
                } else {
                    console.warn("record.id is undefined for this record:", record);
                    notifyTransaction();
                }
            }}
        }
    }

    return(
        <>
            <Table
                columns={columns}
                dataSource={expenses}
                rowKey={(record) => record.id!}
                scroll={{ x: 'max-content' }}
                expandable={{
                    expandedRowRender,
                    rowExpandable: () => true,
                    expandedRowKeys,
                    onExpand: (expanded, record) => {
                        if (expanded) {
                            setExpandedRowKeys([record.id!]);
                        } else {
                            setExpandedRowKeys([]);
                        }
                    },
                }}
                onRow={onRow}
            />
            {isOpenModal && <ModalExpenses/>}
        </>
    )
}

export default ExpensesList