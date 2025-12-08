import { Flex, Select, Typography } from "antd"
import { useState } from "react"
import ChartExpInc from "./chartExpInc";

const {Text} = Typography


const ExpenseIncome = () => {

    const [period, setPeriod] = useState('week');

    return (
        <Flex vertical gap={15} style={{maxWidth: 500}}>
            <Flex justify="space-between" style={{width: '100%'}}>
                <Text strong>Финансовые операции</Text> 
                <Select
                defaultValue="week"
                style={{ width: 120 }}
                onChange={(value: string) => setPeriod(value)}
                options={[
                    { value: 'week', label: 'За неделю' },
                    { value: 'month', label: 'За месяц' },
                    { value: 'year', label: 'За год' },
                ]}
                />
            </Flex>
            <ChartExpInc period={period}/>

        </Flex>
    )
}

export default ExpenseIncome