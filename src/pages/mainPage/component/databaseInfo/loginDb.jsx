import React from 'react';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';


// TODO需要点击事件，比如说选择数据源为ClickHouse，就在下边显示对应的登录表单
const LoginDB = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        label="key"
        name="key"
        rules={[
          {
            required: true,
            message: 'Please input your key!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="Host"
        name="Host"
        rules={[
          {
            required: true,
            message: 'Please input your url!',
          },
        ]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        label="Port"
        name="Port"
        rules={[
          {
            required: true,
            message: 'Please input your port!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="dataName"
        name="dataName"
        rules={[
          {
            required: true,
            message: 'Please input your dataBaseName!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="dataType"
        name="dataType"
        rules={[
          {
            required: true,
            message: 'Please input your dataType!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default LoginDB;