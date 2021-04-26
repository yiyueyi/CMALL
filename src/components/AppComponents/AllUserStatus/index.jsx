import React, { Component } from 'react';
import UserListTab from './UserListTab';
import UserListPanel from './UserListPanel';


class AllUserStatus extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    onReload = () => {
        this.userListTab.loadRecords()
    }

    render() {

        return (
            <div>
                <UserListPanel onReload={this.onReload}/>
                <UserListTab ref={ref => this.userListTab = ref}/>
            </div>
        );
    }
}

export default AllUserStatus;