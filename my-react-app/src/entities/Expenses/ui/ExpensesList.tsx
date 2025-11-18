import { DatePicker, Flex, Table, type TableColumnsType } from "antd";
import type { ExpensesList, InfoExpense } from "../../../shared/types";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { useSelector } from "react-redux";
import { selectExpenses } from "../expenses-slice";
import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons";

dayjs.locale('ru');

const ExpensesList = () => {

const dateFormat = 'DD.MM.YYYY';
const expenses = useSelector(selectExpenses)

const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'дом': return <HomeFilled style={{ marginRight: 8, color: '#cc1616ff'}} />;
      case 'продукты': return <ShoppingCartOutlined style={{ marginRight: 8, color: '#2656e9ff' }} />;
      case 'здоровье': return <MedicineBoxFilled style={{ marginRight: 8, color: '#14bc14ff' }} />;
      case 'одежда': return <SkinFilled style={{ marginRight: 8, color: '#7a068fff' }} />;
      case 'транспорт': return <TruckFilled style={{ marginRight: 8, color: '#e07314ff' }} />;
      case 'спорт': return <HeartFilled style={{ marginRight: 8, color: '#25eeb2ff' }} />;
      case 'досуг': return <SmileFilled style={{ marginRight: 8, color: '#e7f73aff' }} />;
      case 'путешествия': return <GlobalOutlined style={{ marginRight: 8, color: 'rgba(63, 175, 236, 1)' }} />;
      case 'машина': return <CarFilled style={{ marginRight: 8, color: '#9025eeff' }} />;
      case 'кафе': return <CoffeeOutlined style={{ marginRight: 8, color: '#6a390fff' }} />;
      case 'связь': return <WifiOutlined style={{ marginRight: 8, color: '#96e319ff' }} />;
      case 'домашние животные': return <QqOutlined style={{ marginRight: 8, color: '#281c13ff'  }} />;
      case 'подарки': return <GiftFilled style={{ marginRight: 8, color: '#c828aaff' }} />;
      default: return <LoadingOutlined style={{ marginRight: 8, color: '#5aececff' }} />;
    }
  };

const columns: TableColumnsType = [
    {
        title: 'Название',
        dataIndex: 'name',
        render: (_, record: InfoExpense) => (
            <Flex>
                {getCategoryIcon(record.category)}
                <div>
                    {record.name}
                    <span>
                        {record.category}

                    </span>
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
        onFilter: (value, record) => record.name.indexOf(value as string) === 0,
        filterSearch: true,
    },
    {
        title: 'Стоимость',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
        width: '25%',
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        sorter: (a, b): number => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
        sortDirections: ['ascend', 'descend'],
        filterDropdown: ({ setSelectedKeys, confirm, selectedKeys }) => (
            <div style={{ padding: 8 }}>
                <DatePicker
                    onChange={(date: Dayjs | null) => {
                        if (date) {
                            setSelectedKeys([date.format(dateFormat)]);
                        } else {
                            setSelectedKeys([]);
                        }
                    }}
                    onOk={() => confirm()}
                    format={dateFormat}
                    value={selectedKeys[0] ? dayjs(String(selectedKeys[0]), dateFormat) : null}
                />
            </div>
        ),
        onFilter: (value, record) => dayjs(record.date).format(dateFormat) === value,
        filterSearch: true,
        width: '25%',
    },
];

    return(
        <Table
            columns={columns}
            dataSource={expenses}
            rowKey={(record) => record.id}
        />
    )
}

export default ExpensesList