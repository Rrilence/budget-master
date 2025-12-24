import { useSelector } from "react-redux";
import { selectfinAudit } from "./analitic-slice";
import { Flex, Typography } from "antd";
import dayjs from 'dayjs';
import { CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, EditOutlined, LineChartOutlined } from "@ant-design/icons";
import useCurrency from "../../shared/hooks/useCurrency";

const {Text} = Typography;

const Audit = () => {

    const finAudit = useSelector(selectfinAudit);
    const {symbolCurrency} = useCurrency();

    const monthProfit = finAudit
        .filter(item => item.Прибыль > 0)
        .map(item => dayjs(item.type, 'MM').format('MMMM'));
    const monthLoss = finAudit
        .filter(item => item.Убыток < 0)
        .map(item => dayjs(item.type, 'MM').format('MMMM'));
    const totalProfit = finAudit.reduce((acc, item) => {
        return acc + (item.Прибыль + item.Убыток);
    }, 0);

    return (
        <Flex vertical gap={10} style={{padding: 10, borderRadius: 10, maxWidth: 700, margin: '20px auto 50px'}}>
            <Text strong style={{fontSize: 18, textAlign: 'center'}}><LineChartOutlined style={{color: 'blue', fontSize: 24, padding: '5px 0 15px'}}/> Финансовый анализ:</Text>
            <Text><CheckCircleOutlined style={{color: 'green'}} /> Успешные месяцы: <b>{monthProfit.join(', ')}</b></Text>
            <Text><CloseCircleOutlined style={{color: 'red'}} /> Неудачные месяцы: <b>{monthLoss.join(', ')}</b></Text>
            {totalProfit >= 0 
            ?
            <Flex vertical gap={10}>
                <Text><DollarOutlined style={{color: '#d2b512ff'}}/> Текущая прибыль: <b>{totalProfit} {symbolCurrency}</b></Text>
                <Text><EditOutlined style={{color: '#850e3aff'}}/> Общая тенденция: положительная</Text>
                <Text><b>Рекомендация:</b> проанализировать факторы успеха в указанные периоды для повторения и улучшения результата."</Text>
            </Flex>
            : 
            <Flex vertical gap={10}>
                <Text><DollarOutlined style={{color: '#d2b512ff'}}/> Текущий убыток: <b>{totalProfit} {symbolCurrency}</b></Text>
                <Text><EditOutlined style={{color: '#850e3aff'}}/> Общая тенденция: <b>отрицательная</b></Text>
                <Text><b>Рекомендация:</b> проанализировать факторы неудачи в указанные периоды и по возможности уменьшить расходы по самым убыточным категориям</Text>
            </Flex>
            }
        </Flex>
    )
}

export default Audit