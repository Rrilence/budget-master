import { Button, DatePicker, Flex, Space, Table, type TableColumnsType } from "antd";
import type { InfoExpense } from "../../../shared/types";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDispatch, useSelector } from "react-redux";
import { selectExpenses, selectIsOpenModal, setExpenses, setinitialValues, setIsOpenModal, setIsUpdateExpense } from "../expenses-slice";
import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons";
import { useState } from "react";
import { notifyTransaction } from "../../../shared/toasts";
import { deleteExpenses } from "../api/deleteExpense";
import ModalExpenses from "./ModalExpenses";
import style from './styles.module.css'
import { useStyles } from "../../../widgets/Exchange/hooks/useStyles";

dayjs.locale('ru');

const ExpensesList = () => {
  const { styles } = useStyles();

const dispatch = useDispatch();
const dateFormat = 'DD.MM.YYYY';
const expenses = useSelector(selectExpenses);
const isOpenModal = useSelector(selectIsOpenModal);
const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Дом': return <HomeFilled className={style.icon} style={{ color: '#cc1616ff'}} />;
      case 'Продукты': return <ShoppingCartOutlined className={style.icon} style={{ color: '#2656e9ff' }} />;
      case 'Здоровье': return <MedicineBoxFilled className={style.icon} style={{ color: '#14bc14ff' }} />;
      case 'Одежда': return <SkinFilled className={style.icon} style={{ color: '#7a068fff' }} />;
      case 'Транспорт': return <TruckFilled className={style.icon} style={{ color: '#e07314ff' }} />;
      case 'Спорт': return <HeartFilled className={style.icon} style={{ color: '#25eeb2ff' }} />;
      case 'Досуг': return <SmileFilled className={style.icon} style={{ color: '#e7f73aff' }} />;
      case 'Путешествия': return <GlobalOutlined className={style.icon} style={{ color: 'rgba(63, 175, 236, 1)' }} />;
      case 'Машина': return <CarFilled className={style.icon} style={{ color: '#9025eeff' }} />;
      case 'Кафе': return <CoffeeOutlined className={style.icon} style={{ color: '#6a390fff' }} />;
      case 'Связь': return <WifiOutlined className={style.icon} style={{ color: '#96e319ff' }} />;
      case 'Домашние животные': return <QqOutlined className={style.icon} style={{ color: '#281c13ff'  }} />;
      case 'Подарки': return <GiftFilled className={style.icon} style={{ color: '#c828aaff' }} />;
      default: return <LoadingOutlined className={style.icon} style={{ color: '#5aececff' }} />;
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
                    <p className={style.name}>{record.name}</p>
                    <p className={style.category}>{record.category}</p>
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
                className={styles.root}
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