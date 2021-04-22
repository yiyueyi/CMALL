import React from 'react';
import { Route } from 'react-router-dom';
import Home from 'pages/AppPages/HomePage';
import RoutersMenu from 'constants/RoutersMenu'

class Routes extends React.Component {


    render() {
        const ROUTER_MENU = RoutersMenu.ROUTER_MENU
        return (
            <div style={{ minHeight: 360 }}>
                <Route exact path='/' component={Home} />
                {Object.values(ROUTER_MENU).map(({ key }) => {
                    const { exact, ...props } = ROUTER_MENU[key];
                    props.exact = exact === void 0 || exact || false;
                    return <Route key={key} path={key} {...props} />;
                })}
                {/* <Route
                    render={() => (
                        <Error404Page />
                    )}
                /> */}
            </div>
        );
    }
}

export default Routes;
