import { Flex, Typography } from "antd"
import { usePredict } from "../../shared/hooks/usePredict";
import useCurrency from "../../shared/hooks/useCurrency";
import { CreditCardOutlined } from "@ant-design/icons";
import styles from './styles.module.css'

const {Text} = Typography;

const Stadiumpredict = () => {

    const {balanceProficit, onlyExpenses, inflation} = usePredict();
    const {formatAmount} = useCurrency();

    return (
        <Flex vertical align="center" gap={20}>
            <Text strong className={styles.title}>что если ?</Text>
            <Flex vertical gap={5}>
                <Text strong className={styles.scenario}>Доход увеличится на 10%</Text>
                <Text style={{fontSize: 15}}><CreditCardOutlined style={{color: '#33b7ceff'}}/> Баланс составит: <b>{formatAmount(balanceProficit)}</b></Text>
                {balanceProficit > 20000 
                && <Text style={{fontSize: 15}}>Финансовая подушка от 20 000 рублей позволяет начать формировать сбережения на цели, рассматривать ипотечные программы или обращаться за кредитом.</Text>
                }
            </Flex>
            <Flex vertical gap={5}>
                <Text strong className={styles.scenario}>Потеря доходов на 2 месяца</Text>
                <Text style={{fontSize: 15}}><CreditCardOutlined style={{color: '#33b7ceff'}}/> Баланс составит: <b>-{formatAmount(onlyExpenses)}</b></Text>
                <Text style={{fontSize: 15}}>Рекомендуется накопить Финансовую подушку от {formatAmount(onlyExpenses)} на форс-мажорные обстоятельства.</Text>
            </Flex>
            <Flex vertical gap={5} style={{width: '100%'}}>
                <Text strong className={styles.scenario}>Годовая инфляция составляет примерно 6%, <br />при увеличении стоимости расходов:</Text>
                <Text style={{fontSize: 15}}><CreditCardOutlined style={{color: '#33b7ceff'}}/> Баланс составит: <b>{formatAmount(inflation)}</b></Text>
                {balanceProficit < 5000 
                && <Text style={{fontSize: 15}}>Рекомендуется рассмотреть возможности увеличения доходов.</Text>
                }
            </Flex>
        </Flex>
    )
}

export default Stadiumpredict