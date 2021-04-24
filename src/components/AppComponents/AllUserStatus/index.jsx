import React, { Component } from 'react';
import UserListTab from './UserListTab';


class AllUserStatus extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
            <div>
                <UserListTab/>
            </div>
        );
    }
}

export default AllUserStatus;