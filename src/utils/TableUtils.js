import _ from 'lodash';
import changeCase from 'change-case-object';

const ORDER_MAPPING = {
    'ascend': 'asc',
    'descend': 'desc'
};
const FIRST_PAGE = 1;
const ZERO_REMAINDER = 0;

const transformPagination = (pagination) => {
    return {
        pageNo: pagination.current,
        pageSize: pagination.pageSize
    };
};

const transformSorter = (sorter, options) => {
    let { snakeCase, camelCase, paramCase } = options || {};
    if (_.isNil(sorter.field) || _.isNil(sorter.order)) {
        return [];
    }
    let field = sorter.field;
    if (snakeCase) {
        field = changeCase.snakeCase(field);
    } else if (camelCase) {
        field = changeCase.camelCase(field);
    } else if (paramCase) {
        field = changeCase.paramCase(field);
    }
    return {
        orderBy: [field + ' ' + ORDER_MAPPING[sorter.order]]
    };
};

const transformCondition = (pagination, sorter, options) => {
    return _.assign({}, transformPagination(pagination), transformSorter(sorter, options));
};

const handleTableChange = (loadFunc) => {
    return (pagination, filter, order) => {
        const condition = transformCondition(pagination, order);
        loadFunc(condition.pageNo, condition.pageSize, condition.orderBy);
    };
};

const buildExpandedRowKeys = (expandedRowKeys, key) => {
    const filtered = _.cloneDeep(expandedRowKeys);
    if (expandedRowKeys.includes(key)) {
        filtered.splice(filtered.findIndex(element => element === key), 1);
    } else {
        filtered.push(key);
    }
    const diff = _.difference(filtered, expandedRowKeys);
    let expand = (1 === diff.length && diff[0] === key);
    return {
        keys: filtered,
        expand: expand
    };
};

//批量删除选择多页的删除页数计算
const calculatePagination = (deleteLength, pagination) => {
    let { current, pageSize, total } = pagination;
    const totalPages = Math.ceil(total / pageSize); // 总页数
    const remainder = total % pageSize; // 最后一页剩余的个数
    // 若当前页在最后一页
    if (totalPages === current && ZERO_REMAINDER !== remainder) {
        // 且删除的个数小与剩余的个数
        if (deleteLength < remainder) {
            return pagination;
            // 删除个数大于等于剩余个数且小于剩余个数加分页个数
        } else if (deleteLength >= remainder && (pageSize + remainder) > deleteLength) {
            current = current - 1;
        } else {
            current = current - Math.ceil(deleteLength / pageSize);
        }
        // 若当前页不是最后一页
    } else if (pageSize >= deleteLength) {
        current = current - Math.floor(deleteLength / pageSize);
    }
    if (FIRST_PAGE > current) {
        current = FIRST_PAGE;
    }
    return { current, pageSize };
};

// 分页
const showPaginationOptions = (pagination, pageSizeOptions = ['20', '50', '100']) => {
    return {
        ...pagination,
        showTotal: () => `共${pagination.total}条`,
        showSizeChanger: true,
        pageSizeOptions: pageSizeOptions
    };
};

export default {
    transformPagination,
    transformSorter,
    transformCondition,
    handleTableChange,
    buildExpandedRowKeys,
    calculatePagination,
    showPaginationOptions
};
