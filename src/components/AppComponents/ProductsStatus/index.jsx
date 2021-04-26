import React, { Component } from 'react';
import ProductsTab from './ProductsTab';

class ProductsStatus extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
            <div>
                <ProductsTab />
            </div>
        );
    }
}

export default ProductsStatus;