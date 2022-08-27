/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState} from 'react';
import 'antd/dist/antd.css';
import {  Modal } from 'antd';
import {SwapOutlined } from '@ant-design/icons';
import {getDataBaseType, getDataBaseName, switchDataSource} from './model'
import { getTableList } from '../selectTableNameModal/model';
import "./index.less";
import SelectTableNameModal from '../selectTableNameModal';

export default function selectDbDiv(){
  const [visible, setVisible] = useState(false);
  const [modalTypeIndex, setModalTypeIndex] = useState(0);
  const [allDBType, setDBType] = useState([{dataType: 'clickHouse'},{dataType: 'clickHouse'}]);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [nameIndex, setnameIndex] = useState(0);
  const [allName, setName] = useState(['dada','ddddassa']);
  const [tableModalVisible, setTableModalVisible] = useState(false);
  

  const modalCreator = (optionList, title, visible, handleOk, handleCancel, handleSelect, selectIndex) => {
    return (
      <Modal 
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {optionList.map((value, index) => {
          
          return (
          <div key={index} className={'dbTypeContainer ' + (index === selectIndex ? 'selectedDb' : "")} onClick={() => handleSelect(index)}>
            {value}
          </div>
          )
        })}
        
      </Modal> 
    )

  }
  
  const showModal = async() => {
    let switchData = await switchDataSource();
    if (switchData.status === 200){
      getDataBaseType().then(
        response => {
          if (response.status === 200) {
            setDBType(response.data.data);
            setVisible(true);
          }
        })
  
        .catch((err) => {
          console.log('getDataBaseType', err)
          // setVisible(true)
          }
        ) 

    }
    
  };
  
  const handleCancel = () => {
    setVisible(false);
  };


  const handleOk = () => {
      setVisible(false);
      
      getDataBaseName().then(response => {
        if (response.status === 200) {
          setName(response.data.data);
          setNameModalVisible(true);
        }
      })
      .catch((err) => {
        console.log('getDataBaseType', err);
        setNameModalVisible(true);
        }
      ) 
  
  };
  const handleNameSelectOk = () => {
    setNameModalVisible(false);
    getTableList().then(response => {
      if (response.status === 200) {
        setTableModalVisible(true);
      }

    }).catch(
      err => {
        console.log('nameSelectError', err)
        // setTableModalVisible(true);
      }
      
    )
    
  }
  const handleNameSelectCancel = () => {
    setNameModalVisible(false);

  }

  return (
    <>
      <div type="primary" onClick={showModal} style={{cursor: 'pointer'}}>
        <SwapOutlined />
      </div>
      {modalCreator(allDBType.map(value => value.dataType), "数据源选择", visible, handleOk, handleCancel, setModalTypeIndex, modalTypeIndex)}
      {modalCreator(allName, "数据库选择", nameModalVisible, handleNameSelectOk, handleNameSelectCancel, setnameIndex, nameIndex)}
      <SelectTableNameModal visible={tableModalVisible} setVisibility={setTableModalVisible}/>
    </>
  );
};
