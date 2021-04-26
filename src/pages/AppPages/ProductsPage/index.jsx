import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ProductsStatus from 'components/AppComponents/ProductsStatus';

class LoginPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div>
                <Helmet title="商品管理" />
                <ProductsStatus />
            </div>
        );
    }
}

export default LoginPage;