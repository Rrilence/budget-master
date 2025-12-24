import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../entities/setting-slice";
import { Content } from "antd/es/layout/layout";
import { selectIsOpenModal, setGoals, setIsOpenModal } from "../../../entities/Goals/goals-slice";
import { Button, Flex } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from './styles.module.css'
import ModalGoal from "../../../entities/Goals/ui/ModalGoal";
import { useEffect } from "react";
import { selectUser } from "../../../entities/auth-slice";
import { notifyError } from "../../../shared/toasts";
import { getGoals } from "../../../entities/Goals/api/getGoals";
import GoalsList from "../../../entities/Goals/ui/GoalsList";
import AdviceSaving from "../../../entities/Goals/ui/AdviceSaving";

const Goals = () => {

    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const isOpenModal = useSelector(selectIsOpenModal);
    const user = useSelector(selectUser);

    useEffect(() => {
        const initialState = async () => {
            try {if(!user) {throw Error}
            const dataGoals = await getGoals(user);
            dispatch(setGoals(dataGoals));
            } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            notifyError();
            return []
        }};
        initialState();
    }, [dispatch, user]);

    return (
        <Content className={`${theme === 'light' ? 'light' : 'dark'}`}
           style={{minHeight: 620, padding: 20}}
           >
            <GoalsList/>
            {isOpenModal && <ModalGoal/>}
            <AdviceSaving/>
            <Flex 
            justify="center"
            align="center"
            className={clsx(styles.footer, `${theme === 'light' ? 'light' : 'dark'}`)}>
                <Button
                type="primary"
                icon={<PlusCircleOutlined />} 
                onClick={() => dispatch(setIsOpenModal(true))}
                > Добавить цель 
                </Button>
            </Flex>
        </Content>
    )
}

export default Goals