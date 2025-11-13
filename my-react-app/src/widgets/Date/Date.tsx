import { Calendar, ConfigProvider, type CalendarProps } from "antd"
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import ruRU from 'antd/locale/ru_RU'

import styles from './styles.module.css'

dayjs.locale('ru');

const Date = () => {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <ConfigProvider locale={ruRU}>
            <div className={styles.calendar}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
        </ConfigProvider>
    )

}

export default Date