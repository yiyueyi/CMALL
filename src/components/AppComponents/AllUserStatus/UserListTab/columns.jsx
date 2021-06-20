import React from 'react';
import { Button } from 'antd';

const getColumns = that => {
    return [
        
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
            render: (avatar) => <img style={{ width: '50px' }} src={avatar} alt="没图" />
        },
        {
            title: '用户名',
            dataIndex: 'nickName',
            key: 'nickName',
            align: 'center'
        },
        {
            title: '用户账号',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center'
        },
        {
            title: '用户密码',
            dataIndex: 'password',
            key: 'password',
            align: 'center',
            render: (password) => {
                return (
                    <div>
                        暂不支持查看
                    </div>
                );
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (createdAt) => <div>
                <span>
                    {createdAt.split('T')[0]}
                </span>
                <br/>
                <span>
                    {createdAt.split('T')[1].substring(0, createdAt.split('T')[1].length - 8)}
                </span>
            </div>
        },
        {
            title: '更改时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center',
            render: (updatedAt) => <div>
                <span>
                    {updatedAt.split('T')[0]}
                </span>
                <br/>
                <span>
                    {updatedAt.split('T')[1].substring(0, updatedAt.split('T')[1].length - 8)}
                </span>
            </div>
        },
        {
            title: '操作',
            dataIndex: '_id',
            key: '_id',
            align: 'center',
            render: (_id) => <div>
                <Button block
                        onClick={() => that.handleInformation(_id)}
                        size="small">
                    查看详情
                </Button>
                <br/>
                <br/>
                <Button block
                        type='primary'
                        danger
                        onClick={() => that.handleDelUserState(_id)}
                        size="small">
                    一键删除
                </Button>
            </div>,
            width: '15%'
        },
    ];
};

export default getColumns;
