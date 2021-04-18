import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import RoutersMenu from 'constants/RoutersMenu.js'

class MenuLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const ROUTER_MENU = Object.values(RoutersMenu.ROUTER_MENU)
        return (
            <div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    {ROUTER_MENU.map(({ title, key }) => {
                        return <Menu.Item key={key}>
                            <Link to={key}>
                                {title}
                            </Link>
                        </Menu.Item>;
                    })}
                </Menu>
            </div>
        );
    }
}

export default MenuLeft;

