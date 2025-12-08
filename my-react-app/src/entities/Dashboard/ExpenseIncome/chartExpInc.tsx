import { BidirectionalBar, Column } from "@ant-design/plots";
import { useSelector } from "react-redux";
import { selectExpenses } from "../../Expenses/expenses-slice";
import { selectIncomes } from "../../Incomes/incomes-slice";


interface ExpIncProps {
  period: string
}

const ChartExpInc = ({period}: ExpIncProps) => {

  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);

  

  return (

  )
} 

export default ChartExpInc

const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.24 },
  { type: '31-60秒', value: 0.19 },
  { type: '1-3分', value: 0.22 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

const DemoColumn = () => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    shapeField: 'column25D',
    style: {
      fill: 'rgba(126, 212, 236, 0.8)',
    },
  };
  return <Column {...config} />;
};

const DemoBidirectionalBar = () => {
  const data = [
    {
      country: '乌拉圭',
      '2016年耕地总面积': 13.4,
      '2016年转基因种植面积': 12.3,
    },
    {
      country: '巴拉圭',
      '2016年耕地总面积': 14.4,
      '2016年转基因种植面积': 6.3,
    },
    {
      country: '南非',
      '2016年耕地总面积': 18.4,
      '2016年转基因种植面积': 8.3,
    },
    {
      country: '巴基斯坦',
      '2016年耕地总面积': 34.4,
      '2016年转基因种植面积': 13.8,
    },
    {
      country: '阿根廷',
      '2016年耕地总面积': 44.4,
      '2016年转基因种植面积': 19.5,
    },
    {
      country: '巴西',
      '2016年耕地总面积': 24.4,
      '2016年转基因种植面积': 18.8,
    },
    {
      country: '加拿大',
      '2016年耕地总面积': 54.4,
      '2016年转基因种植面积': 24.7,
    },
    {
      country: '中国',
      '2016年耕地总面积': 104.4,
      '2016年转基因种植面积': 5.3,
    },
    {
      country: '美国',
      '2016年耕地总面积': 165.2,
      '2016年转基因种植面积': 72.9,
    },
  ];
  const config = {
    data,
    xField: 'country',
    layout: 'vertical',
    style: {
      fill: (d) => {
        if (d.groupKey === '2016年转基因种植面积') return '#64DAAB';
        return '#6395FA';
      },
    },
    yField: ['2016年耕地总面积', '2016年转基因种植面积'],
  };
  return <BidirectionalBar {...config} />;
};