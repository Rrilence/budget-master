import { useSelector } from "react-redux"
import { selectData } from "../../entities/setting-slice"


const useCurrency = () => {
    const {currency} = useSelector(selectData);
    const currencyText = {
        'RUB': '₽',
        'USD': '$',
        'EUR': '€'
    };

    const formatAmount = (number: number): string => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number) + ' ' + currencyText[currency];
    };

    const symbolCurrency = currencyText[currency];

    return {formatAmount, symbolCurrency}
}

export default useCurrency