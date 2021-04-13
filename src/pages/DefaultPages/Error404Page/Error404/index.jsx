import React from 'react';
import { Result } from 'antd';

class Error404 extends React.Component {

    render() {
        return (
            <div className="page-404 card">
                <div className="card-body">
                    <Result status="404"
                            title="404"
                            subTitle="访问的页面或者资源不存在！"/>
                </div>
            </div>
        );
    }

}

export default Error404;
