import Loadable from 'react-loadable'

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
    component: loadable(() => import('pages/AppPages/HomePage')),
  },
  // 登录
  '/login': {
    title: '登录',
    route: 'pages/AppPages/LoginPage',
    key: '/login',
    component: loadable(() => import('pages/AppPages/LoginPage')),
  },
  // 重定向
  '/404': {
    title: '404',
    route: 'pages/DefaultPages/Error404Page',
    key: '/404',
    component: loadable(() => import('pages/DefaultPages/Error404Page')),
  },
}

export default {
  ROUTER_MENU,
}
