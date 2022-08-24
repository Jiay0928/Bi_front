import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';


// 数据源下拉菜单组件
const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log('search:', value);
};

const selectMenu = () => (
  <Select
    showSearch
    placeholder="Select a DataBase"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
  >
    <Option value="ClickHouse">ClickHouse</Option>
    <Option value="Oracel" disabled>Oracel</Option>
    <Option value="MySQL" >MySQL</Option>
  </Select>
);

export default selectMenu;