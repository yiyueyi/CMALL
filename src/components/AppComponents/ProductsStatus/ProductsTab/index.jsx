import React, { Component } from 'react';
import { Table } from 'antd';
import InformationServer from 'services/InformationServer';
import TableUtils from 'utils/TableUtils';
import getColumns from './columns';

const PAGE_NO = 1;
const PAGE_SIZE = 10;

class ProductsTab extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            columns: getColumns(this),
            records: null,
            pagination: {},
            loading: false,
        }
    }

    componentDidMount() {
        this.loadRecords();
    }

    loadRecords = (pageNo = PAGE_NO, pageSize = PAGE_SIZE) => {
        let { pagination } = this.state;
        this.setState({ loading: true });
        InformationServer.setAdminProducts({
            per: pageSize,//每一页显示的数量
            page: pageNo,//当前页面默认1
            userName: '',//用户名
            nickName: ''//昵称
        }).then(({pages, totalCount, products}) => {
            console.log(products);
            pagination = _.assign({}, pagination, {
                pageNo: pages,//第几页
                pageSize: pageSize,//一页多少个
                total: totalCount//总条数
            });
            this.setState({ 
                loading: false,
                records: products,
                pagination: pagination,
            })
        })
    };

    render() {
        const { records, columns, pagination, loading } = this.state;
        return (
            <div>
                <Table rowKey='_id'
                       bordered
                       loading={loading}
                       dataSource={records} 
                       columns={columns}
                       pagination={TableUtils.showPaginationOptions(pagination)}
                    //    scroll={{ y: 760 }}
                       onChange={TableUtils.handleTableChange(this.loadRecords)}/>
            </div>
        );
    }
}

export default ProductsTab;