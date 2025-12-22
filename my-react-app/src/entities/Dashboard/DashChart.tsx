import { Pie } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { useEffect, useMemo, useState } from "react";
import { formatAmount, getCategoryColor } from "../../shared/formatting";
import { selectTheme } from "../Theme/theme-slice";
import { selectWindowWidth, setWindowWidth } from "../windoWidth-slice";
import type { InfoDash } from "../../shared/types";
import { Typography } from "antd";

const { Text } = Typography;

interface DashProps {
  sumExpenses: number
}

const DashChart = ({sumExpenses}: DashProps) => {

  const initialDash = useMemo(() => [
    { type: 'Дом', value: 0},
    { type: 'Продукты', value: 0},
    { type: 'Здоровье', value: 0},
    { type: 'Одежда', value: 0},
    { type: 'Транспорт', value: 0},
    { type: 'Спорт', value: 0},
    { type: 'Досуг', value: 0},
    { type: 'Путешествия', value: 0},
    { type: 'Машина', value: 0},
    { type: 'Кафе', value: 0},
    { type: 'Связь', value: 0},
    { type: 'Домашние животные', value: 0},
    { type: 'Подарки', value: 0},
    { type: 'Другое', value: 0},
  ], []);
  
  const dispatch = useDispatch(); 
  const expenses = useSelector(selectExpenses);
  const [data, setData] = useState<InfoDash[]>(initialDash);
  const [isLegend, setIsLegend] = useState(false);

  const windowWidth = useSelector(selectWindowWidth);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const addExpenses = () => {
      const newDash = initialDash.map(item => ({...item}));
      expenses.forEach(expense => {
        newDash.forEach(item => {
          if(expense.category === item.type) {
            item.value += expense.amount
          }
        })
      })
      setData(newDash)
    }
    addExpenses()
    
  }, [expenses, initialDash, dispatch]);
  
  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
  
  useEffect(() => {
    setIsLegend(windowWidth >= 550);
  }, [windowWidth])

  const legendConfig = isLegend
  ? {color: {
      title: false,
      position: 'right',
      crossPadding: 40,
      rowPadding: 5,
      itemLabelFill: theme === 'light' ? '#000' : '#fff',
      itemMarkerFill: ({ label }: { label: string }) => getCategoryColor(label)
  }}
  : false;

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: false,
    legend: legendConfig,  
    annotations: [
      {
        type: 'text',
        style: {
          text: `${formatAmount(sumExpenses)}`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: windowWidth >= 450 ? 16 : 13,
          fontStyle: 'bold',
          fill: theme === 'light' ? '#000' : '#ffffffe9',
        },
      },
    ],
    style: {
      inset: 1.5,
      radius: 3,
      fill: ({ type }: { type: string }) => getCategoryColor(type),
    },
    tooltip: {
      items: [
        (d) => {
          return {
            value: formatAmount(d.value),
            name: d.type,
           color: getCategoryColor(d.type),
          };
        },
      ],
    },
  };
  return (
    <>
      <Text strong style={{fontSize: 17}}>Расходы за все время</Text>
      <Pie {...config} height={320}/>
    </>
);
};

export default DashChart