import _ from 'lodash';
import axios from 'axios';
import { message } from 'antd';
import Token from 'stores/Token';
import AppConstants from 'constants/AppConstants';

const setToken = (token) => {
    Token.setToken(token);
};

const getToken = () => {
    const toekenState = JSON.parse(Token.getToken())
    return toekenState;
};

const tokenState = `Bearer ${getToken()}`

//不带token  登录使用
const executeRegister = async (method, params) => {
    return new Promise((resolve, reject) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.post(url, params, {
            headers: {
                // token: getToken(),
            }
        }).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
        });
    });
};


//带有token
const executePost = async (method, params) => {
    return new Promise((resolve, reject) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.post(url, params, {
            headers: {
                authorization: tokenState,
            }
        }).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
            if(500===error.code) {
                message.error('服务器开小差了，请稍后重试');
            }
        });
    });
};

const executeGet = async (method, params) => {
    return await new Promise((resolve) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.get(url, {
            headers: {
                authorization: tokenState,
            },
            params: params
        }).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
            if(500===error.code) {
                message.error('服务器开小差了，请稍后重试');
            }
        });
    });
};

const executeDel = async (method) => {
    return await new Promise((resolve) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.delete(url, {
            headers: {
                authorization: tokenState,
            }
        }).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
            if(500===error.code) {
                message.error('服务器开小差了，请稍后重试');
            }
        });
    });
};

export default { setToken, executeRegister, executeGet, getToken, executePost, executeDel };
