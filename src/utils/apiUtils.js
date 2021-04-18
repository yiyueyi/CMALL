import _ from 'lodash';
import axios from 'axios';
import changeCase from 'change-case-object';
import { message } from 'antd';
import Token from 'stores/Token';
import Bearer from 'stores/Bearer';
import Authorization from 'stores/Authorization';
import AppConstants from 'constants/AppConstants';

const setToken = (token) => {
    Token.setToken(token);
};

const getToken = () => {
    return Token.getToken();
};

const setBearer = (bearer) => {
    Bearer.setBearer(bearer);
};

const getBearer = () => {
    return Bearer.getBearer();
};

const setAuthorization = (authorization) => {
    Authorization.setAuthorization(authorization);
};

const getAuthorization = () => {
    return Authorization.getAuthorization();
};

const execute = async (method, params, option) => {
    return new Promise((resolve, reject) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.post(url, _.assign({}, params, { appId: AppConstants.APP_ID }), {
            headers: {
                token: getToken(),
                Bearer: getBearer(),
                authorization: getAuthorization(),
            }
        }).then(resp => {
            let { camelCase } = option || {};
            if (!!camelCase) {
                resp = changeCase.camelCase(resp);
            }
            let response = resp.data;
            let isWrong = false;
            if (response) {
                let subMsg = response.subMsg || response.sub_msg;
                let subCode = response.subCode || response.sub_code;
                if ('401' === response.code) {
                    // if (UrlConstants.LOGIN_PAGE !== history.location.pathname && UrlConstants.LINK_FAIL_PAGE !== history.location.pathname) {
                    //     // 未登录或者登录已失效
                    //     history.push(UrlConstants.LOGIN_PAGE);
                    // }
                    isWrong = true;
                } else if ('500' === response.code) {
                    message.error('服务器开小差了，请稍后重试');
                    isWrong = true;
                } else if ('400' === response.code) {
                    console.error(response.subMsg);
                    isWrong = true;
                } else if (false === response.success) {
                    // TODO ips.mms-exception是不确定的异常，需要后端处理
                    if ('isp.mms-exception' !== subCode) {
                        message.error(subMsg);
                    }
                    reject(response);
                    isWrong = true;
                }
                if (isWrong) {
                    reject(response);
                }
                // 将原始的http头部信息放置在response中，以便调用者获取
                response.httpHeaders = resp.headers;
            }
            resolve(response);
        }).catch(err => {
            console.error(err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (200 !== err.response.status) {
                    if (400 === err.response.status) {
                        message.error('服务接口请求参数错误，请联系管理员');
                    } else {
                        reject(new Error(`bad status code=[${err.response.status}]`));
                    }
                }
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                reject(new Error('no response was received'));
                message.error('服务器开小差了，请稍后重试');
            } else if (err.message) {
                // Something happened in setting up the request that triggered an Error
                reject(new Error(`setting up the request that triggered an error=[${err.message}]`));
            }
        });
    });
};

const doGet = async (url) => {
    return await new Promise((resolve) => {
        axios.get(url).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
        });
    });
};

export default { setToken, setBearer, setAuthorization, getAuthorization, execute, doGet };
