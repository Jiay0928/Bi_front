import React,{useEffect} from 'react';
import "./index.less";
import {  Table } from 'antd';
export default function ValueTable({columnNames,dataList}) {
  return (
    <Table columns={columnNames} dataSource={dataList} />
  )
}
