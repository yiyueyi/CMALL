import React, { Component } from 'react';
import 'antd/dist/antd.min.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import MenuTop from 'components/LayoutComponents/MenuTop'
import MenuLeft from 'components/LayoutComponents/MenuLeft'
import Routes from 'routes';

const { Header, Content, Sider } = Layout;

class SiderLayout extends React.Component {

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <MenuTop />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <MenuLeft />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Routes />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default SiderLayout;