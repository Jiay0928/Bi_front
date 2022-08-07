import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Divider } from 'antd';
import TableList from './tableList'

// 数据表组件  TODO（需要点击数据源之后进行触发）
const databaseInfo = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                选择数据表
            </Button>
            <Modal
                title="选择数据表"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <TableList/>
            </Modal>
        
        </>
    );
};

export default databaseInfo;