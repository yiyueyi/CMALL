import React, { Component } from 'react';
import history from 'routerHistory';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { setUserToken } from 'ducks/user';
import RegisterServers from 'services/RegisterServers';
import RoutersMenu  from 'constants/RoutersMenu';
import AppConstants from 'constants/AppConstants';

const mapStateToProps = (res) => ({
});
const mapDispatchToProps = (dispatch) => ({
    setUserToken: (state) => {
        dispatch(setUserToken(state));
    }
});

// @connect(mapStateToProps, mapDispatchToProps)
class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onLoginFinish = (values) => {
        RegisterServers.setLoginServer({
            userName: values.userName,
            password: values.passWord,
        }).then((res) => {
            if(AppConstants.SERVE_STATYS_SUCCESS === res.code) {
                this.props.setUserToken(res.token);
                message.success('登录成功');
                history.push(RoutersMenu.ROUTER_MENU['/home'].key);
            }else {
                message.error(res.message)
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
                    onFinish={this.onLoginFinish}>
                    <Form.Item label="账号"
                        name="userName"
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

export default connect(mapStateToProps, mapDispatchToProps) (LoginTab);