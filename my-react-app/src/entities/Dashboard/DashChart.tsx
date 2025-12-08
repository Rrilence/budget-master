import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";
import { selectExpenses } from "../Expenses/expenses-slice";
import { useEffect, useMemo, useState } from "react";
import { formatAmount } from "../../shared/formatting";

interface InfoDashChart {
    type: string,
    label?: string,
    value: number,
}

interface DashProps {
  sumExpenses: number
}

const DashChart = ({sumExpenses}: DashProps) => {
  
  const initialDash = useMemo(() => (
    [
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
      ]
  ), [])

  const expenses = useSelector(selectExpenses);
  const [data, setData] = useState<InfoDashChart[]>(initialDash);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLegend, setIsLegend] = useState(false);

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
  }, [expenses, initialDash])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    setIsLegend(windowWidth >= 720);
  }, [windowWidth])

  const legendConfig = isLegend
  ? {color: {
      title: false,
      position: 'right',
      crossPadding: 40,
      rowPadding: 5,
      itemMarkerFill: ({ label }: InfoDashChart) => {
      if (label === 'Дом') {
        return '#cc1616ff';
      } else if (label === 'Продукты') {
        return '#2656e9ff';
      } else if (label === 'Здоровье') {
        return '#14bc14ff';
      } else if (label === 'Одежда') {
        return '#7a068fff';
      } else if (label === 'Транспорт') {
        return '#e07314ff';
      } else if (label === 'Спорт') {
        return '#25eeb2ff';
      } else if (label === 'Досуг') {
        return '#e7f73aff';
      } else if (label === 'Путешествия') {
        return 'rgba(63, 175, 236, 1)';
      } else if (label === 'Машина') {
        return '#9025eeff';
      } else if (label === 'Кафе') {
        return '#6a390fff';
      } else if (label === 'Связь') {
        return '#96e319ff';
      } else if (label === 'Домашние животные') {
        return '#281c13ff';
      } else if (label === 'Подарки') {
        return '#c828aaff';
      } else if (label === 'Другое') {
        return '#5aececff';
      }
    }
  }}
  : false;



  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: legendConfig,
    annotations: [
      {
        type: 'text',
        style: {
          text: `${formatAmount(sumExpenses)}`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: isLegend ? 16 : 13,
          fontStyle: 'bold',
        },
      },
    ],
    style: {
      fill: ({ type }: InfoDashChart) => {
        if (type === 'Дом') {
          return '#cc1616ff';
        } if (type === 'Продукты') {
          return '#2656e9ff';
        } if (type === 'Здоровье') {
          return '#14bc14ff';
        } if (type === 'Одежда') {
          return '#7a068fff';
        } if (type === 'Транспорт') {
          return '#e07314ff';
        } if (type === 'Спорт') {
          return '#25eeb2ff';
        } if (type === 'Досуг') {
          return '#e7f73aff';
        } if (type === 'Путешествия') {
          return 'rgba(63, 175, 236, 1)';
        } if (type === 'Машина') {
          return '#9025eeff';
        } if (type === 'Кафе') {
          return '#6a390fff';
        } if (type === 'Связь') {
          return '#96e319ff';
        } if (type === 'Домашние животные') {
          return '#281c13ff';
        } if (type === 'Подарки') {
          return '#c828aaff';
        } if (type === 'Другое') {
          return '#5aececff';
        }
      },
    },
  };
  return <Pie {...config} height={320}/>;
};

export default DashChart