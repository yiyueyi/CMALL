import ApiUtils from 'utils/ApiUtils';

/**
 * 用户信息
 */
const setAdminUsers = (params) => {
    return ApiUtils.executeGet('api/v1/admin/users', params);
};

/**
 * 商品信息
 */
 const setAdminProducts = (params) => {
    return ApiUtils.executeGet('api/v1/admin/products', params);
};

export default {
    setAdminUsers,
    setAdminProducts,
};