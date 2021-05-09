import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import RegisterServers from 'services/RegisterServers';
import AppConstants from 'constants/AppConstants';
import RoutersMenu from 'constants/RoutersMenu'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish = (values) => {
        RegisterServers.setRegisterServer({
            userName: values.userName,
            password: values.passWord,
            nickName: values.nickName,
            avatar: ''
        }).then((res) => {
            if(AppConstants.SERVE_STATYS_ERROR === res.code) {
                message.error(res.message)
            }
            if(AppConstants.SERVE_STATYS_SUCCESS === res.code) {
                message.success('注册成功')
                history.push(RoutersMenu.ROUTER_MENU['/login'].key);
            }
        });
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

        return (
            <div>
                <Form {...layout} name="nest-messages"
                    onFinish={this.onFinish}>
                    <Form.Item name="nickName"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="userName"
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