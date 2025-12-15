import { Flex, Select, Typography } from "antd"
import { useState } from "react"
import ChartExpInc from "./chartExpInc";

import styles from '../styles.module.css'
import { XFilled } from "@ant-design/icons";

const {Text} = Typography


const ExpenseIncome = () => {

    const [period, setPeriod] = useState('week');

    return (
        <Flex vertical gap={15} style={{maxWidth: 500, margin: '20px auto'}}>
            <Flex justify="space-between" style={{width: '100%'}}>
                <Flex vertical style={{marginLeft: '25px'}}>
                    <Text strong style={{fontSize: 17}}>Финансовые операции</Text> 
                    <Text style={{fontSize: '12px'}}><XFilled style={{color: '#64DAAB'}} /> Доходы <XFilled style={{color: '#6395FA'}} /> Расходы</Text>
                </Flex>
                <Select
                defaultValue="week"
                style={{ width: 120, marginRight: '20px' }}
                onChange={(value: string) => setPeriod(value)}
                options={[
                    { value: 'week', label: 'За неделю' },
                    { value: 'month', label: 'За месяц' },
                    { value: 'year', label: 'За год' },
                ]}
                />
            </Flex>
            <ChartExpInc period={period}/>
            <div className={styles.back}></div>
        </Flex>
    )
}

export default ExpenseIncome