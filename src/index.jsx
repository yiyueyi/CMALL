import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import routerHistory from 'routerHistory';
import reducer from 'ducks';
import { Provider } from 'react-redux'
import SiderLayout from 'components/LayoutComponents/SiderLayout';
import 'moment/locale/zh-cn';

if (module.hot) {
    module.hot.accept(error => {
        if (error) {
            console.log('热更新出现问题请及时联系管理员')
        }
    })
}

const router = routerMiddleware(routerHistory);
const middlewares = [router, thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <SiderLayout />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

