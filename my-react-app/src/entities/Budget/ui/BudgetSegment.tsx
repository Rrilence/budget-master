import { Carousel, DatePicker, Typography } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from "react-redux";
import { setDate, setPeriod } from "../budget-slice";
import styles from './styles.module.css'
import { formatWeek } from "../../../shared/formatting";
import { useState } from "react";

const {Text} = Typography

const BudgetSegment = () => {

    const dispatch = useDispatch();
    const [dateValue, setDateValue] = useState<dayjs.Dayjs | null>(null);

    const dateFormat = 'DD.MM.YYYY';
    const monthFormat = 'MM.YYYY';
    const yearFormat = 'YYYY';

    const handleSlide = (current: number) => {
        dispatch(setDate(''))
        setDateValue(null)
        switch (current) {
            case 0:
                dispatch(setPeriod('Свой период'))
                break;
            case 1:
                dispatch(setPeriod('Еженедельно'))
                break;
            case 2:
                dispatch(setPeriod('Ежемесячно'))
                break;
            case 3:
                dispatch(setPeriod('Ежеквартально'))
                break;
            case 4:
                dispatch(setPeriod('Ежегодно'))
                break;
            default:
                break;
        }
    }

    const onChangeDay = (date: Dayjs | null) => {
        const day = dayjs(date).format('DD.MM.YYYY');
        if (day === 'Invalid Date') {
            dispatch(setDate(''));
            setDateValue(null);
        } else {
            dispatch(setDate(day));
            setDateValue(date);
        }}
    const onChangeWeek = (date: Dayjs | null) => {
        const datestartString = dayjs(date).format('YYYY-WW');
        if (datestartString === 'Invalid Date') {
            dispatch(setDate(''));
            setDateValue(null);
        } else {
        const day = formatWeek(datestartString).format('DD.MM.YYYY');
        dispatch(setDate(day))
        setDateValue(date)
        }} 
    const onChangeMonth = (date: Dayjs | null) => {
        const day = dayjs(date).startOf('month').format('DD.MM.YYYY');
        if (day === 'Invalid Date') {
            dispatch(setDate(''));
            setDateValue(null);
        } else {
        dispatch(setDate(day))
        setDateValue(date)
        }}
    const onChangeYear = (date: Dayjs | null) => {
        const day = dayjs(date).startOf('year').format('DD.MM.YYYY');
        if (day === 'Invalid Date') {
            dispatch(setDate(''));
            setDateValue(null);
        } else {
        dispatch(setDate(day))
        setDateValue(date)
        }}
    
    return (
        <div className={styles.wrapper}>
            <Carousel arrows infinite={false}
            afterChange={handleSlide}>
            <div className={styles.flex}>
                <Text>Выберите день</Text>
                <DatePicker format={dateFormat} onChange={onChangeDay} value={dateValue}/>
            </div>
            <div className={styles.flex}>
                <Text>Выберите неделю</Text>
                <DatePicker onChange={onChangeWeek} picker="week" value={dateValue}/>
            </div>
            <div className={styles.flex}>
                <Text>Выберите месяц</Text>
                <DatePicker format={monthFormat} onChange={onChangeMonth} picker="month" value={dateValue}/>
            </div>
            <div className={styles.flex}>
                <Text>Выберите квартал</Text>
                <DatePicker onChange={onChangeMonth} picker="quarter" value={dateValue}/>
            </div>
            <div className={styles.flex}>
                <Text>Выберите год</Text>
                <DatePicker defaultValue={dayjs()} format={yearFormat} onChange={onChangeYear} picker="year" value={dateValue}/>
            </div>
            </Carousel>
        </div>
  );

}

export default BudgetSegment