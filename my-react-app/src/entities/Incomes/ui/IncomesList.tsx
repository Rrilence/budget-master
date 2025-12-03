import { Button, DatePicker, Space, Table, type TableColumnsType } from "antd";
import dayjs from "dayjs";
import type { InfoIncome } from "../../../shared/types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectIncomes,  setIncomes, setinitialValues, setIsUpdateIncome } from "../incomes-slice";
import ModalIncomes from "./ModalIncomes";
import { notifyTransaction } from "../../../shared/toasts";
import { deleteIncome } from "../api/deleteIncome";
import { selectIsOpenModal, setIsOpenModal } from "../../Expenses/expenses-slice";
import { useStyles } from "../../../widgets/Exchange/hooks/useStyles";

dayjs.locale('ru');

const IncomesList = () => {
  const { styles } = useStyles();

    const dispatch = useDispatch();
    const dateFormat = 'DD.MM.YYYY';
    const incomes = useSelector(selectIncomes);
    const isOpenModal = useSelector(selectIsOpenModal);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const columns: TableColumnsType<InfoIncome> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name', 
        sorter: (a, b) => a.name.length - b.name.length,
    }, Table.EXPAND_COLUMN,
    {
        title: 'Стоимость',
        dataIndex: 'amount',
        key: 'amount', 
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
        width: '25%',
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date', 
        sorter: (a, b) => dayjs(a.date, dateFormat).valueOf() - dayjs(b.date, dateFormat).valueOf(),
        sortDirections: ['ascend', 'descend'],
        filterDropdown: ({ setSelectedKeys, confirm, selectedKeys }) => (
            <div style={{ padding: 8 }}>
                <DatePicker
                    onChange={(date) => {
                        if (date) {
                            setSelectedKeys([date.format(dateFormat)]);
                        } else {
                            setSelectedKeys([]);
                        }
                    }}
                    onOk={() => confirm()}
                    format={dateFormat}
                    value={selectedKeys[0] ? dayjs(String(selectedKeys[0]), dateFormat) : null
                    }
                    needConfirm
                />
            </div>
            ),
        onFilter: (value, record) => {
      return record.date === value; 
        },
        filterSearch: true,
        width: '25%',
    },
];

    const expandedRowRender = (record: InfoIncome) => {

        function onUpdate (record: InfoIncome) {
            if(record.id && record.user_id) {  
                dispatch(setIsUpdateIncome(true)); 
                dispatch(setIsOpenModal(true));
                dispatch(setinitialValues({
                    id: record.id,
                    user_id: record.user_id,
                    name: record.name,
                    amount: record.amount,
                    date: record.date,
                }));
            }
        }

        function onDelete (record: InfoIncome) {
                if(record.id && record.user_id) {
                    deleteIncome(record.id, record.user_id)
                    .then(() => {
                        const updateIncomes = incomes.filter(income => income.id !== record.id);
                        dispatch(setIncomes(updateIncomes));
                    })
                }
            }
        return (
            <Space>
            <Button type="default" size="small" onClick={() => onUpdate(record)}>Редактировать</Button>
            <Button danger size="small" onClick={() => onDelete(record)}>Удалить</Button>
            </Space>
        ) 
    };

    const onRow = (record: InfoIncome) => {
        return {
        onClick: () => {
            {
                if (record.id) {
                    const isExpanded = expandedRowKeys.includes(record.id);
                    setExpandedRowKeys(isExpanded ? [] : [record.id]);
                } else {
                    console.warn("record.id is undefined for this record:", record);
                    notifyTransaction();
                }
            }}
        }
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={incomes}
                className={styles.root}
                rowKey={(record) => record.id!}
                scroll={{ x: 'max-content' }}
                expandable={{
                    expandedRowRender,
                    rowExpandable: () => true,
                    expandedRowKeys,
                    onExpand: (expanded, record) => {
                        if (expanded) {
                            setExpandedRowKeys([record.id!]);
                        } else {
                            setExpandedRowKeys([]);
                        }
                    },
                }}
                onRow={onRow}
            />
            {isOpenModal && <ModalIncomes/>}
        </>
    )
}

export default IncomesList