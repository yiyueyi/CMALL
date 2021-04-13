import React from 'react';
import Helmet from 'react-helmet';
import Error404 from './Error404';

class Error404Page extends React.Component {
    
    render() {
        return (
            <div>
                <Helmet title="404"/>
                <Error404/>
            </div>
        );
    }
}

export default Error404Page;
