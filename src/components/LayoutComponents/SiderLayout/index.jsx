import React from 'react';
import 'antd/dist/antd.min.css'
import { Layout } from 'antd';
import MenuTop from 'components/LayoutComponents/MenuTop'
import MenuLeft from 'components/LayoutComponents/MenuLeft'
import Routes from 'routes';
import './index.scss'

const { Header, Content, Sider, Footer } = Layout;

class SiderLayout extends React.Component {

    state = {
        collapsed: false,
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <MenuTop />
                </Header>
                <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <MenuLeft />
                </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content className="site-layout-background"
                                 style={{
                                     padding: 24,
                                     margin: 0,
                                     minHeight: 200,
                                 }}>
                            <Routes />
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default SiderLayout;