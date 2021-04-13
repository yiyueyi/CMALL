import React from 'react';
import ReactDOM from 'react-dom';
import SiderLayout from 'components/LayoutComponents/SiderLayout';

if (module.hot) {
    module.hot.accept(error => {
        if (error) {
            console.log('热更新出现问题请及时联系管理员')
        }
    })
}

ReactDOM.render(
    <div>
        <SiderLayout/>
    </div>,
    document.getElementById('root')
);

