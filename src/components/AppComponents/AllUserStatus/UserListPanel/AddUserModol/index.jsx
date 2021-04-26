import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import RegisterServers from 'services/RegisterServers';
import Modal from 'components/Widgets/Modal/WithModal';
import AppConstants from 'constants/AppConstants';

class AddUserModol extends Component {

    constructor(props) {
        super(props);
        this.props.getInstance(this);
        this.state = {

        }
    }

    onFinish = (values) => {
        const { onReload } = this.props
        RegisterServers.setRegisterServer({
            userName: values.userName,
            password: values.passWord,
            nickName: values.nickName,
            avatar: ''
        }).then((res) => {
            if (AppConstants.SERVE_STATYS_ERROR === res.code) {
                message.error(res.message)
            }
            if (AppConstants.SERVE_STATYS_SUCCESS === res.code) {
                message.success('添加成功');
                this.props.closeModal();
                onReload()
            }
        });
    };

    render() {

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 32,
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
                            点击添加
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Modal({ title: '添加用户', width: 400, maskClosable: false, footer: null, modalProps: { centered: true } })(AddUserModol);