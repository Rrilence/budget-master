import { startTransition, useActionState, useEffect, useRef, useState, type Key } from "react"
import { Button, Input, Space, Table, type InputRef, type TableColumnType } from "antd"
import { defaultState, submitCourse } from "../api"
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { InfoCourse } from "../../../shared/types";

import styles from './styles.module.css'

const Exchange = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [courseState, dispatch] = useActionState(submitCourse, defaultState)
    
    const dataSource = courseState.data.map((item) => (
        {
            key: item.ID,
            code: item.CharCode,
            name: item.Name,
            value: item.Value,
        }
    ))

    type DataIndex = keyof InfoCourse;

    const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<InfoCourse> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined, fontSize: '14px' }} />
    ),
    onFilter: (value: boolean | Key, record: InfoCourse) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open: boolean) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#8b98fdff', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : ( text ),
  });
    
    const columns = [
        {title: 'Код', dataIndex: 'code'},
        {title: 'Название',
        dataIndex: 'name',
        ...getColumnSearchProps('name')
        },
        {title: 'Курс', dataIndex: 'value'},
    ]


    useEffect(() => {
        startTransition(() => dispatch())
    }, [])

    return (
            <div className={styles.container}>
                <h3 className={styles.title}>Курсы валют ЦБ РФ</h3>
              <div className={styles.update}>
                <p>Обновлено:</p>
                <p>{courseState.dateExchange}</p>
              </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
    )

}

export default Exchange