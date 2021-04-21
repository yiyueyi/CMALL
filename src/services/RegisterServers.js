import ApiUtils from 'utils/ApiUtils';

/**
 * 注册账户
 */
const setRegisterServer = (params) => {
    return ApiUtils.executeRegister('api/v1/auth/reg', params);
};

export default {
    setRegisterServer
};