import ApiUtils from 'utils/ApiUtils';

/**
 * 注册账户
 */
const setRegisterServer = (params) => {
    return ApiUtils.executeRegister('api/v1/auth/reg', params);
};

/**
 * 登录账户
 */
const setLoginServer = (params) => {
    return ApiUtils.executeRegister('api/v1/auth/manager_login', params);
};

export default {
    setRegisterServer,
    setLoginServer
};