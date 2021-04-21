import React from 'react';
import Loadable from 'react-loadable'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const loadable = (loader, param) =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
    param: param,
  })

const ROUTER_MENU = {
  // 首页
  '/home': {
    title: '首页1111111',
    route: 'pages/AppPages/HomePage',
    key: '/home',
    icon: <LaptopOutlined />,
    component: loadable(() => import('pages/AppPages/HomePage')),
  },
  // 登录
  '/login': {
    title: '登录',
    route: 'pages/AppPages/LoginPage',
    key: '/login',
    icon: <UserOutlined />,
    component: loadable(() => import('pages/AppPages/LoginPage')),
  },
  // 重定向
  '/404': {
    title: '404',
    route: 'pages/DefaultPages/Error404Page',
    key: '/404',
    icon: <NotificationOutlined />,
    component: loadable(() => import('pages/DefaultPages/Error404Page')),
  },
}

export default {
  ROUTER_MENU,
}
