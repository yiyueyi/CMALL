import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import AddUserModol from './AddUserModol';

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
            <div>
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