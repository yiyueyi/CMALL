import React, { Component } from 'react';
import Helmet from 'react-helmet';
import AllUserStatus from 'components/AppComponents/AllUserStatus';


class UserList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
            <div>
                <Helmet title="用户列表" />
                <AllUserStatus/>
            </div>
        );
    }
}

export default UserList;