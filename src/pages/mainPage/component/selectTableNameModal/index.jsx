import React, {useState, useEffect} from 'react';
import {  Modal, Menu } from 'antd';
import { DatabaseOutlined} from '@ant-design/icons';
import {getTableList, getTableInfo, getDataSetId} from './model';
import {SET_DATASETID, updateDatabaseInfo} from '../../../../redux/action';
import './index.less'
export default function SelectTableNameModal({dispatch, visible, setVisibility,datasourceType, dbName }) {
  const [selectName, setSelectName] = useState([]);
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState("");
  
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  function getSubItem(value,parent) {
    return {
      label: value,
      key: value,
      
    }
  }
  let handleOk = async() => { 
      let payload = {
        "name": '新建数据集',
        "descr":"数据集描述",
        "dataSourceType": datasourceType,
        "dbName":dbName,
        "tableName":parent,
        "schema":
           selectName.map(value => {
              return (
            {name: value}
            );
           })
        ,
          "createUser":"xx"
      }
      try{
        let response = await getDataSetId(payload);
        if (response.status === 200) {
            dispatch({
              action: SET_DATASETID,
              payload: response.data.dataSetId,}
            )
            dispatch(updateDatabaseInfo())
        }
      }catch(e) {
        console.log(e);
      }
      setVisibility(false);
  }
  let handleCancel = () => {
    setVisibility(false);
  }
  let onSelect = (e) => {
      setSelectName(e.selectedKeys);
      let parentIndex = new Number(e.keyPath[1]);
      setParent(items[parentIndex].label);
      
  }
  let onDeselect = (e) => {
    setSelectName(e.selectedKeys);

  }
  const onOpenChange = async (keys) => {
     if (keys !== []){
      let key = new Number(keys[keys.length -1]);
      if (items[key].children.length === 0){
        let tableName = items[key].label;
        try{
        let response = await getTableInfo(datasourceType, dbName,tableName);
        if (response.status === 200){
          let children = response.data.data;
          let itemCopy = [...items]
          itemCopy[key].children = children.map(value => getSubItem(value, key))
          setItems(itemCopy);

        }
      }catch(e){
        console.log("selectTableNameError", e);
        //  remember to delete 
        // let children = ['we','ew']
        //   let itemCopy = items.slice(0, items.length);
        //   itemCopy[key].children = children.map(value => getSubItem(value, key))
        //   setItems(itemCopy);
      }
      }
     }
  };

  useEffect(() => {
    getTableList(datasourceType, dbName).then(
      (response) => {
        if (response.status === 200){
          let allTables = response.data.data;
          let tempItems = allTables.map(
            (value, index) => 
            getItem(value, index, <DatabaseOutlined />, [] ))
            setItems(tempItems)
        }

      }
    )
  }, [])

  
  return (
    <Modal 
      title= "选择数据"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      
    >
      <div className='modalContainer'>
        <Menu id='help'
          mode="inline"
          onOpenChange={onOpenChange}
          style={{
            width: 256,
          }}
          items={items}
          multiple={true}
          onSelect={onSelect}
          onDeselect={onDeselect}
          
        />
        <div className='selectContainer'>
            {selectName.map(value => {
              return (
                <div>
                  {value}
                </div>
              )
            })}
          </div>
      </div>
      
    
  </Modal> 
  )
}
