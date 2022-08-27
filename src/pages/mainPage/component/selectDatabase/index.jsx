/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { getDataBaseType, getDataBaseName, switchDataSource } from './model'
import { getTableList } from '../selectTableNameModal/model';
import "./index.less";
import SelectTableNameModal from '../selectTableNameModal';

export default function selectDbDiv() {


  const [visible, setVisible] = useState(false);


  const [modalTypeIndex, setModalTypeIndex] = useState(0);
  const [allDBType, setDBType] = useState([{ dataType: 'clickHouse' }]);


  const [nameModalVisible, setNameModalVisible] = useState(false);

  const [formVisible, setFormVisible] = useState(false);

  const [nameIndex, setnameIndex] = useState(0);
  const [allName, setName] = useState(['dada', 'ddddassa']);
  const [tableModalVisible, setTableModalVisible] = useState(false);

  //  const [key, setIKey] = useState('');
  //  const [url, setUrl] = useState('');
  //  const [portValue, setPortValue] = useState('');
  //  const [dataNameValue, setDataNameValue] = useState('');
  //  const [usernameValue, setUsernameValue] = useState('');
  //  const [passwordValue, setPasswordValue] = useState('');
  //  const [dataTypeValue, setDataTypeValue] = useState('');

  const valuess = { a: 4 }

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
            
            <div key={index} className={'dbTypeContainer ' + (index === selectIndex ? 'selectedDb' : "")}
            onClick={() => {handleSelect(index);formhandleShow()&&setFormVisible(false)}}>
              
              {value}
            </div>
          )
        })}

      </Modal>
    )

  }

  const formCreator2 = (title, visible, handleOk, handleCancel, selectIndex) => {
    let optionList = ["key", "url", "port", "dataName", "username", "password", "dataType"]
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {optionList.map((value, index) => {

          return (
            <div>
              <br />
              <input key={index} className="ant-input" placeholder={value} id={value + 'Value'} />
            </div>
          )
        })}

      </Modal>
    )

  }
  const formhandleShow = () => {
    setFormVisible(true)
  };

  const showModal = async (key, url, port, dataName, username, password, dataType) => {
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
  };
  const formhandleOk = () => {
    setFormVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  const handleOk = () => {
    setVisible(false);
    let $$ = (id) => { return document.getElementById(id + "Value")?.value }
    switchDataSource($$("key"), $$("url"), $$("port"), $$("dataName"), $$("username"), $$("password"), $$("dataType"))
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
      <div type="primary" onClick={showModal} style={{ cursor: 'pointer' }}>
        <SwapOutlined />
      </div>

      {modalCreator(allDBType.map(value => value.dataType), "数据源选择", visible, handleOk, handleCancel, setModalTypeIndex, modalTypeIndex)}
      {modalCreator(allName, "数据库选择", nameModalVisible, handleNameSelectOk, handleNameSelectCancel, setnameIndex, nameIndex)}
      {formCreator2("数据源信息", formVisible, formhandleOk, formhandleOk, 0)}
      <SelectTableNameModal visible={tableModalVisible} setVisibility={setTableModalVisible}
      datasourceType={allDBType[modalTypeIndex]?.dataType} dbName={allName[nameIndex]}
      />
    </>
  );
};
