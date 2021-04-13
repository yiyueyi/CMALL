import React from 'react';
import ReactDOM from 'react-dom';

if(module.hot) {
    module.hot.accept(error=>{
        if(error) {
            console.log('热更新出现问题请及时联系管理员')
        }
    })
}

ReactDOM.render(
    <div>
        1232223sagasgasg
    </div>,
    document.getElementById('root')
);

