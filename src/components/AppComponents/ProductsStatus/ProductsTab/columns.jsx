import React from 'react';

const getColumns = that => {
    return [
        {
            title: '用户账号',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
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
            align: 'center'
        },
        {
            title: '最近更改',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center'
        },
        {
            title: '头像',
            dataIndex: 'coverImg',
            key: 'coverImg',
            align: 'center',
            render: (coverImg, goods) => {
				return (<img style={{ width: '3rem', height: '3rem' }}
                src={coverImg}
                alt="商品图片"/>);
			},
        }
    ];
};

export default getColumns;
