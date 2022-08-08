import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';


//选择数据表最上面的搜索框
const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log('search:', value);  
};

const SelectTable = () => (
  <Select
    showSearch
    placeholder="Select a database"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
  >
    {/* 
        这里应该是类似搜索框的东西
    */}
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
);

export default SelectTable;