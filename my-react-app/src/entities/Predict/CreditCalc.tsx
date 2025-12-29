import { Button, Col, Flex, Form, InputNumber, Row, Segmented, Select, Typography } from "antd"
import useCurrency from "../../shared/hooks/useCurrency";
import { useState } from "react";
import type { InfoLoan } from "../../shared/types";
import styles from './styles.module.css'
import { WalletTwoTone } from "@ant-design/icons";

const {Text} = Typography;

interface CreaditProps {
    balance: number,
}

const CreditCalc = ({balance}: CreaditProps) => {

    const [form] = Form.useForm();
    const {formatAmount} = useCurrency();
    const [loan, setLoan] = useState('Кредит');
    const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    overpayment: 0
    });

    const creditOptions = [
        {value: 1, label: '1 месяц'},
        {value: 3, label: '3 месяца'},
        {value: 6, label: '6 месяцев'},
        {value: 9, label: '9 месяцев'},
        {value: 12, label: '1 год'},
        {value: 18, label: '1.5 года'},
        {value: 24, label: '2 года'},
        {value: 36, label: '3 года'},
        {value: 48, label: '4 года'},
        {value: 60, label: '5 лет'},
    ]
    
    const mortgageOptions = [
        {value: 1, label: '1 год'},
        {value: 2, label: '2 года'},
        {value: 3, label: '3 года'},
        {value: 4, label: '4 года'},
        {value: 5, label: '5 лет'},
        {value: 6, label: '6 лет'},
        {value: 7, label: '7 лет'},
        {value: 8, label: '8 лет'},
        {value: 9, label: '9 лет'},
        {value: 10, label: '10 лет'},
        {value: 15, label: '15 лет'},
        {value: 20, label: '20 лет'},
        {value: 25, label: '25 лет'},
        {value: 30, label: '30 лет'},
    ]
    
    const onFinish = (values: InfoLoan) => {
        let monthlyPayment = 0;
        let totalPayment = 0;
        let overpayment = 0;
        if(loan === 'Кредит') {
            const monthlyRate = values.procent / 100 / 12;
            monthlyPayment = Math.round(values.amount * 
            (monthlyRate * Math.pow(1 + monthlyRate, values.time)) / 
            (Math.pow(1 + monthlyRate, values.time) - 1));
            
            totalPayment = monthlyPayment * values.time;
            overpayment = totalPayment - values.amount;
            setResults({ monthlyPayment, totalPayment, overpayment });
        }
        else if(loan === 'Ипотека' && values.initial) {
            const loanAmount = values.amount - values.initial;
            const monthlyRate = values.procent / 100 / 12;
            const months = values.time * 12;
            
            const monthlyPayment = Math.round(loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
            (Math.pow(1 + monthlyRate, months) - 1));
            
            const totalPayment = monthlyPayment * months;
            const overpayment = totalPayment - loanAmount;
            setResults({ monthlyPayment, totalPayment, overpayment });
        }
    };

    return (
        <Flex vertical align="center" gap={20} style={{marginTop: 20}}>
            <Text strong style={{fontSize: 16}}>Рассчитать возможность кредита или ипотеки</Text>
            <Row style={{width: '100%', padding: 20}}>
                <Col xs={24} lg={12} className={styles.credit}>
                <Form
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                initialValues={{ 
                    time: loan === 'Кредит' ? 12 : 1 
                }}
                className={styles.form}>
                    <Segmented
                    options={['Кредит', 'Ипотека']}
                    block
                    onChange={(value) => setLoan(value)}
                    className={styles.segmented}/>
                    <Form.Item
                    name="amount"
                    layout="vertical"
                    label="Сумма кредита: " 
                    rules={[
                        { required: true, message: 'Введите сумму' },
                        { type: 'number', min: 0.01, message: 'Сумма должна быть больше 0' },
                    ]}
                    style={{ margin: '10px'}}>
                        <InputNumber
                        min={0.01}
                        precision={2}
                        placeholder="0.00"
                        style={{width: "100%"}}
                        />
                    </Form.Item>
                    <Form.Item
                    name="procent"
                    layout="vertical"
                    label="Процентная ставка, %" 
                    rules={[
                        { required: true, message: 'Введите порцент по кредиту' },
                        { type: 'number', min: 0.01, message: 'Число должно быть больше 0' },
                    ]}
                    style={{ margin: '10px'}}>
                        <InputNumber
                        min={0.01}
                        precision={2}
                        placeholder="0.00"
                        style={{width: "100%"}}
                        />
                    </Form.Item>
                    <Form.Item
                    name="time"
                    layout="vertical"
                    label="Срок кредита" 
                    style={{ margin: '10px'}}>
                        <Select
                        style={{ width: 120 }}
                        options={loan === 'Кредит' ?creditOptions : mortgageOptions}
                        />
                    </Form.Item>
                    {loan === 'Ипотека' && 
                    <Form.Item
                    name="initial"
                    layout="vertical"
                    label="Первоначальный взнос" 
                    rules={[
                        { required: true, message: 'Введите первоначальный взнос' },
                        { type: 'number', min: 0.01, message: 'Сумма должна быть больше 0' },
                    ]}
                    style={{ margin: '10px'}}>
                        <InputNumber
                        min={0.01}
                        precision={2}
                        placeholder="0.00"
                        style={{width: "100%"}}
                        />
                    </Form.Item>
                    }
                    <Form.Item 
                    label={null}
                    style={{ textAlign: 'center', paddingTop: 10 }}>
                        <Button 
                        type="primary" 
                        htmlType="submit"
                        >
                            Рассчитать
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
                <Col xs={24} lg={12} style={{marginTop: 30}}>
                    <Text strong className={styles.result}>Результаты расчета</Text>
                    <Flex vertical className={styles.calc}>
                        <Flex justify="space-between" className={styles.results}>
                            <Text><WalletTwoTone twoToneColor="#2906c5ff"/> Ежемесячный платеж</Text>
                            <Text strong>{formatAmount(results.monthlyPayment)}</Text>
                        </Flex>
                        <Flex justify="space-between" className={styles.results}>
                            <Text><WalletTwoTone twoToneColor="#0eb216ff"/> Общая сумма займа</Text>
                            <Text strong>{formatAmount(results.totalPayment)}</Text>
                        </Flex>
                        <Flex justify="space-between" className={styles.results}>
                            <Text><WalletTwoTone twoToneColor="#a32208ff"/> Переплата</Text>
                            <Text strong>{formatAmount(results.overpayment)}</Text>
                        </Flex>
                    </Flex>
                    {results.monthlyPayment > 0 &&
                        ((balance - results.monthlyPayment >= 10000)
                        ? <Flex vertical className={styles.calc}>
                            <Text strong>Ваш финансовый баланс позволяет рассмотреть кредитные возможности.</Text>
                            <Text>Ключевое правило — ежемесячный платеж не должен превышать 30% от вашего дохода.</Text>
                        </Flex>
                        : <Flex vertical className={styles.calc}>
                            <Text strong>Кредитные обязательства при текущем балансе увеличат финансовую нагрузку.</Text>
                            <Text>Рассмотрите варианты увеличения доходов или оптимизации расходов перед оформлением займа.</Text>
                        </Flex>
                        )
                    }
                </Col>
            </Row>
        </Flex>
    )
}

export default CreditCalc