import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons";
import { Form, Select } from "antd";

const CategorySelect = () => {

    return (
        <Form.Item layout="vertical" name="category" label="Выберите категорию: " required style={{ marginBottom: '10px' }}>
        <Select
            options={[
                {label: (<span><HomeFilled style={{ marginRight: 8, color: '#cc1616ff', fontSize: 18}} />Дом</span>),
                value: 'Дом'},
                {label: (<span><ShoppingCartOutlined style={{ marginRight: 8, color: '#2656e9ff', fontSize: 18 }} />Продукты</span>),
                value: 'Продукты'},
                {label: (<span><MedicineBoxFilled style={{ marginRight: 8, color: '#14bc14ff', fontSize: 18 }} />Здоровье</span>),
                value: 'Здоровье'},
                {label: (<span><SkinFilled style={{ marginRight: 8, color: '#7a068fff', fontSize: 18 }} />Одежда</span>),
                value: 'Одежда'},
                {label: (<span><TruckFilled style={{ marginRight: 8, color: '#e07314ff', fontSize: 18 }} />Транспорт</span>),
                value: 'Транспорт'},
                {label: (<span><HeartFilled style={{ marginRight: 8, color: '#25eeb2ff', fontSize: 18 }} />Спорт</span>),
                value: 'Спорт'},
                {label: (<span><SmileFilled style={{ marginRight: 8, color: '#e7f73aff', fontSize: 18 }} />Досуг</span>),
                value: 'Досуг'},
                {label: (<span><GlobalOutlined style={{ marginRight: 8, color: 'rgba(63, 175, 236, 1)', fontSize: 18 }} />Путешествия</span>),
                value: 'Путешествия'},
                {label: (<span><CarFilled style={{ marginRight: 8, color: '#9025eeff', fontSize: 18 }} />Машина</span>),
                value: 'Машина'},
                {label: (<span><CoffeeOutlined style={{ marginRight: 8, color: '#6a390fff', fontSize: 18 }} />Кафе</span>),
                value: 'Кафе'},
                {label: (<span><WifiOutlined style={{ marginRight: 8, color: '#96e319ff', fontSize: 18 }} />Связь</span>),
                value: 'Связь'},
                {label: (<span><QqOutlined style={{ marginRight: 8, color: '#281c13ff', fontSize: 18  }} />Домашние животные</span>),
                value: 'Домашние животные'},
                {label: (<span><GiftFilled style={{ marginRight: 8, color: '#c828aaff', fontSize: 18 }} />Подарки</span>),
                value: 'Подарки'},
                {label: (<span><LoadingOutlined style={{ marginRight: 8, color: '#5aececff', fontSize: 18 }} />Другое</span>),
                value: 'Другое'},
            ]} />
            </Form.Item>
    );
};

export default CategorySelect