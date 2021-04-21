import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Tabs } from 'antd';
import Login from './Login';
import Register from './Register';

const { TabPane } = Tabs;

class LoginPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div>
                <Helmet title="登录" />
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane style={{ width: '530px', minHeight: 300 }}
                             tab="登录"
                             key="1">
                        <Login />
                    </TabPane>
                    <TabPane style={{ width: '530px', minHeight: 300 }}
                        tab="注册"
                        key="2">
                        <Register />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default LoginPage;