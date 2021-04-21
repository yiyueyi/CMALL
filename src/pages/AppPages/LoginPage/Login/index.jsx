import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const layout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <div className='login_box'>
                <Form {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onLoginFinish}
                    onFinishFailed={this.onFinishFailed}>
                    <Form.Item label="账号"
                        name="账号"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your 请输入您的账号!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码"
                        name="passWord"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your 请输入密码!',
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;