import ApiUtils from 'utils/ApiUtils';

/**
 * 用户信息
 */
const setAdminUsers = (params) => {
    return ApiUtils.executeGet('api/v1/admin/users', params);
};

export default {
    setAdminUsers
};