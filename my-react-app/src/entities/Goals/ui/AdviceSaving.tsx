import { Flex, Typography } from "antd"
import { Content } from "antd/es/layout/layout";

import salary from '../../../assets/salary.png'
import salary50 from '../../../assets/salary50.webp'
import salary30 from '../../../assets/salary30.webp'
import salary20 from '../../../assets/salary20.jpg'

const {Text} = Typography;

const AdviceSaving = () => {

    return (
        <Content style={{margin: '50px auto', width: 405}}>
            <Text strong style={{ fontSize: 16}}>Метод накопления денежных средств 50/30/20</Text>
            <Flex vertical gap={40} align="center" style={{ marginTop: 20}}>
                <Flex align="center">
                    <img src={salary} width={110}/>
                    <Text strong>Заработная плата</Text>
                </Flex>
                <Flex gap={20}>
                    <img src={salary50} width={60}/>
                    <div>
                        <Text strong>50% - Основные ежемесячные траты</Text>
                        <p>Коммунальные платежи, продукты питания</p>
                    </div> 
                </Flex>
                <Flex gap={20}>
                    <img src={salary30} width={60}/>
                    <div>
                        <Text strong>30% - Менее необходимые, но нужные вещи</Text>
                        <p>Цифровое ТВ, интернет, одежда</p>
                    </div> 
                </Flex>
                <Flex gap={20}>
                    <img src={salary20} width={60}/>
                    <div>
                        <Text strong>20% - На будущее</Text>
                        <p>Сбережения, непредвиденные расходы, подарки</p>
                    </div> 
                </Flex>
            </Flex>
        </Content>

    )

}

export default AdviceSaving