import React, { useState ,useEffect} from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import {SwapOutlined } from '@ant-design/icons';
import SelectMenu from './selectMenu.jsx';
import DatabaseInfo from '../databaseInfo/databaseinfo.jsx';
import LoginDB from '../databaseInfo/loginDb';
import {getDataBaseType, getDataBaseName} from './model'
import "./index.less";
import { setCanvasCreator } from 'echarts';

// 选择数据源组件，需要点击事件触发下一个选择数据表组件
const selectDbDiv = () => {
  const [visible, setVisible] = useState(false);
  const [modalTypeIndex, setModalTypeIndex] = useState(0);
  const [allDBType, setDBType] = useState([{dataSourceName: 'clickHouse'},{dataSourceName: 'clickHouse'}]);
  const [allDBName, setAllDBName] = useState({})

  const modalCreator = (optionList, visible, handleOk, handleCancel, handleSelect) => {
    return (
      <Modal
        title="选择数据源"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {optionList.map((value, index) => {
          return (
          <div key={index} className={'dbTypeContainer ' + (index === modalTypeIndex ? 'selectedDb' : "")} onClick={() => handleSelect(index)}>
            {value.dataSourceName}
          </div>
          )
        })}
        
      </Modal> 
    )

  }
  
  const showModal = () => {
    getDataBaseType().then(
      response => {
        if (response.status === 200) {
          setDBType(response.data.data);
          setVisible(true);
        }
      
      })

      .catch((err) => {
        console.log('getDataBaseType', err)
        setVisible(true)
        }
        
      ) 
  };

  const handleOk = () => {
      setVisible(false);
  
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div type="primary" onClick={showModal} style={{cursor: 'pointer'}}>
        <SwapOutlined />
      </div>
      {modalCreator(allDBType, visible, handleOk, handleCancel, (index) => setModalTypeIndex(index))}
    </>
  );
};

export default selectDbDiv;