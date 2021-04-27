import React, { Component } from 'react';
import { Button } from 'antd';
import AddUserModol from './AddUserModol';
import './style.scss'

class UserListPanel extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleAddUser = () => {
        this.addUserModol.show();
    }

    render() {

        const { onReload } = this.props

        return (
            <div className='mb_3'>
                <Button onClick={this.handleAddUser}>
                    添加新用户
                </Button>
                <AddUserModol ref={ref => this.addUserModol = ref}
                              onReload={onReload}/>
            </div>
        );
    }
}

export default UserListPanel;