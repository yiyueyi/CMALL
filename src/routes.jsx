import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Error404Page from 'pages/DefaultPages/Error404Page';

const loadable = (loader, param) =>
    Loadable({
        loader,
        delay: false,
        loading: () => null,
        param: param
    });

const loadableRoutes = {
    // 首页
    '/home': {
        component: loadable(() => import('pages/AppPages/HomePage'))
    },
    // 登录
    '/login': {
        component: loadable(() => import('pages/AppPages/LoginPage'))
    },
    // 重定向
    '/redirect': {
        component: loadable(() => import('pages/DefaultPages/Error404Page'))
    },
    // {
    //     path: '/home',
    //     component: 'pages/AppPages/HomePage'
    // },
    // // 登录
    // {
    //     path: '/login',
    //     component: 'pages/AppPages/LoginPage'
    // },
    // // 404
    // {
    //     path: '/404',
    //     component: 'pages/DefaultPages/Error404Page'
    // },
};

class Routes extends React.Component {

    
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Error404Page}/>
                    {Object.keys(loadableRoutes).map(path => {
                        const { exact, ...props } = loadableRoutes[path];
                        props.exact = exact === void 0 || exact || false;
                        return <Route key={path} path={path} {...props}/>;
                    })}
                    <Route
                        render={() => (
                            <Error404Page/>
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export { loadableRoutes };
export default Routes;
