import React, { Component } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish = (values) => {
        console.log(values);
    };

    render() {

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };

        return (
            <div>
                <Form {...layout} name="nest-messages"
                    onFinish={this.onFinish}>
                    <Form.Item name={['user', 'name']}
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'name']}
                        label="账号"
                        rules={[
                            {
                                required: true,
                                message: '请输入账号!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码"
                        name="passWord"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="请再次输入密码"
                        name="RepeatPassWord"
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码!',
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary"
                            htmlType="submit">
                            点击注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Register;