import React, { Component } from 'react';
import { Table, message } from 'antd';
import InformationServer from 'services/InformationServer';
import LangUtils from 'utils/LangUtils';
import TableUtils from 'utils/TableUtils';
import ModifyUserInformationModul from './ModifyUserInformationModul';
import getColumns from './columns';

const PAGE_NO = 1;
const PAGE_SIZE = 10;

class UserListTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: getColumns(this),
            records: null,
            pagination: {},
            onPersonalInformation: {},
            selectedRowKeys: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.loadRecords();
    }

    loadRecords = (pageNo = PAGE_NO, pageSize = PAGE_SIZE) => {
        let { pagination } = this.state;
        this.setState({ loading: true });
        InformationServer.setAdminUsers({
            per: pageSize,//每一页显示的数量
            page: pageNo,//当前页面默认1
            userName: '',//用户名
            nickName: ''//昵称
        }).then(({ pages, totalCount, users }) => {
            pagination = _.assign({}, pagination, {
                pageNo: pages,//第几页
                pageSize: pageSize,//一页多少个
                total: totalCount//总条数
            });
            this.setState({
                loading: false,
                records: users,
                pagination: pagination,
            })
        })
    };
    
    handleDelUserState = (id) => {
        InformationServer.delUserState(id).then((res) => {
            if(LangUtils.isNil(res)) {
                message.error('删除失败')
                this.loadRecords();
            }else {
                message.success('删除成功')
                this.loadRecords();
            }
        })
    }

    handleInformation = (id) => {
        InformationServer.getSomeUserData(id).then((res) => {
            this.setState({onPersonalInformation: res}, ()=> {
                this.modifyUserInformationModul.show()
            })
        })
    }

    render() {
        const { onUserIds } = this.props;
        const { records, columns, pagination, loading, onPersonalInformation } = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys
                }, () => {
                    onUserIds(this.state.selectedRowKeys);
                });
            }
        };
        return (
            <div>
                <Table rowKey='_id'
                    bordered
                    loading={loading}
                    dataSource={records}
                    columns={columns}
                    rowSelection={rowSelection}
                    pagination={TableUtils.showPaginationOptions(pagination)}
                    //    scroll={{ y: 760 }}
                    onChange={TableUtils.handleTableChange(this.loadRecords)} />
                <ModifyUserInformationModul ref={ref => this.modifyUserInformationModul = ref}
                                            onPersonalInformation={onPersonalInformation}/>
            </div>
        );
    }
}

export default UserListTab;