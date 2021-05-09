import React, { Component } from 'react';
import _ from 'lodash';
import { Button, message, Popconfirm } from 'antd';
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

    handleDelUser = () => {
        const { ids } = this.props;
        if (!(0 === ids.length)) {
            ids.forEach((id) => {
                this.props.onDelId(id)
            });
        } else {
            message.warning('请选择用户');
        }
    }

    handleDelUserQ = () => {}

    render() {

        const { onReload } = this.props

        return (
            <div className='mb_3'>
                <Button onClick={this.handleAddUser}>
                    添加新用户
                </Button>
                <Popconfirm title="是否要删除?"
                            onConfirm={this.handleDelUser}
                            onCancel={this.handleDelUserQ}
                            okText="确认"
                            cancelText="取消">
                    <Button type='primary'
                            danger>
                        删除
                    </Button>
                </Popconfirm>
                <AddUserModol ref={ref => this.addUserModol = ref}
                    onReload={onReload} />
            </div>
        );
    }
}

export default UserListPanel;