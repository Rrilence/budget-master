import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../../entities/Expenses/expenses-slice";
import { setIncomes } from "../../../entities/Incomes/incomes-slice";
import DualChart from "../../../entities/Analitic/DualChart";
import { selectUser } from "../../../entities/auth-slice";
import { useEffect, useState } from "react";
import { getExpenses } from "../../../entities/Expenses/api/getExpenses";
import { getIncomes } from "../../../entities/Incomes/api/getIncomes";
import { notifyError } from "../../../shared/toasts";
import { selectWindowWidth, setWindowWidth } from "../../../entities/windoWidth-slice";
import { Col, Row } from "antd";
import Audit from "../../../entities/Analitic/Audit";
import AnaliticChart from "../../../entities/Analitic/AnaliticChart";
import { selectTheme } from "../../../entities/setting-slice";
import { AnaliticCalc } from "../../../entities/Analitic/AnaliticCalc";
import { useWindowSize } from "../../../shared/hooks/useWindowSize";

const Analytics = () => {

  useWindowSize();
  const dispatch = useDispatch();
  const windowWidth = useSelector(selectWindowWidth);
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const [isDesktop, setIsDesktop] = useState(false); 

  useEffect(() => {
    const initialState = async () => {
        try {if(!user) {throw Error}
        const dataExpenses = await getExpenses(user);
        dispatch(setExpenses(dataExpenses));
        const dataIncomes = await getIncomes(user!);
        dispatch(setIncomes(dataIncomes));
        } catch (error) {
        console.error('Ошибка при загрузке данных', error);
        notifyError();
        return []
    }};
    initialState();
  }, [dispatch, user]); 

  useEffect(() => {
    setIsDesktop(windowWidth >= 1050);
  }, [windowWidth])

  return (
    <>
    { isDesktop ? (
      <Row align="stretch" className={`${theme === 'light' ? 'light' : 'dark'}`}>
        <Col span={12} style={{padding: '20px'}}>
        <div style={{height: '500px'}}>
          <DualChart />   
        </div>
        <AnaliticCalc/>
        </Col>
        <Col span={12} style={{padding: '70px 20px'}}>  
          <div style={{height: '531px'}}>
            <AnaliticChart/>
          </div>
        </Col>
        <Col span={24}>
          <Audit/> 
        </Col>
      </Row> 
      ) : (
      <Row justify="center" className={`${theme === 'light' ? 'light' : 'dark'}`}>
        <Col span={24}>
          <DualChart/>
          <AnaliticCalc/>
          <AnaliticChart/>
          <Audit/> 
        </Col>
      </Row>
      )
    }
    </>
  )
}

export default Analytics