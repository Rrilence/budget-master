import { Button, Checkbox, Flex, Radio, Space, Typography, type RadioChangeEvent } from "antd"
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { useDispatch, useSelector } from "react-redux";
import { initialState, selectCategory, selectData,  selectTheme, setCategory, setCurrency, setExchangeRate, setNotifications, setWeather } from "../../../entities/setting-slice";
import type { CheckboxProps } from "antd/lib";
import styles from './styles.module.css'
import clsx from "clsx";
import imgSet from '../../../assets/setting.png'
import { BellOutlined, CloudSyncOutlined, DatabaseOutlined, DollarOutlined, EuroCircleOutlined } from "@ant-design/icons";
import { updateSettings } from "../api/updateSetting";
import { selectUser } from "../../../entities/auth-slice";
import { notifySelectCategory } from "../../../shared/toasts";


const CheckboxGroup = Checkbox.Group;

const optionsCur: CheckboxGroupProps<string>['options'] = [
  { label: 'RUB', value: 'RUB' },
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
];

const {Text} = Typography

const Settings = () => {
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);
    const theme = useSelector(selectTheme);
    const user = useSelector(selectUser);
    const data = useSelector(selectData);

    const checkAll = category.length === initialState.category.length;

    const onChange = (list: string[]) => {
        if (list.length === 0) {
            notifySelectCategory();
            return;
        }
        dispatch(setCategory(list));
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        if (!e.target.checked) {
        notifySelectCategory();
        dispatch(setCategory([initialState.category[0]]));
        } else {
        dispatch(setCategory(initialState.category));
    }
    };

    const changeCurrency = (e:  RadioChangeEvent) => {
        dispatch(setCurrency(e.target.value));
    }
    const changeNotification = () => {
        dispatch(setNotifications(!data.notifications));
    }
    const changeExchangeRate = () => {
        dispatch(setExchangeRate(!data.exchangeRate));
    }
    const changeWeather = () => {
        dispatch(setWeather(!data.weather));
    }

    return (
        <Flex vertical wrap align="center" gap={15} className={clsx(`${theme === 'light' ? 'light' : 'dark'}`, styles.wrapper)}>
            <Space>
                <img src={imgSet} width={35}/>
                <Text strong className={styles.title}>Настройте приложение под себя</Text>
            </Space>
            <Flex gap={10} className={styles.flex}>
                <Text><DollarOutlined className={styles.icon}/> Выберите валюту</Text>
                <Radio.Group block options={optionsCur} onChange={changeCurrency} defaultValue={data.currency}/>
            </Flex>
            <Checkbox className={styles.checkbox} defaultChecked={data.notifications}
            onChange={changeNotification}><BellOutlined className={styles.icon}/> Включить уведомлениия</Checkbox>
            <Checkbox className={styles.checkbox} defaultChecked={data.exchangeRate} 
            onChange={changeExchangeRate}><EuroCircleOutlined className={styles.icon}/> Показывать Курс Валют</Checkbox>
            <Checkbox className={styles.checkbox} defaultChecked={data.weather}  
            onChange={changeWeather}><CloudSyncOutlined className={styles.icon}/> Показывать погоду</Checkbox>
            <Flex vertical>
                <Text style={{marginBottom: 10}}><DatabaseOutlined style={{fontSize: 20}}/> Выберите категории расходов</Text>
                <Checkbox className={styles.checkbox}
                onChange={onCheckAllChange} checked={checkAll}><b>Выбрать все</b></Checkbox>
                <CheckboxGroup className={styles.checkgroup} options={initialState.category} value={category} defaultValue={data.category} onChange={onChange}/>
            </Flex>
            <Button type="primary" style={{marginTop: 15}}
            onClick={() => updateSettings(user!.id, data)}>Сохранить настройки</Button>
        </Flex>
    )
}

export default Settings