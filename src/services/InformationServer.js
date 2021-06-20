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

/**
 * 删除用户信息
 */
 const delUserState = (params) => {
    return ApiUtils.executeDel(`api/v1/admin/users/${params}`);
};

/**
 * 获取指定用户的信息
 */
 const getSomeUserData = (params) => {
    return ApiUtils.executeGet(`api/v1/admin/users/${params}`);
};

export default {
    setAdminUsers,
    setAdminProducts,
    delUserState,
    getSomeUserData,
};