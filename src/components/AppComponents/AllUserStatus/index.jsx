import React, { Component } from 'react';
import UserListTab from './UserListTab';
import UserListPanel from './UserListPanel';


class AllUserStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids: [],
        }
    }

    onReload = () => {
        this.userListTab.loadRecords()
    }

    onUserIds = (ids) => {
        this.setState({ ids: ids })
    }

    onDelId = (id) => {
        this.userListTab.handleDelUserState(id)
    }

    render() {
        const { ids } = this.state;
        return (
            <div>
                <UserListPanel onReload={this.onReload}
                               onDelId={this.onDelId}
                               ids={ids} />
                <UserListTab ref={ref => this.userListTab = ref}
                             onUserIds={this.onUserIds} />
            </div>
        );
    }
}

export default AllUserStatus;