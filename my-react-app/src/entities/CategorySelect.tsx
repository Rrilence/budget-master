import { CarFilled, CoffeeOutlined, GiftFilled, GlobalOutlined, HeartFilled, HomeFilled, LoadingOutlined, MedicineBoxFilled, QqOutlined, ShoppingCartOutlined, SkinFilled, SmileFilled, TruckFilled, WifiOutlined } from "@ant-design/icons";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";
import { selectData } from "./setting-slice";
import React from "react";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

const CategorySelect = () => {

    const settings = useSelector(selectData);

    const getCategoryIcon = (category: string): { 
    Icon: React.ComponentType; 
    color: string 
  } => {
    const icons: Record<string, { Icon: React.ComponentType<AntdIconProps>; color: string }> = {
      'Дом': { Icon: HomeFilled, color: '#cc1616ff' },
      'Продукты': { Icon: ShoppingCartOutlined, color: '#2656e9ff' },
      'Здоровье': { Icon: MedicineBoxFilled, color: '#14bc14ff' },
      'Одежда': { Icon: SkinFilled, color: '#7a068fff' },
      'Транспорт': { Icon: TruckFilled, color: '#e07314ff' },
      'Спорт': { Icon: HeartFilled, color: '#25eeb2ff' },
      'Досуг': { Icon: SmileFilled, color: '#e7f73aff' },
      'Путешествия': { Icon: GlobalOutlined, color: 'rgba(63, 175, 236, 1)' },
      'Машина': { Icon: CarFilled, color: '#9025eeff' },
      'Кафе': { Icon: CoffeeOutlined, color: '#6a390fff' },
      'Связь': { Icon: WifiOutlined, color: '#96e319ff' },
      'Домашние животные': { Icon: QqOutlined, color: '#281c13ff' },
      'Подарки': { Icon: GiftFilled, color: '#c828aaff' },
      'Другое': { Icon: LoadingOutlined, color: '#5aececff' }
    };
    
    return icons[category] || { Icon: <LoadingOutlined/>, color: '#888888' };
  };
  
  const selectOptions = settings?.category?.map(category => {
      const { Icon, color } = getCategoryIcon(category);
      const IconWithStyle = Icon as React.ComponentType<{ style?: React.CSSProperties }>;
        return {
        label: (
            <span>
            <IconWithStyle style={{ 
                    marginRight: 8, 
                    color, 
                    fontSize: 18 
                }} />
            {category}
            </span>
        ),
        value: category
        };
    }) || [];

    return (
        <Form.Item layout="vertical" name="category" label="Выберите категорию: " required style={{ marginBottom: '10px' }}>
        <Select
            options={selectOptions} />
            </Form.Item>
    );
};

export default CategorySelect