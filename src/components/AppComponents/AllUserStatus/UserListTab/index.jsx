import React, { Component } from 'react';
import { Table } from 'antd';
import getColumns from './columns';
import InformationServer from 'services/InformationServer';

class UserListTab extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            columns: getColumns(this),
        }
    }

    componentDidMount() {
        InformationServer.setAdminUsers().then(({users}) => {
            this.setState({ dataSource: users })
        });
    }

    render() {
        const { dataSource, columns } = this.state;
        return (
            <div>
                <Table rowKey='_id'
                       bordered
                       dataSource={dataSource} 
                       columns={columns} />
            </div>
        );
    }
}

export default UserListTab;