import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const formatDateWeather = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: '2-digit',
    }
    return date.toLocaleDateString('ru-RU', options)
}

const formatDayWeather = (day: number) => {
    const date = new Date(day * 1000);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        };
    const formatter = new Intl.DateTimeFormat('ru-RU', options);
    return formatter.format(date);
}

const formatWeekDayWeather = (day: number) => {
    const date = new Date(day * 1000);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        };
    const formatter = new Intl.DateTimeFormat('ru-RU', options);
    return formatter.format(date);
}

const formatTimeWeather = (date: number) => {
    const time = new Date(date * 1000);
    const hours = time.getHours().toString();
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

const formatDateExchange = (dateExchange: string) => {
  const date = new Date(dateExchange);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const formatDate = (date: Date) => {
  return dayjs(date).format('DD.MM.YYYY'); 
}

const formatWeek = (dateWeek: string) => {
    const [year, week] = dateWeek.split('-').map(Number);
    const firstDayOfYear = dayjs().year(year).startOf('year');
    const monday = firstDayOfYear.isoWeek(week).startOf('isoWeek');
    return monday
}

const formatAmount = (number: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number) + ' руб.';
};

export {
    formatDateWeather,
    formatDayWeather,
    formatWeekDayWeather,
    formatTimeWeather,
    formatDateExchange,
    formatDate,
    formatWeek,
    formatAmount, 

}
