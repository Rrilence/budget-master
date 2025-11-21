import { DatePicker, Flex, Table, type TableColumnsType } from "antd";
import type { InfoExpense } from "../../../shared/types";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { useSelector } from "react-redux";
import { selectExpenses } from "../expenses-slice";
import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons";
import styles from './styles.module.css'

dayjs.locale('ru');

const ExpensesList = () => {

const dateFormat = 'DD.MM.YYYY';
const expenses = useSelector(selectExpenses)

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


    return(
        <Table
            columns={columns}
            className={styles.customTable}
            dataSource={expenses}
            rowKey={(record) => record.id!}
            scroll={{ x: 'max-content' }}
        />
    )
}

export default ExpensesList