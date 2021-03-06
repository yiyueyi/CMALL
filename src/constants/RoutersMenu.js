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
    title: '首页',
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
  //用户列表
  '/userList': {
    title: '用户列表',
    route: 'pages/AppPages/UserList',
    key: '/userList',
    icon: <NotificationOutlined />,
    component: loadable(() => import('pages/AppPages/UserList')),
  },
  //商品列表
  '/products': {
    title: '商品列表',
    route: 'pages/AppPages/products',
    key: '/products',
    icon: <NotificationOutlined />,
    component: loadable(() => import('pages/AppPages/ProductsPage')),
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
