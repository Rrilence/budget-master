import { Calendar, ConfigProvider, type CalendarProps } from "antd"
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import ruRU from 'antd/locale/ru_RU'

import style from './styles.module.css'
import { createStyles } from "antd-style";

dayjs.locale('ru');

const useStyles = createStyles(() => ({
  root: {
    marginTop: 30,
    padding: 10,
    backgroundImage: 'linear-gradient(0deg, rgba(134, 171, 199, 1), rgba(32, 86, 117, 1))',
  },
}));

const stylesObject = {
  root: {
    borderRadius: 8,
  },
};

const DateCalendar = () => {
    const { styles } = useStyles();
    const rootClassName = styles.root;
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <ConfigProvider locale={ruRU}>
            <div className={style.calendar}>
                <Calendar className={rootClassName} style={stylesObject.root} fullscreen={false} onPanelChange={onPanelChange} />
            </div>
        </ConfigProvider>
    )

}

export default DateCalendar