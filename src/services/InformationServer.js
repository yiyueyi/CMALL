import ApiUtils from 'utils/ApiUtils';

/**
 * 用户信息
 */
const setAdminUsers = () => {
    return ApiUtils.executeGet('api/v1/admin/users');
};

export default {
    setAdminUsers
};