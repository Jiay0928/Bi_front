import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import SelectMenu from './selectMenu.jsx';
import DatabaseInfo from '../databaseInfo/databaseinfo.jsx';
import LoginDB from '../databaseInfo/loginDb'


// 选择数据源组件，需要点击事件触发下一个选择数据表组件
const selectDb = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {

    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <FileAddOutlined/>
      </Button>
      <Modal
        title="选择数据源"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p><SelectMenu/></p>
        <DatabaseInfo/>
        <br /><br />
        <LoginDB/>
      </Modal>
    </>
  );
};

export default selectDb;