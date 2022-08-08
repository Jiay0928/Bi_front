import React from 'react';
import 'antd/dist/antd.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Layout, Menu, Select } from 'antd';
import SelectTable from './selectTable';


//选择数据表的页面
const { Header, Content, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const TableList = () => (
  <Layout>
    {/* 
        模糊查询数据表
      */}
    <Header>
      <SelectTable/>
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >

      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
            }}
            items={items2}
          />
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          key[items]
        </Content>
      </Layout>
    </Content>
  </Layout>
);

export default TableList;